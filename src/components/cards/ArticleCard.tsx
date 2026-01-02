import { useLanguage } from '../../hooks/useLanguage';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  article: {
    slug: string;
    title_fr: string;
    title_en: string;
    excerpt_fr: string;
    excerpt_en: string;
    image_url: string;
    category: string;
    created_at: string;
  };
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { language } = useLanguage();

  const title = language === 'fr' ? article.title_fr : article.title_en;
  const excerpt = language === 'fr' ? article.excerpt_fr : article.excerpt_en;
  const date = new Date(article.created_at).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Link to={`/articles/${article.slug}`} className="group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
        <div className="relative h-48 overflow-hidden bg-gray-200">
          {article.image_url ? (
            <img
              src={article.image_url}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
              <span className="text-4xl text-blue-600">📰</span>
            </div>
          )}
          <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {article.category}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{excerpt}</p>

          <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
            <span>{language === 'fr' ? 'Lire la suite' : 'Read more'}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
