
'use client';
import { Key, Mail, ShieldCheck, LogIn, AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import OryonLogo from '@/components/icons/oryon-logo';
import { useFormState, useFormStatus } from 'react-dom';
import { handleLogin } from '@/app/auth/actions';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full btn-primary-gradient py-3 h-auto text-base font-semibold" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LogIn className="mr-2 h-5 w-5" />}
      {pending ? 'A verificar...' : 'Entrar no Oryon'}
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState(handleLogin, null);
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: 'destructive',
        title: 'Falha no Login',
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="gradient-surface p-8 md:p-10 rounded-2xl w-full max-w-md mx-4 border-2 border-primary/50 bounce-in">
        <div className="text-center mb-8">
          <OryonLogo className="mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-foreground mb-1">Oryon</h1>
          <p className="text-muted-foreground">STANDARD BANK - Plataforma Corporativa Segura</p>
          <div className="mt-2 flex items-center justify-center text-xs text-green-400">
            <ShieldCheck className="mr-1.5 h-3 w-3" />
            <span>Conexão Segura • Firebase Authentication</span>
          </div>
        </div>

        {state?.error && !toast && (
          <div className="bg-destructive/20 text-destructive-foreground p-3 rounded-lg mb-6 flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5" />
            <span>{state.error}</span>
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-muted-foreground">
              Email Corporativo
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                id="email"
                name="email"
                className="pl-10 p-3 h-auto rounded-xl bg-card border-border focus:border-primary placeholder:text-muted-foreground"
                placeholder="seu.email@standardbank.com"
                required
                defaultValue="maria.silva@standardbank.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="pl-10 pr-10 p-3 h-auto rounded-xl bg-card border-border focus:border-primary placeholder:text-muted-foreground"
                placeholder="••••••••"
                required
                defaultValue="Oryon@2024!"
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
            <Link href="#" className="text-primary/80 hover:text-primary transition-colors">
              Esqueceu a password?
            </Link>
          </div>

          <LoginButton />
        </form>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">Protegido pelo Sistema de Segurança Oryon</p>
          <div className="flex justify-center space-x-4 mt-2 text-xs text-muted-foreground/60">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" />2FA via Firebase</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" />SSL/TLS</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" />GDPR</span>
          </div>
        </div>
      </div>
    </main>
  );
}
