// src/components/TaskManager.tsx

import React, { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox, TextField, Button, Paper, Box } from '@mui/material';
import { useTasks } from '../contexts/TaskContext';

const TaskManager: React.FC = () => {
  const { tasks, addTask, toggleTask, deleteTask, updateTaskDueDate } = useTasks();
  const [newTask, setNewTask] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      addTask(newTask, newTaskDueDate);
      setNewTask('');
      setNewTaskDueDate('');
    }
  };

  return (
    <Paper sx={{ padding: '20px', maxWidth: '600px', margin: '20px auto' }}>
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <TextField
          fullWidth
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          variant="outlined"
        />
        <TextField
          type="date"
          value={newTaskDueDate}
          onChange={(e) => setNewTaskDueDate(e.target.value)}
          variant="outlined"
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTask}
        sx={{ marginBottom: 2 }}
      >
        Add Task
      </Button>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            disablePadding
            secondaryAction={
              <Box>
                <TextField
                  type="date"
                  value={task.dueDate || ''}
                  onChange={(e) => updateTaskDueDate(task.id, e.target.value)}
                  variant="outlined"
                  size="small"
                />
                <Button onClick={() => deleteTask(task.id)}>Delete</Button>
              </Box>
            }
          >
            <ListItemButton onClick={() => toggleTask(task.id)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={task.completed}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText 
                primary={task.text} 
                secondary={task.dueDate ? `Due: ${task.dueDate}` : null}
                sx={{ textDecoration: task.completed ? 'line-through' : 'none' }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TaskManager;