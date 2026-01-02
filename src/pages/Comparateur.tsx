import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { supabase } from '../lib/supabase';
import { CountryCard } from '../components/cards/CountryCard';
import { ComparisonCard } from '../components/cards/ComparisonCard';
import { Button } from '../components/ui/Button';
import { sampleCountries } from '../data/countries';
import { X } from 'lucide-react';

export function Comparateur() {
  const { t } = useLanguage();
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    const { data, error } = await supabase
      .from('countries')
      .select('*')
      .order('name_fr');

    if (!error && data && data.length > 0) {
      setCountries(data);
    } else {
      setCountries(sampleCountries);
    }
    setLoading(false);
  };

  const handleSelectCountry = (country: any) => {
    if (selectedCountries.length < 2) {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const handleRemoveCountry = (countryCode: string) => {
    setSelectedCountries(selectedCountries.filter(c => c.code !== countryCode));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('Comparateur de pays', 'Country comparator')}
          </h1>
          <p className="text-xl text-gray-600">
            {t(
              'Sélectionnez jusqu\'à 2 pays pour les comparer',
              'Select up to 2 countries to compare them'
            )}
          </p>
        </div>

        {selectedCountries.length > 0 && (
          <div className="mb-12 bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('Pays sélectionnés', 'Selected countries')}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCountries([])}
              >
                {t('Réinitialiser', 'Reset')}
              </Button>
            </div>
            <div className="flex flex-wrap gap-4">
              {selectedCountries.map((country) => (
                <div
                  key={country.code}
                  className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg"
                >
                  <span className="text-2xl">{country.flag_emoji}</span>
                  <span className="font-medium">
                    {country[`name_${useLanguage().language}`]}
                  </span>
                  <button
                    onClick={() => handleRemoveCountry(country.code)}
                    className="ml-2 hover:bg-blue-100 rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedCountries.length === 2 && (
          <div className="mb-12">
            <ComparisonCard country1={selectedCountries[0]} country2={selectedCountries[1]} />
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {t('Tous les pays', 'All countries')}
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries.map((country) => (
              <CountryCard
                key={country.code}
                country={country}
                onSelect={
                  selectedCountries.length < 2 &&
                  !selectedCountries.find(c => c.code === country.code)
                    ? () => handleSelectCountry(country)
                    : undefined
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
