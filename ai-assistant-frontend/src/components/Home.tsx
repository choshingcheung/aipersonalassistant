// src/components/Home.tsx

import React from 'react';
import { Typography, Grid, Paper, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemindersCheck from './RemindersCheck';
import TaskManager from './TaskManager';
import ChatInterface from './ChatInterface';
import Calendar from './Calendar';

const Home: React.FC = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Welcome to Your AI Personal Assistant
      </Typography>
      <RemindersCheck />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h5" gutterBottom>Task Manager</Typography>
            <TaskManager />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h5" gutterBottom>AI Chat Assistant</Typography>
            <ChatInterface />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Calendar />
        </Grid>
      </Grid>
      <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
        <Typography variant="h5" gutterBottom>Instructions</Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>How to Use the Task Manager</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="div">
              <ul>
                <li>Add a new task: Enter the task description and due date, then click "Add Task".</li>
                <li>Mark a task as complete: Click the checkbox next to the task.</li>
                <li>Delete a task: Click the "Delete" button next to the task.</li>
                <li>View task details: Tasks show their description and due date.</li>
                <li>Calendar view: See your tasks displayed on the calendar below.</li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>How to Use the AI Chat Assistant</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="div">
              <ul>
                <li>Add a task: Type "Add task: [your task description]"</li>
                <li>List tasks: Type "Show my tasks" or "List tasks"</li>
                <li>Complete a task: Type "Complete task [task number]"</li>
                <li>Delete a task: Type "Delete task [task number]"</li>
                <li>Ask questions: Start your message with "What", "How", or "Why"</li>
                <li>For any other requests, simply type your message and the AI will try to assist you</li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Tips for Getting the Most Out of Your AI Assistant</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="div">
              <ul>
                <li>Be specific: When asking questions or giving commands, be as clear as possible.</li>
                <li>Use natural language: The AI understands conversational input, so feel free to phrase your requests naturally.</li>
                <li>Explore features: Try out different commands to discover all the AI's capabilities.</li>
                <li>Combine tools: Use both the chat interface and the task manager for comprehensive task management.</li>
                <li>Regular updates: Keep your task list up-to-date for accurate reminders and AI assistance.</li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Box>
  );
};

export default Home;