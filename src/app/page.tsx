
'use client';
import { LogIn, AlertCircle, Eye, EyeOff, Loader2, UserPlus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import OryonLogo from '@/components/icons/oryon-logo';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { toast } = useToast();
  const auth = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Tenta fazer login primeiro
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Login bem-sucedido!',
        description: 'Bem-vindo de volta ao Oryon.',
      });
      router.push('/dashboard');
    } catch (err: any) {
      // Se o utilizador não existir, cria a conta e faz login
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          await signInWithEmailAndPassword(auth, email, password); // Faz login após criar
          toast({
            title: 'Conta de administrador criada!',
            description: 'A conta de administrador foi criada com sucesso e a sessão iniciada.',
          });
          router.push('/dashboard');
        } catch (signupErr: any) {
          setError('Falha ao criar e autenticar a conta de administrador.');
        }
      } else {
        let errorMessage = 'Ocorreu um erro desconhecido.';
        switch (err.code) {
          case 'auth/wrong-password':
            errorMessage = 'Password incorreta. Por favor, verifique a sua password.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'O formato do email é inválido.';
            break;
          default:
            errorMessage = 'Falha no login. Por favor, tente novamente.';
            break;
        }
        setError(errorMessage);
        toast({
          variant: 'destructive',
          title: 'Falha no Login',
          description: errorMessage,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950">
      <div className="gradient-surface p-8 md:p-10 rounded-2xl w-full max-w-md mx-4 border-2 border-primary/50 bounce-in">
        <div className="text-center mb-8">
          <OryonLogo className="mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-1">Oryon</h1>
          <p className="text-muted-foreground">STANDARD BANK - Plataforma Corporativa Segura</p>
        </div>

        {error && (
          <div className="bg-destructive/20 text-destructive-foreground p-3 rounded-lg mb-6 flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-muted-foreground">
              Email Corporativo
            </Label>
            <div className="relative">
              <Input
                type="email"
                id="email"
                name="email"
                className="pl-4 p-3 h-auto rounded-xl bg-card border-border focus:border-primary placeholder:text-muted-foreground"
                placeholder="seu.email@standardbank.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="pl-4 pr-10 p-3 h-auto rounded-xl bg-card border-border focus:border-primary placeholder:text-muted-foreground"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <Label
              htmlFor="remember"
              className="flex items-center gap-2 font-normal text-muted-foreground cursor-pointer"
            >
              <Checkbox id="remember" name="remember" className="rounded bg-card border-border text-primary focus:ring-primary" />
              Lembrar-me
            </Label>
            <Link href="/forgot-password" className="text-primary/80 hover:text-primary transition-colors">
              Esqueceu a password?
            </Link>
          </div>

          <Button type="submit" className="w-full btn-primary-gradient py-3 h-auto text-base font-semibold" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LogIn className="mr-2 h-5 w-5" />}
            {loading ? 'A verificar...' : 'Entrar no Oryon'}
          </Button>
        </form>

        <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">Não tem uma conta?</p>
            <Link href="/signup" className="font-semibold text-primary hover:text-primary/80 transition-colors flex items-center justify-center gap-2 mt-1">
                Registe-se agora <ArrowRight className="w-4 h-4"/>
            </Link>
        </div>
      </div>
    </main>
  );
}
