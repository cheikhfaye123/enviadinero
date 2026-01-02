import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { supabase } from '../lib/supabase';
import { ArticleCard } from '../components/cards/ArticleCard';
import { sampleArticles } from '../data/articles';
import { Search } from 'lucide-react';

export function Articles() {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<any[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [searchTerm, selectedCategory, articles]);

  const loadArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      setArticles(data);
    } else {
      setArticles(sampleArticles);
    }
    setLoading(false);
  };

  const filterArticles = () => {
    let filtered = articles;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title_fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt_fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt_en.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  };

  const categories = [
    { value: 'all', label: t('Tous', 'All') },
    { value: 'guides', label: t('Guides', 'Guides') },
    { value: 'fiscalité', label: t('Fiscalité', 'Taxation') },
    { value: 'lifestyle', label: t('Lifestyle', 'Lifestyle') },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('Articles et Guides', 'Articles and Guides')}
          </h1>
          <p className="text-xl text-gray-600">
            {t(
              'Découvrez nos conseils et guides pour réussir votre expatriation',
              'Discover our tips and guides for a successful expatriation'
            )}
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('Rechercher un article...', 'Search an article...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-600 text-lg">
              {t('Aucun article trouvé', 'No articles found')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
