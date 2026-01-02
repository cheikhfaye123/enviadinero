import { useLanguage } from '../../hooks/useLanguage';

interface ComparisonCardProps {
  country1: {
    name_fr: string;
    name_en: string;
    flag_emoji: string;
    cost_of_living: number;
    quality_of_life: number;
    safety_rating: number;
    healthcare_rating: number;
  };
  country2: {
    name_fr: string;
    name_en: string;
    flag_emoji: string;
    cost_of_living: number;
    quality_of_life: number;
    safety_rating: number;
    healthcare_rating: number;
  };
}

export function ComparisonCard({ country1, country2 }: ComparisonCardProps) {
  const { language, t } = useLanguage();

  const name1 = language === 'fr' ? country1.name_fr : country1.name_en;
  const name2 = language === 'fr' ? country2.name_fr : country2.name_en;

  const metrics = [
    {
      label: t('Qualité de vie', 'Quality of life'),
      value1: country1.quality_of_life,
      value2: country2.quality_of_life,
      inverse: false
    },
    {
      label: t('Coût de la vie', 'Cost of living'),
      value1: country1.cost_of_living,
      value2: country2.cost_of_living,
      inverse: true
    },
    {
      label: t('Sécurité', 'Safety'),
      value1: country1.safety_rating,
      value2: country2.safety_rating,
      inverse: false
    },
    {
      label: t('Santé', 'Healthcare'),
      value1: country1.healthcare_rating,
      value2: country2.healthcare_rating,
      inverse: false
    }
  ];

  const getBetterValue = (value1: number, value2: number, inverse: boolean) => {
    if (inverse) {
      return value1 < value2 ? 'first' : value2 < value1 ? 'second' : 'equal';
    }
    return value1 > value2 ? 'first' : value2 > value1 ? 'second' : 'equal';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="text-center">
          <div className="text-5xl mb-2">{country1.flag_emoji}</div>
          <h3 className="font-bold text-gray-900">{name1}</h3>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-400">VS</span>
        </div>
        <div className="text-center">
          <div className="text-5xl mb-2">{country2.flag_emoji}</div>
          <h3 className="font-bold text-gray-900">{name2}</h3>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {metrics.map((metric, index) => {
          const better = getBetterValue(metric.value1, metric.value2, metric.inverse);

          return (
            <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
              <div className="text-sm font-medium text-gray-700 mb-2 text-center">
                {metric.label}
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className={`text-center p-3 rounded-lg ${
                  better === 'first' ? 'bg-green-100 font-bold' : 'bg-gray-50'
                }`}>
                  <span className="text-lg">{metric.value1}</span>
                </div>
                <div className="flex justify-center">
                  <div className="w-px h-8 bg-gray-300" />
                </div>
                <div className={`text-center p-3 rounded-lg ${
                  better === 'second' ? 'bg-green-100 font-bold' : 'bg-gray-50'
                }`}>
                  <span className="text-lg">{metric.value2}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
