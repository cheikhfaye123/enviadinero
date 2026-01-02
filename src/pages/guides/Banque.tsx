import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { ArrowLeft, Building2, CreditCard, Shield, TrendingUp } from 'lucide-react';

export function Banque() {
  const { t } = useLanguage();

  const steps = [
    {
      title: t('Choisissez votre banque', 'Choose your bank'),
      description: t(
        'Comparez les offres des différentes banques : frais, services en ligne, agences disponibles',
        'Compare offers from different banks: fees, online services, available branches'
      )
    },
    {
      title: t('Préparez vos documents', 'Prepare your documents'),
      description: t(
        'Passeport ou carte d\'identité, NIE, justificatif de domicile, et contrat de travail ou preuve de revenus',
        'Passport or ID card, NIE, proof of address, and employment contract or proof of income'
      )
    },
    {
      title: t('Prenez rendez-vous', 'Make an appointment'),
      description: t(
        'Contactez la banque pour fixer un rendez-vous avec un conseiller',
        'Contact the bank to schedule an appointment with an advisor'
      )
    },
    {
      title: t('Signez votre contrat', 'Sign your contract'),
      description: t(
        'Lors du rendez-vous, examinez et signez le contrat d\'ouverture de compte',
        'During the appointment, review and sign the account opening contract'
      )
    },
    {
      title: t('Activez vos services', 'Activate your services'),
      description: t(
        'Recevez votre carte bancaire et activez vos services en ligne',
        'Receive your bank card and activate your online services'
      )
    }
  ];

  const banks = [
    {
      name: 'BBVA',
      features: t(
        'Application moderne, bonne couverture internationale, frais moyens',
        'Modern app, good international coverage, average fees'
      )
    },
    {
      name: 'Santander',
      features: t(
        'Réseau d\'agences étendu, services en ligne complets, offres pour expatriés',
        'Extensive branch network, complete online services, expat offers'
      )
    },
    {
      name: 'CaixaBank',
      features: t(
        'Leader en Espagne, nombreuses agences, services variés',
        'Leader in Spain, numerous branches, varied services'
      )
    },
    {
      name: 'N26 / Revolut',
      features: t(
        'Banques en ligne, pas de frais mensuels, ouverture rapide',
        'Online banks, no monthly fees, quick opening'
      )
    }
  ];

  const tips = [
    {
      icon: <CreditCard className="w-6 h-6 text-green-600" />,
      text: t(
        'Vérifiez les frais de tenue de compte et les conditions pour les éviter',
        'Check account maintenance fees and conditions to avoid them'
      )
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      text: t(
        'Assurez-vous que la banque offre une assurance sur les dépôts',
        'Ensure the bank offers deposit insurance'
      )
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
      text: t(
        'Certaines banques offrent des bonus pour l\'ouverture de compte',
        'Some banks offer bonuses for opening an account'
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('Retour', 'Back')}
        </Link>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">
              {t('Ouvrir un compte bancaire', 'Opening a bank account')}
            </h1>
            <p className="text-xl text-green-100">
              {t(
                'Guide pratique pour ouvrir votre compte bancaire à l\'étranger',
                'Practical guide to opening your bank account abroad'
              )}
            </p>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('Pourquoi ouvrir un compte local ?', 'Why open a local account?')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t(
                  'Ouvrir un compte bancaire local est essentiel pour faciliter votre vie quotidienne : recevoir votre salaire, payer vos factures, effectuer des virements sans frais internationaux, et bénéficier de services adaptés au marché local.',
                  'Opening a local bank account is essential to facilitate your daily life: receive your salary, pay your bills, make transfers without international fees, and benefit from services adapted to the local market.'
                )}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('Étapes d\'ouverture', 'Opening steps')}
              </h2>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('Banques populaires', 'Popular banks')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {banks.map((bank, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Building2 className="w-6 h-6 text-green-600" />
                      <h3 className="font-bold text-gray-900">{bank.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{bank.features}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-600" />
                {t('Conseils importants', 'Important tips')}
              </h3>
              <div className="space-y-3">
                {tips.map((tip, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    {tip.icon}
                    <p className="text-gray-700">{tip.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
