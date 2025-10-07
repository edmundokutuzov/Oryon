
'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor } from "@/components/ui/popover";
import { getCurrentUser, getDepartment, getDepartmentMembers, messages, users } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Paperclip, Send } from "lucide-react";
import { useMemo, useState, useEffect, useRef } from "react";

const currentUser = getCurrentUser();
const department = getDepartment(currentUser.department.toLowerCase());
const departmentMembers = getDepartmentMembers(currentUser.department);
const channel = department?.slug;
const channelMessages = channel ? messages[channel as keyof typeof messages] || [] : [];


export default function DepartmentChatPage() {
    const [inputValue, setInputValue] = useState('');
    const [mentionQuery, setMentionQuery] = useState('');
    const [isMentionPopoverOpen, setMentionPopoverOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const otherMembers = useMemo(() => departmentMembers.filter(m => m.id !== currentUser.id), [departmentMembers]);

    const handleSendMessage = () => {
        if(inputValue.trim()){
            console.log("Sending message:", inputValue);
            setInputValue('');
        }
    }

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
                                <div className={`p-4 rounded-3xl ${isSelf ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-card rounded-bl-none'}`}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className={`font-bold text-sm ${isSelf ? 'text-primary-foreground' : 'text-foreground'}`}>{user?.name}</span>
                                        <span className={`text-xs opacity-60 ${isSelf ? 'text-primary-foreground' : 'text-muted-foreground'}`}>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <p className="text-sm">{msg.content}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="flex-shrink-0 mt-4">
                 <Popover open={isMentionPopoverOpen} onOpenChange={setMentionPopoverOpen}>
                    <PopoverAnchor asChild>
                         <div className="relative">
                            <Paperclip className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input 
                                ref={inputRef}
                                type="text" 
                                placeholder="Escreva uma mensagem..." 
                                className="w-full h-auto p-4 pl-12 pr-28 bg-card border-border rounded-xl focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <Button 
                                className="absolute right-4 top-1/2 -translate-y-1/2 btn-primary-gradient px-4 py-2 text-primary-foreground font-semibold rounded-lg h-auto"
                                onClick={handleSendMessage}
                            >
                                <Send className="w-4 h-4 mr-2" /> Enviar
                            </Button>
                        </div>
                    </PopoverAnchor>
                    <PopoverContent className="w-[calc(100%-48px)] lg:w-[400px] bg-card border-border p-2" align="start" side="top">
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
