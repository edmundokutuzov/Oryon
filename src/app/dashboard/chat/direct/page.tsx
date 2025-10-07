
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser, users } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { MessageSquare } from "lucide-react";

export default function DirectMessagesPage() {
    const currentUser = getCurrentUser();
    const otherUsers = users.filter(u => u.id !== currentUser.id);

    return (
        <div className="p-6 fade-in">
            <h1 className="text-3xl font-bold text-white mb-8">Mensagens Diretas</h1>
            <Card className="gradient-surface border-0 rounded-2xl">
                <CardHeader>
                    <CardTitle>Iniciar uma Conversa</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {otherUsers.map(user => {
                            const avatar = PlaceHolderImages.find(p => p.id === `user-avatar-${user.id}`)?.imageUrl;
                            return (
                                <div key={user.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <Avatar>
                                            <AvatarImage src={avatar} alt={user.name} data-ai-hint="person portrait" />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-white">{user.name}</p>
                                            <p className="text-xs text-white/60">{user.role}</p>
                                        </div>
                                    </div>
                                    <Button className="btn-primary-gradient py-1 px-4 text-sm font-semibold rounded-lg">
                                        <MessageSquare className="mr-2 h-4 w-4" /> Mensagem
                                    </Button>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
