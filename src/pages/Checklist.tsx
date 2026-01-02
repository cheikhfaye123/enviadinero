import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ChecklistItem } from '../components/cards/ChecklistItem';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Plus, Filter } from 'lucide-react';

export function Checklist() {
  const { user, loading: authLoading } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemFr, setNewItemFr] = useState('');
  const [newItemEn, setNewItemEn] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('general');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    } else if (user) {
      loadItems();
    }
  }, [user, authLoading]);

  useEffect(() => {
    filterItems();
  }, [selectedCategory, items]);

  const loadItems = async () => {
    const { data } = await supabase
      .from('user_checklists')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (data) {
      setItems(data);
    }
    setLoading(false);
  };

  const filterItems = () => {
    if (selectedCategory === 'all') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.category === selectedCategory));
    }
  };

  const handleToggle = async (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    await supabase
      .from('user_checklists')
      .update({ completed: !item.completed, updated_at: new Date().toISOString() })
      .eq('id', id);

    setItems(items.map(i => i.id === id ? { ...i, completed: !i.completed } : i));
  };

  const handleDelete = async (id: string) => {
    await supabase
      .from('user_checklists')
      .delete()
      .eq('id', id);

    setItems(items.filter(i => i.id !== id));
  };

  const handleAddItem = async () => {
    if (!newItemFr.trim() || !newItemEn.trim()) return;

    const { data } = await supabase
      .from('user_checklists')
      .insert({
        user_id: user?.id,
        item_fr: newItemFr,
        item_en: newItemEn,
        category: newItemCategory,
        completed: false
      })
      .select()
      .single();

    if (data) {
      setItems([data, ...items]);
      setNewItemFr('');
      setNewItemEn('');
      setNewItemCategory('general');
      setShowAddModal(false);
    }
  };

  const categories = [
    { value: 'all', label: t('Toutes', 'All') },
    { value: 'administratif', label: t('Administratif', 'Administrative') },
    { value: 'logement', label: t('Logement', 'Housing') },
    { value: 'travail', label: t('Travail', 'Work') },
    { value: 'general', label: t('Général', 'General') },
  ];

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  const completedCount = items.filter(item => item.completed).length;
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t('Ma Checklist', 'My Checklist')}
              </h1>
              <p className="text-gray-600">
                {t(
                  `${completedCount} sur ${items.length} tâches complétées`,
                  `${completedCount} of ${items.length} tasks completed`
                )}
              </p>
            </div>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              {t('Ajouter', 'Add')}
            </Button>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <p className="text-gray-600">
                {t(
                  'Aucune tâche dans cette catégorie',
                  'No tasks in this category'
                )}
              </p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <ChecklistItem
                key={item.id}
                item={item}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>

        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title={t('Ajouter une tâche', 'Add a task')}
        >
          <div className="space-y-4">
            <Input
              label={t('Titre (Français)', 'Title (French)')}
              value={newItemFr}
              onChange={(e) => setNewItemFr(e.target.value)}
              placeholder={t('Ex: Obtenir mon NIE', 'Ex: Get my NIE')}
            />

            <Input
              label={t('Titre (Anglais)', 'Title (English)')}
              value={newItemEn}
              onChange={(e) => setNewItemEn(e.target.value)}
              placeholder="Ex: Get my NIE"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('Catégorie', 'Category')}
              </label>
              <select
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.slice(1).map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowAddModal(false)}
                className="flex-1"
              >
                {t('Annuler', 'Cancel')}
              </Button>
              <Button onClick={handleAddItem} className="flex-1">
                {t('Ajouter', 'Add')}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
