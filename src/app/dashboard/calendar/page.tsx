
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { useState }from 'react';
import { calendarEvents, getCurrentUser } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Video } from 'lucide-react';

const currentUser = getCurrentUser();

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const eventsForSelectedDay = date ? calendarEvents.filter(event => {
    const eventDate = new Date(event.start);
    return eventDate.getDate() === date.getDate() &&
           eventDate.getMonth() === date.getMonth() &&
           eventDate.getFullYear() === date.getFullYear() &&
           (event.participants.includes(currentUser.id) || event.createdBy === currentUser.id);
  }) : [];

  return (
    <div className="p-6 fade-in grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold text-white mb-8">Calendário</h1>
        <Card className="gradient-surface border-0 rounded-2xl">
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="p-4"
              classNames={{
                root: "w-full",
                months: "w-full",
                month: "w-full space-y-6",
                table: "w-full border-collapse",
                head_row: "w-full flex justify-between",
                head_cell: "w-full text-white/60 font-normal text-sm",
                row: "w-full flex justify-between mt-2",
                cell: "h-24 w-full text-center text-sm p-1 relative flex flex-col justify-start items-center rounded-lg border border-transparent transition-colors",
                day: "w-full h-full justify-start p-2",
                day_selected: "bg-primary/20 border-primary/50 text-white",
                day_today: "border-primary text-primary",
                day_outside: "text-white/30",
              }}
              components={{
                DayContent: ({ date }) => {
                  const dailyEvents = calendarEvents.filter(event => {
                     const eventDate = new Date(event.start);
                     return eventDate.getDate() === date.getDate() &&
                            eventDate.getMonth() === date.getMonth() &&
                            eventDate.getFullYear() === date.getFullYear() &&
                             (event.participants.includes(currentUser.id) || event.createdBy === currentUser.id);
                  });
                  return (
                    <>
                      <span>{date.getDate()}</span>
                      <div className="flex flex-col gap-1 mt-1 w-full">
                        {dailyEvents.map(event => (
                           <div key={event.id} className={`w-full h-1.5 rounded-full ${event.type === 'meeting' ? 'bg-blue-400' : event.type === 'presentation' ? 'bg-purple-400' : 'bg-green-400'}`} title={event.title}></div>
                        ))}
                      </div>
                    </>
                  );
                },
              }}
            />
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1 lg:mt-[76px]">
         <Card className="gradient-surface border-0 rounded-2xl">
            <CardHeader>
                <CardTitle>Eventos de {date ? date.toLocaleDateString('pt-PT', { day: 'numeric', month: 'long'}) : 'hoje'}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {eventsForSelectedDay.length > 0 ? eventsForSelectedDay.map(event => (
                        <div key={event.id} className={`p-4 rounded-xl bg-white/5 border-l-4 border-primary`}>
                            <h3 className="font-semibold text-white">{event.title}</h3>
                            <p className="text-white/70 text-sm mt-1">{event.description}</p>
                            <div className="text-xs text-white/60 mt-3 space-y-1">
                                <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />{new Date(event.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(event.end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{event.location}</p>
                            </div>
                            {event.type === "meeting" && (
                                <Button size="sm" className="mt-4 w-full bg-primary/20 text-primary hover:bg-primary/30">
                                    <Video className="mr-2 h-4 w-4"/> Entrar na Reunião
                                </Button>
                            )}
                        </div>
                    )) : (
                        <p className="text-white/60 text-center py-8">Nenhum evento para este dia.</p>
                    )}
                </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
