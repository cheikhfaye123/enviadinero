import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../hooks/useLanguage';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { User, CheckSquare, BookOpen, Globe } from 'lucide-react';

export function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [checklistCount, setChecklistCount] = useState({ total: 0, completed: 0 });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    } else if (user) {
      loadProfile();
      loadChecklistStats();
    }
  }, [user, authLoading]);

  const loadProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id)
      .maybeSingle();

    setProfile(data);
  };

  const loadChecklistStats = async () => {
    const { data } = await supabase
      .from('user_checklists')
      .select('id, completed')
      .eq('user_id', user?.id);

    if (data) {
      setChecklistCount({
        total: data.length,
        completed: data.filter(item => item.completed).length
      });
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  const cards = [
    {
      title: t('Ma Checklist', 'My Checklist'),
      description: t(
        `${checklistCount.completed} sur ${checklistCount.total} tâches complétées`,
        `${checklistCount.completed} of ${checklistCount.total} tasks completed`
      ),
      icon: <CheckSquare className="w-8 h-8 text-green-600" />,
      link: '/checklist',
      color: 'bg-green-50 border-green-200'
    },
    {
      title: t('Comparer les pays', 'Compare countries'),
      description: t('Trouvez votre destination idéale', 'Find your ideal destination'),
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      link: '/comparateur',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: t('Guides pratiques', 'Practical guides'),
      description: t('Accédez à tous nos articles', 'Access all our articles'),
      icon: <BookOpen className="w-8 h-8 text-purple-600" />,
      link: '/articles',
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('Bienvenue', 'Welcome')}, {profile?.full_name || user.email}
              </h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className={`${card.color} border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600">{card.description}</p>
            </Link>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl shadow-md p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            {t('Prêt pour l\'aventure ?', 'Ready for the adventure?')}
          </h2>
          <p className="text-blue-100 mb-6">
            {t(
              'Utilisez nos outils pour préparer votre expatriation en toute sérénité',
              'Use our tools to prepare your expatriation with peace of mind'
            )}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/comparateur"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              {t('Comparer les pays', 'Compare countries')}
            </Link>
            <Link
              to="/checklist"
              className="px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors"
            >
              {t('Ma checklist', 'My checklist')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
