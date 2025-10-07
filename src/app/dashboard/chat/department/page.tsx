
'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCurrentUser, getDepartment, getDepartmentMembers, messages, users } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Paperclip, Send } from "lucide-react";
import { useMemo } from "react";

const currentUser = getCurrentUser();
const department = getDepartment(currentUser.department.toLowerCase());
const departmentMembers = getDepartmentMembers(currentUser.department);
const channel = department?.slug;
const channelMessages = channel ? messages[channel as keyof typeof messages] || [] : [];


export default function DepartmentChatPage() {

    const otherMembers = useMemo(() => departmentMembers.filter(m => m.id !== currentUser.id), [departmentMembers]);

    return (
        <div className="p-6 fade-in h-full flex flex-col">
            <div className="flex-shrink-0 mb-6">
                <div className="flex items-center gap-4">
                    <div className="flex -space-x-4">
                        {otherMembers.slice(0, 3).map(member => {
                             const avatar = PlaceHolderImages.find(p => p.id === `user-avatar-${member.id}`)?.imageUrl;
                            return <Avatar key={member.id} className="border-2 border-background">
                                <AvatarImage src={avatar} alt={member.name} data-ai-hint="person portrait" />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        })}
                         {otherMembers.length > 3 && (
                            <Avatar className="border-2 border-background">
                                <AvatarFallback>+{otherMembers.length - 3}</AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Chat do Departamento de {department?.name}</h1>
                        <p className="text-white/60 text-sm">Canal de comunicação para a equipa.</p>
                    </div>
                </div>
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
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="flex-shrink-0 mt-4">
                <div className="relative">
                    <Paperclip className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                    <Input type="text" placeholder="Escreva uma mensagem..." className="w-full h-auto p-4 pl-12 pr-28 bg-white/10 border-white/20 rounded-xl focus:outline-none focus:border-primary text-white placeholder-white/50" />
                    <Button className="absolute right-4 top-1/2 -translate-y-1/2 btn-primary-gradient px-4 py-2 text-white font-semibold rounded-lg h-auto">
                        <Send className="w-4 h-4 mr-2" /> Enviar
                    </Button>
                </div>
            </div>
        </div>
    );
}
