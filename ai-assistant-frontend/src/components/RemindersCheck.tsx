// src/components/RemindersCheck.tsx

import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle, Stack } from '@mui/material';
import { useTasks } from '../contexts/TaskContext';

const RemindersCheck: React.FC = () => {
  const { tasks } = useTasks();
  const [alerts, setAlerts] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const isOverdue = (dueDate: string | null) => dueDate && new Date(dueDate) < today;
    const isToday = (dueDate: string | null) => dueDate && new Date(dueDate).toDateString() === today.toDateString();
    const isThisWeek = (dueDate: string | null) => {
      if (!dueDate) return false;
      const dueDateTime = new Date(dueDate);
      return dueDateTime > today && dueDateTime <= nextWeek;
    };

    const overdueTasks = tasks.filter(task => !task.completed && isOverdue(task.dueDate));
    const todayTasks = tasks.filter(task => !task.completed && isToday(task.dueDate));
    const thisWeekTasks = tasks.filter(task => !task.completed && isThisWeek(task.dueDate));

    const newAlerts: { [key: string]: string } = {};

    if (overdueTasks.length > 0) {
      newAlerts.overdue = `You have ${overdueTasks.length} overdue task(s):\n${overdueTasks.map(task => `- ${task.text} (Due: ${task.dueDate})`).join('\n')}`;
    }

    if (todayTasks.length > 0) {
      newAlerts.today = `You have ${todayTasks.length} task(s) due today:\n${todayTasks.map(task => `- ${task.text}`).join('\n')}`;
    }

    if (thisWeekTasks.length > 0) {
      newAlerts.thisWeek = `You have ${thisWeekTasks.length} task(s) due this week:\n${thisWeekTasks.map(task => `- ${task.text} (Due: ${task.dueDate})`).join('\n')}`;
    }

    setAlerts(newAlerts);
  }, [tasks]);

  return (
    <Stack spacing={2} sx={{ mb: 2 }}>
      {alerts.overdue && (
        <Alert severity="error" onClose={() => setAlerts(prev => ({ ...prev, overdue: '' }))}>
          <AlertTitle>Overdue Tasks</AlertTitle>
          {alerts.overdue.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </Alert>
      )}
      {alerts.today && (
        <Alert severity="warning" onClose={() => setAlerts(prev => ({ ...prev, today: '' }))}>
          <AlertTitle>Due Today</AlertTitle>
          {alerts.today.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </Alert>
      )}
      {alerts.thisWeek && (
        <Alert severity="info" onClose={() => setAlerts(prev => ({ ...prev, thisWeek: '' }))}>
          <AlertTitle>Due This Week</AlertTitle>
          {alerts.thisWeek.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </Alert>
      )}
    </Stack>
  );
};

export default RemindersCheck;