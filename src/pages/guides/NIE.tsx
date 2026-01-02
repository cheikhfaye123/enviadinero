import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { ArrowLeft, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function NIE() {
  const { t } = useLanguage();

  const steps = [
    {
      title: t('Rassemblez les documents nécessaires', 'Gather required documents'),
      description: t(
        'Passeport valide, formulaire EX-15 rempli, justificatif de domicile, et lettre de motivation',
        'Valid passport, completed EX-15 form, proof of address, and motivation letter'
      )
    },
    {
      title: t('Prenez rendez-vous', 'Make an appointment'),
      description: t(
        'Réservez un créneau en ligne sur le site de la police nationale espagnole',
        'Book a slot online on the Spanish national police website'
      )
    },
    {
      title: t('Payez les frais', 'Pay the fees'),
      description: t(
        'Réglez les frais de demande (environ 10-12€) dans une banque espagnole',
        'Pay the application fees (around 10-12€) at a Spanish bank'
      )
    },
    {
      title: t('Assistez au rendez-vous', 'Attend the appointment'),
      description: t(
        'Présentez-vous au commissariat avec tous vos documents originaux',
        'Go to the police station with all your original documents'
      )
    },
    {
      title: t('Récupérez votre NIE', 'Collect your NIE'),
      description: t(
        'Le NIE est généralement délivré immédiatement ou dans les jours suivants',
        'The NIE is usually issued immediately or within a few days'
      )
    }
  ];

  const tips = [
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      text: t(
        'Les rendez-vous se libèrent souvent tôt le matin, vérifiez régulièrement',
        'Appointments often open up early in the morning, check regularly'
      )
    },
    {
      icon: <FileText className="w-6 h-6 text-green-600" />,
      text: t(
        'Préparez tous vos documents en double exemplaire',
        'Prepare all your documents in duplicate'
      )
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-orange-600" />,
      text: t(
        'La lettre de motivation doit expliquer pourquoi vous avez besoin du NIE',
        'The motivation letter must explain why you need the NIE'
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
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">
              {t('Obtenir son NIE en Espagne', 'Getting your NIE in Spain')}
            </h1>
            <p className="text-xl text-blue-100">
              {t(
                'Guide complet pour obtenir votre numéro d\'identification d\'étranger',
                'Complete guide to obtaining your foreigner identification number'
              )}
            </p>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('Qu\'est-ce que le NIE ?', 'What is the NIE?')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t(
                  'Le NIE (Número de Identificación de Extranjero) est un numéro d\'identification fiscal espagnol indispensable pour toute personne étrangère résidant en Espagne. Il est nécessaire pour ouvrir un compte bancaire, signer un contrat de travail, acheter une propriété, ou effectuer toute démarche administrative.',
                  'The NIE (Número de Identificación de Extranjero) is a Spanish tax identification number essential for any foreigner residing in Spain. It is necessary to open a bank account, sign an employment contract, buy property, or complete any administrative procedure.'
                )}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('Étapes pour obtenir le NIE', 'Steps to obtain the NIE')}
              </h2>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
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

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-blue-600" />
                {t('Conseils pratiques', 'Practical tips')}
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
