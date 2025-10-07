'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Languages, Palette, Accessibility, FileDown, Sun, Moon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
    const { toast } = useToast();

    const handleSaveChanges = (section: string) => {
        toast({
            title: "Configurações Salvas",
            description: `As suas configurações de ${section} foram atualizadas com sucesso.`,
        });
    };

    return (
        <div className="p-6 fade-in">
            <h1 className="text-3xl font-bold text-white mb-8">Configurações</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* General Settings Card */}
                <Card className="gradient-surface border-0 rounded-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Languages className="text-primary"/> Geral</CardTitle>
                        <CardDescription>Defina o idioma e o fuso horário da aplicação.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="language">Idioma</Label>
                            <Select defaultValue="pt-br">
                                <SelectTrigger id="language" className="bg-white/10 border-white/20">
                                    <SelectValue placeholder="Selecione o idioma" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                                    <SelectItem value="en-us">English (United States)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="timezone">Fuso Horário</Label>
                            <Select defaultValue="africa-maputo">
                                <SelectTrigger id="timezone" className="bg-white/10 border-white/20">
                                    <SelectValue placeholder="Selecione o fuso horário" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="africa-maputo">(GMT+02:00) Maputo</SelectItem>
                                    <SelectItem value="europe-lisbon">(GMT+01:00) Lisbon</SelectItem>
                                    <SelectItem value="utc">(GMT+00:00) UTC</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="w-full btn-primary-gradient" onClick={() => handleSaveChanges('Geral')}>Salvar Alterações</Button>
                    </CardContent>
                </Card>

                {/* Appearance Settings Card */}
                <Card className="gradient-surface border-0 rounded-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Palette className="text-primary"/> Aparência</CardTitle>
                        <CardDescription>Personalize a aparência da interface.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Tema</Label>
                             <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-white/20 border-primary ring-2 ring-primary">
                                    <Moon className="w-6 h-6 mb-2"/>
                                    <span>Escuro</span>
                                </Button>
                                <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-white/10 border-white/20 opacity-50 cursor-not-allowed">
                                    <Sun className="w-6 h-6 mb-2"/>
                                    <span>Claro</span>
                                </Button>
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="font-size">Tamanho da Fonte</Label>
                            <Select defaultValue="medium">
                                <SelectTrigger id="font-size" className="bg-white/10 border-white/20">
                                    <SelectValue placeholder="Selecione o tamanho" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="small">Pequeno</SelectItem>
                                    <SelectItem value="medium">Médio</SelectItem>
                                    <SelectItem value="large">Grande</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="w-full btn-primary-gradient" onClick={() => handleSaveChanges('Aparência')}>Salvar Alterações</Button>
                    </CardContent>
                </Card>

                {/* Accessibility Settings Card */}
                <Card className="gradient-surface border-0 rounded-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Accessibility className="text-primary"/> Acessibilidade</CardTitle>
                        <CardDescription>Ajustes para melhorar a sua experiência.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <Label htmlFor="high-contrast" className="flex flex-col gap-1">
                                <span>Modo de Alto Contraste</span>
                                <span className="text-xs text-white/60">Aumenta o contraste das cores para melhor legibilidade.</span>
                            </Label>
                            <Switch id="high-contrast" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <Label htmlFor="reduced-motion" className="flex flex-col gap-1">
                                <span>Reduzir Movimento</span>
                                <span className="text-xs text-white/60">Desativa animações e transições na interface.</span>
                            </Label>
                            <Switch id="reduced-motion" defaultChecked />
                        </div>
                        <Button className="w-full btn-primary-gradient mt-4" onClick={() => handleSaveChanges('Acessibilidade')}>Salvar Alterações</Button>
                    </CardContent>
                </Card>
                
                {/* Data & Privacy Settings Card */}
                <Card className="gradient-surface border-0 rounded-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><FileDown className="text-primary"/> Dados e Privacidade</CardTitle>
                        <CardDescription>Faça a gestão dos seus dados pessoais.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                           <div>
                             <h4 className="font-semibold">Exportar Meus Dados</h4>
                             <p className="text-sm text-white/60">Faça o download de todos os seus dados em formato JSON.</p>
                           </div>
                           <Button variant="outline" className="bg-white/10 border-white/20">Exportar</Button>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
