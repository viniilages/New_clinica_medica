import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

interface Event {
  title: string;
  date: string;
  color: string;
}

interface CalendarProps {
  events: Event[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  return (
    <FullCalendar
      locale="pt-br" 
      buttonText={{
        today: "Hoje",
      }}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventContent={(eventInfo) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: eventInfo.event.backgroundColor,
              marginRight: '5px',
            }}
          />
          <span>{eventInfo.event.title}</span>
        </div>
      )}
    />
  );
};

export default Calendar;