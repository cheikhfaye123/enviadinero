import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../hooks/useLanguage';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { LogIn } from 'lucide-react';

export function Login() {
  const { signIn } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(t(
        'Email ou mot de passe incorrect',
        'Invalid email or password'
      ));
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
              <LogIn className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {t('Connexion', 'Sign in')}
            </h2>
            <p className="mt-2 text-gray-600">
              {t('Accédez à votre espace personnel', 'Access your personal space')}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? t('Connexion...', 'Signing in...') : t('Se connecter', 'Sign in')}
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            {t('Pas encore de compte ?', 'No account yet?')}{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              {t("S'inscrire", 'Sign up')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
