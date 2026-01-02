import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../hooks/useLanguage';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { UserPlus } from 'lucide-react';

export function Register() {
  const { signUp } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t(
        'Les mots de passe ne correspondent pas',
        'Passwords do not match'
      ));
      return;
    }

    if (password.length < 6) {
      setError(t(
        'Le mot de passe doit contenir au moins 6 caractères',
        'Password must be at least 6 characters'
      ));
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password, fullName);

    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <UserPlus className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {t('Inscription', 'Sign up')}
            </h2>
            <p className="mt-2 text-gray-600">
              {t('Créez votre compte gratuitement', 'Create your free account')}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              label={t('Nom complet', 'Full name')}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder={t('Jean Dupont', 'John Doe')}
            />

            <Input
              type="email"
              label={t('Email', 'Email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={t('votre@email.com', 'your@email.com')}
            />

            <Input
              type="password"
              label={t('Mot de passe', 'Password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />

            <Input
              type="password"
              label={t('Confirmer le mot de passe', 'Confirm password')}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
            />

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? t('Inscription...', 'Signing up...') : t("S'inscrire", 'Sign up')}
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            {t('Déjà un compte ?', 'Already have an account?')}{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              {t('Se connecter', 'Sign in')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
