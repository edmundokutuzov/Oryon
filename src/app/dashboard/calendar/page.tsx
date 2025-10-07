
'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="p-6 fade-in">
      <h1 className="text-3xl font-bold text-white mb-8">Calendário</h1>
      <Card className="gradient-surface border-0 rounded-2xl">
        <CardContent className="p-0">
           <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="p-4 w-full"
            classNames={{
              root: "w-full",
              months: "w-full",
              month: "w-full",
              table: "w-full",
              head_row: "w-full",
              row: "w-full justify-between",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
