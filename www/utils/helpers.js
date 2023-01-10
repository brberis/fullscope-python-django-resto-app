import moment from 'moment';

// convert date in string format YYYY-MM-DD
export function convertDate(rawDate) {
  const dateString = rawDate;
  const date = new Date(dateString);
  const formattedDate = date.toISOString().split("T")[0];
  return formattedDate
}

// generate days in month view calendar
// insert events into monthly calendar data view
export function eventCalendarData(date, events) {

  const today = convertDate(new Date());
  
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const numDaysFromPrevMonth = firstDayOfMonth.getDay() - 1;
  
  const prevMonthDays = [];
  const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const numDaysInPrevMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate();
  let isToday;
  let isSelected = false;

  for (let i = numDaysInPrevMonth - numDaysFromPrevMonth + 1; i <= numDaysInPrevMonth; i++) {
    
    let newDate = convertDate(new Date(prevMonth.getFullYear(), prevMonth.getMonth(), i));
    today === newDate ? isToday = true : isToday = false;
    prevMonthDays.push({
      date: newDate,
      events: [],
      isSelected,
      isToday
    });
  }
  
  const numDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  
  const currentDays = [];
  for (let i = 1; i <= numDaysInMonth; i++) {
    let newDate = convertDate(new Date(date.getFullYear(), date.getMonth(), i));
    let calendarEvents = [];
    today === newDate ? isToday = true : isToday = false;
    // for each day add events if exists 
    for (let j = 0; j < events?.length; j++) {
      if (events[j].event_date === newDate) {
        calendarEvents.push({
          id: events[j].id,
          name: events[j].title,
          time: events[j].start_time,
          datetime: events[j].datetime,
          href: '#',
        });
      }
    }
    currentDays.push({
      date: newDate,
      isCurrentMonth: true,
      events: calendarEvents,
      isSelected,
      isToday
    });
  }
  
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const numDaysFromNextMonth = 7 - lastDayOfMonth.getDay();
  
  const nextMonthDays = [];
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const numDaysInNextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate();
  for (let i = 1; i <= numDaysFromNextMonth; i++) {
    let newDate = convertDate(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i));
    today === newDate ? isToday = true : isToday = false;
    nextMonthDays.push({
      date: newDate,
      events: [],
      isSelected,
      isToday
    });
  }
  
  const days = prevMonthDays.concat(currentDays, nextMonthDays);
  return days
}

// convert 9:00 PM to 21:00 for django compatibility 
export function timeTo24hours(time) {
  const newTime = moment(time, 'hh:mm A');
  return newTime.format('HH:mm');
}

// get month and year format January, 2022
export function dateToMonthYear(date) {
  const momentDate = moment(date); 
  const formattedDate = momentDate.format('MMMM YYYY')
  return formattedDate;
}

// get date and convert to 05 January, 2022
export function dateToReadableFormat(date) {
  const momentDate = moment(date); 
  const formattedDate = momentDate.format('DD MMMM YYYY')
  return formattedDate;
}
