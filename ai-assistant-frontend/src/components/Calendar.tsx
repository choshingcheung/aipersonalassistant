// src/components/Calendar.tsx

import React, { useState } from 'react';
import { Paper, Typography, Grid, Button } from '@mui/material';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { useTasks } from '../contexts/TaskContext';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { tasks } = useTasks();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => task.dueDate && isSameDay(new Date(task.dueDate), date));
  };

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Task Calendar
      </Typography>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Button onClick={handlePrevMonth}>&lt;</Button>
        <Typography variant="h6">{format(currentDate, 'MMMM yyyy')}</Typography>
        <Button onClick={handleNextMonth}>&gt;</Button>
      </Grid>
      <Grid container spacing={1}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Grid item key={day} xs={1.7}>
            <Typography align="center">{day}</Typography>
          </Grid>
        ))}
        {monthDays.map((day) => {
          const tasksForDay = getTasksForDate(day);
          return (
            <Grid item key={day.toString()} xs={1.7}>
              <Paper 
                elevation={isSameMonth(day, currentDate) ? 1 : 0}
                sx={{
                  p: 1,
                  bgcolor: isSameMonth(day, currentDate) ? 'background.paper' : 'background.default',
                  opacity: isSameMonth(day, currentDate) ? 1 : 0.5,
                  position: 'relative',
                }}
              >
                <Typography align="center">{format(day, 'd')}</Typography>
                {tasksForDay.length > 0 && (
                  <Typography
                    variant="caption"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      borderRadius: '50%',
                      width: 16,
                      height: 16,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {tasksForDay.length}
                  </Typography>
                )}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default Calendar;