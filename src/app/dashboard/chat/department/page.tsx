
'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor } from "@/components/ui/popover";
import { getCurrentUser, getDepartment, getDepartmentMembers, messages as initialMessages, users } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Paperclip, Send, Smile, MoreHorizontal, Pin, Reply, Trash2, Forward, UserCheck, Keyboard } from "lucide-react";
import { useMemo, useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type Message = (typeof initialMessages.geral)[0];

const currentUser = getCurrentUser();
const department = getDepartment(currentUser.department.toLowerCase());
const departmentMembers = getDepartmentMembers(currentUser.department);
const channel = department?.slug;

export default function DepartmentChatPage() {
    const { toast } = useToast();
    const initialChannelMessages = channel ? initialMessages[channel as keyof typeof initialMessages] || [] : [];

    const [inputValue, setInputValue] = useState('');
    const [mentionQuery, setMentionQuery] = useState('');
    const [isMentionPopoverOpen, setMentionPopoverOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [channelMessages, setChannelMessages] = useState<Message[]>(initialChannelMessages);
    const [pinnedMessages, setPinnedMessages] = useState<Message[]>(initialChannelMessages.slice(0, 2));

    const otherMembers = useMemo(() => departmentMembers.filter(m => m.id !== currentUser.id), []);

    const handleSendMessage = () => {
        if(inputValue.trim()){
            const newMessage: Message = {
                id: channelMessages.length + 100, // temp id
                userId: currentUser.id,
                content: inputValue,
                timestamp: new Date().toISOString(),
                reactions: []
            };
            setChannelMessages(prev => [...prev, newMessage]);
            setInputValue('');
        }
    }
    
    const handlePinMessage = (message: Message) => {
        if (pinnedMessages.find(pm => pm.id === message.id)) {
            toast({ title: "Mensagem já fixada." });
            return;
        }
        if (pinnedMessages.length >= 3) {
            toast({ title: "Limite de 3 mensagens fixadas atingido.", description: "Remova uma mensagem fixada para adicionar outra." });
            return;
        }
        setPinnedMessages(prev => [message, ...prev]);
        toast({ title: "Mensagem fixada!", description: `A mensagem de ${users.find(u => u.id === message.userId)?.name} foi fixada no topo.` });
    };

    const handleDeleteMessage = (messageId: number) => {
        setChannelMessages(prev => prev.filter(msg => msg.id !== messageId));
        setPinnedMessages(prev => prev.filter(msg => msg.id !== messageId));
        toast({ title: "Mensagem apagada.", variant: "destructive" });
    };
    
    const handleAction = (action: string) => {
        toast({ title: `Ação: ${action}`, description: "Esta funcionalidade está em desenvolvimento."});
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        
        const lastAt = value.lastIndexOf('@');
        if (lastAt !== -1 && !/\s/.test(value.substring(lastAt))) {
            const query = value.substring(lastAt + 1);
            setMentionQuery(query);
            setMentionPopoverOpen(true);
        } else {
            setMentionPopoverOpen(false);
        }
    }
    
    const handleMentionSelect = (name: string) => {
        const lastAt = inputValue.lastIndexOf('@');
        const newValue = `${inputValue.substring(0, lastAt)}@${name} `;
        setInputValue(newValue);
        setMentionPopoverOpen(false);
        inputRef.current?.focus();
    }
    
    const filteredMembers = useMemo(() => {
        if (!mentionQuery) return otherMembers;
        return otherMembers.filter(m => 
            m.name.toLowerCase().includes(mentionQuery.toLowerCase())
        );
    }, [mentionQuery, otherMembers]);

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
                        <h1 className="text-2xl font-bold text-foreground">Chat do Departamento de {department?.name}</h1>
                        <p className="text-muted-foreground text-sm">Canal de comunicação para a equipa.</p>
                    </div>
                </div>
            </div>

             {pinnedMessages.length > 0 && (
                <div className="flex-shrink-0 mb-4 space-y-2">
                    {pinnedMessages.map(msg => (
                        <div key={`pinned-${msg.id}`} className="bg-primary/10 p-2 rounded-lg text-sm flex items-center gap-2">
                            <Pin className="w-4 h-4 text-primary/80 shrink-0"/>
                            <span className="font-semibold text-primary/90">
                                {users.find(u => u.id === msg.userId)?.name.split(' ')[0]}:
                            </span>
                            <p className="text-foreground/80 truncate">{msg.content}</p>
                        </div>
                    ))}
                </div>
            )}

            <div id="chat-messages" className="flex-grow gradient-surface p-6 rounded-2xl overflow-y-auto custom-scrollbar flex flex-col gap-6">
                {channelMessages.map(msg => {
                    const user = users.find(u => u.id === msg.userId);
                    const isSelf = msg.userId === currentUser.id;
                    const avatar = PlaceHolderImages.find(p => p.id === `user-avatar-${user?.id}`)?.imageUrl;
                    return (
                        <div key={msg.id} className={`group flex items-start gap-4 ${isSelf ? 'flex-row-reverse' : ''}`}>
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={avatar} alt={user?.name} data-ai-hint="person portrait" />
                                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className={`flex items-center gap-2 ${isSelf ? 'flex-row-reverse' : ''}`}>
                                <div className="max-w-xl">
                                    <div className={`p-3 rounded-xl ${isSelf ? 'bg-primary text-primary-foreground rounded-br-none' : `bg-card rounded-bl-none department-${department?.slug} bg-dept-light`}`}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className={`font-bold text-sm text-dept`}>{user?.name}</span>
                                        </div>
                                        <p className="text-sm text-foreground/90">{msg.content}</p>
                                        <div className="text-xs opacity-60 mt-1.5 text-right">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                    </div>
                                </div>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-48 p-2">
                                        <div className="space-y-1 text-sm">
                                            <Button variant="ghost" className="w-full justify-start" onClick={() => handlePinMessage(msg)}><Pin className="mr-2"/> Fixar</Button>
                                            <Button variant="ghost" className="w-full justify-start" onClick={() => handleAction('Responder')}><Reply className="mr-2"/> Responder</Button>
                                            <Button variant="ghost" className="w-full justify-start" onClick={() => handleAction('Reencaminhar')}><Forward className="mr-2"/> Reencaminhar</Button>
                                            <Button variant="ghost" className="w-full justify-start" onClick={() => handleAction('Ver Detalhes')}><UserCheck className="mr-2"/> Ver Detalhes</Button>
                                            <Button variant="ghost" className="w-full justify-start text-destructive" onClick={() => handleDeleteMessage(msg.id)}><Trash2 className="mr-2"/> Apagar</Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="flex-shrink-0 mt-4">
                 <Popover open={isMentionPopoverOpen} onOpenChange={setMentionPopoverOpen}>
                    <PopoverAnchor asChild>
                         <div className="relative">
                            <Button variant="ghost" size="icon" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"><Paperclip /></Button>
                            <Input 
                                ref={inputRef}
                                type="text" 
                                placeholder="Escreva uma mensagem..." 
                                className="w-full h-auto p-4 pl-14 pr-36 bg-card border-border rounded-xl focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="text-muted-foreground"><Smile /></Button>
                                <Button variant="ghost" size="icon" className="text-muted-foreground"><Keyboard /></Button>
                                <Button 
                                    className="btn-primary-gradient px-4 py-2 text-primary-foreground font-semibold rounded-lg h-auto"
                                    onClick={handleSendMessage}
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </PopoverAnchor>
                    <PopoverContent className="w-[calc(100%-48px)] lg:w-[400px] bg-card border-border p-2 mb-2" align="start" side="top">
                       <div className="text-sm font-bold p-2 text-foreground">Mencionar Membro</div>
                       <div className="max-h-60 overflow-y-auto custom-scrollbar">
                         {filteredMembers.length > 0 ? filteredMembers.map(member => {
                            const avatar = PlaceHolderImages.find(p => p.id === `user-avatar-${member.id}`)?.imageUrl;
                             return (
                                <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer" onClick={() => handleMentionSelect(member.name)}>
                                     <Avatar className="w-8 h-8">
                                         <AvatarImage src={avatar} alt={member.name} data-ai-hint="person portrait" />
                                         <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                     </Avatar>
                                     <div>
                                         <p className="font-medium text-foreground text-sm">{member.name}</p>
                                         <p className="text-xs text-muted-foreground">{member.role}</p>
                                     </div>
                                 </div>
                             )
                         }) : (
                            <p className="p-4 text-center text-sm text-muted-foreground">Nenhum membro encontrado.</p>
                         )}
                       </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}

