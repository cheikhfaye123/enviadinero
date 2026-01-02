import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { supabase } from '../lib/supabase';
import { sampleArticles } from '../data/articles';
import { Calendar, ArrowLeft } from 'lucide-react';

export function ArticleSingle() {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticle();
  }, [slug]);

  const loadArticle = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    if (!error && data) {
      setArticle(data);
    } else {
      const fallback = sampleArticles.find(a => a.slug === slug);
      setArticle(fallback || null);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t('Article non trouvé', 'Article not found')}
          </h1>
          <Link
            to="/articles"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {t('Retour aux articles', 'Back to articles')}
          </Link>
        </div>
      </div>
    );
  }

  const title = language === 'fr' ? article.title_fr : article.title_en;
  const content = language === 'fr' ? article.content_fr : article.content_en;
  const date = new Date(article.created_at).toLocaleDateString(
    language === 'fr' ? 'fr-FR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('Retour aux articles', 'Back to articles')}
        </Link>

        <article className="bg-white rounded-xl shadow-md overflow-hidden">
          {article.image_url && (
            <div className="h-96 overflow-hidden">
              <img
                src={article.image_url}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                {article.category}
              </span>
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{date}</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-6">{title}</h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {content}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
