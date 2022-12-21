// convert events into monthly calendar data view
export function eventCalendarData(events) {
  
  const date = new Date();

  const convertDate = (rawDate) => {
    const dateString = rawDate;
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate
  }
  
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const numDaysFromPrevMonth = firstDayOfMonth.getDay() - 1;
  
  const prevMonthDays = [];
  const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  const numDaysInPrevMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate();
  
  for (let i = numDaysInPrevMonth - numDaysFromPrevMonth + 1; i <= numDaysInPrevMonth; i++) {
    let newDate = convertDate(new Date(prevMonth.getFullYear(), prevMonth.getMonth(), i));
    prevMonthDays.push({
      date: newDate,
      events: []
    });
  }
  
  const numDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  
  const currentDays = [];
  for (let i = 1; i <= numDaysInMonth; i++) {
    // for (let j = 0; j < events.length; j++) {
    //   const element = array[j];
      
    // }
    let newDate = convertDate(new Date(date.getFullYear(), date.getMonth(), i));
    currentDays.push({
      date: newDate,
      isCurrentMonth: true,
      events: []
    });
  }
  
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const numDaysFromNextMonth = 7 - lastDayOfMonth.getDay();
  
  const nextMonthDays = [];
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const numDaysInNextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate();
  for (let i = 1; i <= numDaysFromNextMonth; i++) {
    let newDate = convertDate(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i));
    nextMonthDays.push({
      date: newDate,
      events: []
    });
  }
  
  const days = prevMonthDays.concat(currentDays, nextMonthDays);
  return days
}

