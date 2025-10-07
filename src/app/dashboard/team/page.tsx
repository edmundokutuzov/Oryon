
'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { users } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Briefcase, Mail, MapPin, Phone, MessageSquare, Video } from "lucide-react";
import { useState } from "react";

const statusClasses: { [key: string]: { bg: string, text: string, ring: string } } = {
  online: { bg: 'bg-green-500', text: 'text-green-300', ring: 'ring-green-500/50' },
  away: { bg: 'bg-yellow-500', text: 'text-yellow-300', ring: 'ring-yellow-500/50' },
  busy: { bg: 'bg-red-500', text: 'text-red-300', ring: 'ring-red-500/50' },
  dnd: { bg: 'bg-purple-500', text: 'text-purple-300', ring: 'ring-purple-500/50' },
  offline: { bg: 'bg-slate-500', text: 'text-slate-400', ring: 'ring-slate-500/50' },
};

export default function TeamPage() {

    const [teamMembers] = useState([...users].sort((a, b) => {
        const statusOrder = { online: 1, away: 2, busy: 3, dnd: 4, offline: 5 };
        return statusOrder[a.status] - statusOrder[b.status];
    }));

  return (
    <div className="p-6 fade-in">
        <h1 className="text-3xl font-bold text-white mb-8">Equipa</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map(user => {
                const avatar = PlaceHolderImages.find(p => p.id === `user-avatar-${user.id}`)?.imageUrl;
                const statusStyle = statusClasses[user.status];

                return (
                    <Card key={user.id} className="gradient-surface border-0 rounded-2xl text-center flex flex-col items-center p-6">
                        <CardHeader className="p-0 items-center">
                            <div className="relative mb-4">
                                <Avatar className="w-24 h-24 border-4 border-background">
                                    <AvatarImage src={avatar} alt={user.name} data-ai-hint="person portrait" />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className={`absolute bottom-1 right-1 block h-4 w-4 rounded-full ${statusStyle.bg} ring-4 ring-background`}></span>
                            </div>
                            <CardTitle className="text-lg font-bold">{user.name}</CardTitle>
                            <p className={`text-sm font-medium ${statusStyle.text}`}>{user.role}</p>
                            <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary/90">{user.department}</Badge>
                        </CardHeader>
                        <CardContent className="p-0 mt-4 text-left text-sm text-white/70 space-y-2 w-full">
                            <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-white/50" /><span>{user.email}</span></div>
                            <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-white/50" /><span>{user.phone}</span></div>
                            <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-white/50" /><span>{user.location}</span></div>
                        </CardContent>
                        <div className="mt-6 flex space-x-3">
                            <Button variant="outline" size="icon" className="bg-white/10 border-white/20 hover:bg-white/20 rounded-full h-11 w-11">
                                <MessageSquare />
                            </Button>
                             <Button variant="outline" size="icon" className="bg-white/10 border-white/20 hover:bg-white/20 rounded-full h-11 w-11">
                                <Video />
                            </Button>
                        </div>
                    </Card>
                )
            })}
        </div>
    </div>
  );
}
