
'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCurrentUser, messages, users } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Paperclip, Send } from "lucide-react";
import { useState } from "react";

const currentUser = getCurrentUser();
const channelMessages = messages.geral || [];

export default function GeneralChatPage() {
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = () => {
        if(inputValue.trim()){
            console.log("Sending message:", inputValue);
            setInputValue('');
        }
    }

    return (
        <div className="p-6 fade-in h-full flex flex-col">
            <div className="flex-shrink-0 mb-6">
                <h1 className="text-3xl font-bold text-white">Chat Geral</h1>
                <p className="text-white/60">Canal de comunicação para toda a empresa.</p>
            </div>

            <div id="chat-messages" className="flex-grow gradient-surface p-6 rounded-2xl overflow-y-auto custom-scrollbar flex flex-col gap-6">
                {channelMessages.map(msg => {
                    const user = users.find(u => u.id === msg.userId);
                    const isSelf = msg.userId === currentUser.id;
                    const avatar = PlaceHolderImages.find(p => p.id === `user-avatar-${user?.id}`)?.imageUrl;
                    return (
                        <div key={msg.id} className={`flex items-start gap-4 ${isSelf ? 'flex-row-reverse' : ''}`}>
                             <Avatar className="w-10 h-10">
                                <AvatarImage src={avatar} alt={user?.name} data-ai-hint="person portrait" />
                                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="max-w-xl">
                                <div className={`p-4 rounded-3xl ${isSelf ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-white/10 rounded-bl-none'}`}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-sm">{user?.name}</span>
                                        <span className="text-xs opacity-60">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <p className="text-sm">{msg.content}</p>
                                    {msg.attachments && msg.attachments.length > 0 && (
                                        <div className="mt-2 space-y-2">
                                            {msg.attachments.map(att => (
                                                <div key={att.name} className="flex items-center gap-2 p-2 bg-black/20 rounded-lg">
                                                    <Paperclip className="w-4 h-4 text-white/70"/>
                                                    <div>
                                                        <p className="text-sm font-medium">{att.name}</p>
                                                        <p className="text-xs opacity-70">{att.size}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
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
                        placeholder="Escreva uma mensagem..." 
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
