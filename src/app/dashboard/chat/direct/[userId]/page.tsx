
'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCurrentUser, users, messages } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Paperclip, Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

const currentUser = getCurrentUser();

export default function DirectMessageChatPage() {
    const params = useParams();
    const otherUserId = Number(params.userId);
    const otherUser = users.find(u => u.id === otherUserId);

    const [inputValue, setInputValue] = useState('');

    const channelMessages = useMemo(() => {
        // In a real app, you'd fetch this from a database.
        // Here, we simulate a channel name for direct messages.
        const channelId = [currentUser.id, otherUserId].sort().join('-');
        return (messages as any)[channelId] || [];
    }, [otherUserId]);

    const handleSendMessage = () => {
        if(inputValue.trim()){
            // This is where you would handle the logic to send a message.
            console.log("Sending message to", otherUser?.name, ":", inputValue);
            setInputValue('');
        }
    }

    if (!otherUser) {
        return (
            <div className="p-6 fade-in h-full flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white">Utilizador não encontrado</h1>
                    <p className="text-white/60">O utilizador que procura não existe ou não está disponível.</p>
                </div>
            </div>
        );
    }
    
    const avatar = PlaceHolderImages.find(p => p.id === `user-avatar-${otherUser.id}`)?.imageUrl;

    return (
        <div className="p-6 fade-in h-full flex flex-col">
            <div className="flex-shrink-0 mb-6">
                <div className="flex items-center gap-4">
                     <Avatar className="w-12 h-12">
                        <AvatarImage src={avatar} alt={otherUser.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Conversa com {otherUser.name}</h1>
                        <p className="text-white/60 text-sm">{otherUser.role} • {otherUser.department}</p>
                    </div>
                </div>
            </div>

            <div id="chat-messages" className="flex-grow gradient-surface p-6 rounded-2xl overflow-y-auto custom-scrollbar flex flex-col gap-6">
                {channelMessages.length === 0 && (
                    <div className="flex-grow flex items-center justify-center">
                        <p className="text-white/50">Ainda não há mensagens. Comece a conversa!</p>
                    </div>
                )}
                {channelMessages.map((msg: any) => {
                    const user = users.find(u => u.id === msg.userId);
                    const isSelf = msg.userId === currentUser.id;
                    const userAvatar = PlaceHolderImages.find(p => p.id === `user-avatar-${user?.id}`)?.imageUrl;
                    return (
                        <div key={msg.id} className={`flex items-start gap-4 ${isSelf ? 'flex-row-reverse' : ''}`}>
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={userAvatar} alt={user?.name} data-ai-hint="person portrait" />
                                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="max-w-xl">
                                <div className={`p-4 rounded-3xl ${isSelf ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-white/10 rounded-bl-none'}`}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-sm">{user?.name}</span>
                                        <span className="text-xs opacity-60">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <p className="text-sm">{msg.content}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="flex-shrink-0 mt-4">
                <div className="relative">
                    <Paperclip className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                    <Input 
                        type="text" 
                        placeholder={`Enviar mensagem para ${otherUser.name}...`}
                        className="w-full h-auto p-4 pl-12 pr-28 bg-white/10 border-white/20 rounded-xl focus:outline-none focus:border-primary text-white placeholder-white/50"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button 
                        className="absolute right-4 top-1/2 -translate-y-1/2 btn-primary-gradient px-4 py-2 text-white font-semibold rounded-lg h-auto"
                        onClick={handleSendMessage}
                    >
                        <Send className="w-4 h-4 mr-2" /> Enviar
                    </Button>
                </div>
            </div>
        </div>
    );
}
