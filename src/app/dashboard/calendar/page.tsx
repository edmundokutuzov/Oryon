
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { useState }from 'react';
import { calendarEvents, getCurrentUser, nationalHolidays } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Video, Flag, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

type Note = { date: string; text: string; };

const currentUser = getCurrentUser();

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const { toast } = useToast();

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getDate() === d2.getDate() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getFullYear() === d2.getFullYear();
  }

  const eventsForSelectedDay = date ? calendarEvents.filter(event => {
    const eventDate = new Date(event.start);
    return isSameDay(eventDate, date) &&
           (event.participants.includes(currentUser.id) || event.createdBy === currentUser.id);
  }) : [];

  const notesForSelectedDay = date ? notes.filter(note => isSameDay(new Date(note.date), date)) : [];

  const handleAddNote = () => {
    if (newNote.trim() && date) {
      const formattedDate = date.toISOString().split('T')[0];
      setNotes([...notes, { date: formattedDate, text: newNote }]);
      setNewNote('');
      toast({ title: 'Nota adicionada', description: 'A sua nota foi salva no calendário.'});
    }
  };

  return (
    <div className="p-6 fade-in grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold text-foreground mb-8">Calendário</h1>
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
                head_cell: "w-full text-muted-foreground font-normal text-sm",
                row: "w-full flex justify-between mt-2",
                cell: "h-24 w-full text-center text-sm p-1 relative flex flex-col justify-start items-center rounded-lg border border-transparent transition-colors",
                day: "w-full h-full justify-start p-2",
                day_selected: "bg-primary/20 border-primary/50 text-foreground",
                day_today: "border-primary text-primary",
                day_outside: "text-muted-foreground/30",
              }}
              components={{
                DayContent: ({ date }) => {
                  const dailyEvents = calendarEvents.filter(event => {
                     const eventDate = new Date(event.start);
                     return isSameDay(eventDate, date) &&
                             (event.participants.includes(currentUser.id) || event.createdBy === currentUser.id);
                  });
                  const holiday = nationalHolidays.find(h => {
                    const holidayDate = new Date(h.date);
                    return isSameDay(holidayDate, date);
                  });
                   const dailyNotes = notes.filter(n => isSameDay(new Date(n.date), date));

                  return (
                    <>
                      <span>{date.getDate()}</span>
                       {holiday && <Flag className="w-3 h-3 text-red-400 absolute top-2 right-2" title={holiday.name} />}
                      <div className="flex flex-col gap-1 mt-1 w-full">
                        {dailyEvents.map(event => (
                           <div key={event.id} className={`w-full h-1.5 rounded-full ${event.type === 'meeting' ? 'bg-blue-400' : event.type === 'presentation' ? 'bg-purple-400' : 'bg-green-400'}`} title={event.title}></div>
                        ))}
                        {dailyNotes.length > 0 && (
                            <div className="w-full h-1.5 rounded-full bg-yellow-400" title={`${dailyNotes.length} nota(s)`}></div>
                        )}
                      </div>
                    </>
                  );
                },
              }}
            />
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1 lg:mt-[76px] space-y-8">
         <Card className="gradient-surface border-0 rounded-2xl">
            <CardHeader>
                <CardTitle>Eventos de {date ? date.toLocaleDateString('pt-PT', { day: 'numeric', month: 'long'}) : 'hoje'}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {eventsForSelectedDay.length > 0 ? eventsForSelectedDay.map(event => (
                        <div key={event.id} className={`p-4 rounded-xl bg-card/5 border-l-4 border-primary`}>
                            <h3 className="font-semibold text-foreground">{event.title}</h3>
                            <p className="text-muted-foreground text-sm mt-1">{event.description}</p>
                            <div className="text-xs text-muted-foreground mt-3 space-y-1">
                                <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />{new Date(event.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(event.end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{event.location}</p>
                            </div>
                            {event.type === "meeting" && (
                                <Button size="sm" className="mt-4 w-full bg-primary/20 text-primary hover:bg-primary/30" onClick={() => alert(`Joining meeting: ${event.title}`)}>
                                    <Video className="mr-2 h-4 w-4"/> Entrar na Reunião
                                </Button>
                            )}
                        </div>
                    )) : (
                        <p className="text-muted-foreground text-center py-4">Nenhum evento para este dia.</p>
                    )}

                    {notesForSelectedDay.map((note, index) => (
                         <div key={index} className={`p-4 rounded-xl bg-yellow-500/10 border-l-4 border-yellow-500`}>
                            <h3 className="font-semibold text-yellow-300 flex items-center gap-2"><Star className="w-4 h-4"/> Lembrete</h3>
                            <p className="text-foreground/90 text-sm mt-1">{note.text}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
         </Card>
          <Card className="gradient-surface border-0 rounded-2xl">
            <CardHeader>
                <CardTitle>Adicionar Nota/Lembrete</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2">
                    <Input 
                        placeholder="Escreva uma nota rápida..." 
                        className="bg-card border-border"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                    />
                    <Button onClick={handleAddNote} className="btn-primary-gradient shrink-0">
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
