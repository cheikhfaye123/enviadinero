import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🌍</span>
              <span className="text-xl font-bold text-white">
                {t('ExpatGuide', 'ExpatGuide')}
              </span>
            </div>
            <p className="text-sm">
              {t(
                'Votre guide pour une expatriation réussie. Comparez les pays et préparez votre projet.',
                'Your guide for a successful expatriation. Compare countries and prepare your project.'
              )}
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('Navigation', 'Navigation')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  {t('Accueil', 'Home')}
                </Link>
              </li>
              <li>
                <Link to="/comparateur" className="hover:text-white transition-colors">
                  {t('Comparateur', 'Comparator')}
                </Link>
              </li>
              <li>
                <Link to="/articles" className="hover:text-white transition-colors">
                  {t('Articles', 'Articles')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('Guides', 'Guides')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/guides/nie" className="hover:text-white transition-colors">
                  {t('Obtenir son NIE', 'Get your NIE')}
                </Link>
              </li>
              <li>
                <Link to="/guides/banque" className="hover:text-white transition-colors">
                  {t('Ouvrir un compte bancaire', 'Open a bank account')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('Contact', 'Contact')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contact@expatguide.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} ExpatGuide.{' '}
            {t('Tous droits réservés.', 'All rights reserved.')}
          </p>
        </div>
      </div>
    </footer>
  );
}
