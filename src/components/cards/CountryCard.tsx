import { useLanguage } from '../../hooks/useLanguage';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CountryCardProps {
  country: {
    code: string;
    name_fr: string;
    name_en: string;
    description_fr: string;
    description_en: string;
    flag_emoji: string;
    cost_of_living: number;
    quality_of_life: number;
    safety_rating: number;
    healthcare_rating: number;
    weather_rating: number;
    language_barrier: number;
  };
  onSelect?: () => void;
}

export function CountryCard({ country, onSelect }: CountryCardProps) {
  const { language, t } = useLanguage();

  const getRatingIcon = (rating: number) => {
    if (rating >= 70) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (rating <= 30) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-yellow-600" />;
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 70) return 'bg-green-100';
    if (rating <= 30) return 'bg-red-100';
    return 'bg-yellow-100';
  };

  const name = language === 'fr' ? country.name_fr : country.name_en;
  const description = language === 'fr' ? country.description_fr : country.description_en;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{country.flag_emoji}</span>
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="grid grid-cols-2 gap-3">
          <div className={`${getRatingColor(country.quality_of_life)} rounded-lg p-3 flex items-center justify-between`}>
            <span className="text-xs font-medium text-gray-700">
              {t('Qualité de vie', 'Quality of life')}
            </span>
            {getRatingIcon(country.quality_of_life)}
          </div>

          <div className={`${getRatingColor(100 - country.cost_of_living)} rounded-lg p-3 flex items-center justify-between`}>
            <span className="text-xs font-medium text-gray-700">
              {t('Coût de la vie', 'Cost of living')}
            </span>
            {getRatingIcon(100 - country.cost_of_living)}
          </div>

          <div className={`${getRatingColor(country.safety_rating)} rounded-lg p-3 flex items-center justify-between`}>
            <span className="text-xs font-medium text-gray-700">
              {t('Sécurité', 'Safety')}
            </span>
            {getRatingIcon(country.safety_rating)}
          </div>

          <div className={`${getRatingColor(country.healthcare_rating)} rounded-lg p-3 flex items-center justify-between`}>
            <span className="text-xs font-medium text-gray-700">
              {t('Santé', 'Healthcare')}
            </span>
            {getRatingIcon(country.healthcare_rating)}
          </div>
        </div>

        {onSelect && (
          <button
            onClick={onSelect}
            className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            {t('Comparer', 'Compare')}
          </button>
        )}
      </div>
    </div>
  );
}
