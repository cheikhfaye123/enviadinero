import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { ArrowRight, Globe, TrendingUp, Users, CheckSquare } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { CountryCard } from '../components/cards/CountryCard';
import { sampleCountries } from '../data/countries';

export function Home() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: t('Comparez les pays', 'Compare countries'),
      description: t(
        'Analysez et comparez les destinations selon vos critères',
        'Analyze and compare destinations according to your criteria'
      )
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: t('Guides pratiques', 'Practical guides'),
      description: t(
        'Accédez à des guides détaillés pour chaque étape',
        'Access detailed guides for each step'
      )
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: t('Communauté', 'Community'),
      description: t(
        'Échangez avec d\'autres expatriés et partagez vos expériences',
        'Connect with other expats and share your experiences'
      )
    },
    {
      icon: <CheckSquare className="w-8 h-8 text-orange-600" />,
      title: t('Checklist personnalisée', 'Personalized checklist'),
      description: t(
        'Suivez votre progression avec votre checklist sur mesure',
        'Track your progress with your custom checklist'
      )
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700 text-white py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0yNCAzNmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t('Réalisez votre rêve d\'expatriation', 'Make your expatriation dream come true')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            {t(
              'Comparez les destinations, préparez votre projet et rejoignez une communauté de milliers d\'expatriés',
              'Compare destinations, prepare your project and join a community of thousands of expats'
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/comparateur">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                {t('Comparer les pays', 'Compare countries')}
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Button>
            </Link>
            <Link to="/articles">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                {t('Lire les guides', 'Read guides')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('Pourquoi choisir ExpatGuide ?', 'Why choose ExpatGuide?')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('Destinations populaires', 'Popular destinations')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t(
                'Découvrez les pays les plus prisés par les expatriés',
                'Discover the most popular countries among expats'
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleCountries.slice(0, 3).map((country) => (
              <CountryCard key={country.code} country={country} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/comparateur">
              <Button size="lg">
                {t('Voir tous les pays', 'View all countries')}
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('Prêt à commencer votre aventure ?', 'Ready to start your adventure?')}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t(
              'Créez votre compte gratuitement et accédez à tous nos outils',
              'Create your free account and access all our tools'
            )}
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              {t('Créer mon compte', 'Create my account')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
