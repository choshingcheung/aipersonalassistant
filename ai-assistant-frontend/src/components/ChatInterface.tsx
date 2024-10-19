// src/components/ChatInterface.tsx

import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import { useTasks } from '../contexts/TaskContext';

interface Message {
  text: string;
  isUser: boolean;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();

  const recognizeIntent = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    if (lowercaseInput.includes('add task') || lowercaseInput.includes('create task')) {
      return 'add_task';
    } else if (lowercaseInput.includes('list tasks') || lowercaseInput.includes('show tasks')) {
      return 'list_tasks';
    } else if (lowercaseInput.includes('complete task') || lowercaseInput.includes('finish task')) {
      return 'complete_task';
    } else if (lowercaseInput.includes('delete task') || lowercaseInput.includes('remove task')) {
      return 'delete_task';
    } else if (lowercaseInput.includes('update task') || lowercaseInput.includes('change task')) {
      return 'update_task';
    } else if (lowercaseInput.startsWith('what') || lowercaseInput.startsWith('how') || lowercaseInput.startsWith('why')) {
      return 'question';
    }
    return 'unknown';
  };

  const handleIntent = (intent: string, input: string): string => {
    switch (intent) {
      case 'add_task':
        const taskText = input.replace(/^(add|create)\s+task:?\s*/i, '').trim();
        if (taskText) {
          addTask(taskText);
          return `Task added: ${taskText}`;
        }
        return "Please provide a task description.";

      case 'list_tasks':
        if (tasks.length === 0) return "You have no tasks.";
        return "Your tasks:\n" + tasks.map((task, index) => 
          `${index + 1}. [${task.completed ? 'x' : ' '}] ${task.text}${task.dueDate ? ` (Due: ${task.dueDate})` : ''}`
        ).join('\n');

      case 'complete_task':
        const completeMatch = input.match(/(\d+)/);
        if (completeMatch) {
          const taskIndex = parseInt(completeMatch[1]) - 1;
          if (taskIndex >= 0 && taskIndex < tasks.length) {
            toggleTask(tasks[taskIndex].id);
            return `Marked task as complete: ${tasks[taskIndex].text}`;
          }
        }
        return "Please specify a valid task number to complete.";

      case 'delete_task':
        const deleteMatch = input.match(/(\d+)/);
        if (deleteMatch) {
          const taskIndex = parseInt(deleteMatch[1]) - 1;
          if (taskIndex >= 0 && taskIndex < tasks.length) {
            const deletedTaskText = tasks[taskIndex].text;
            deleteTask(tasks[taskIndex].id);
            return `Deleted task: ${deletedTaskText}`;
          }
        }
        return "Please specify a valid task number to delete.";

      case 'update_task':
        // Implement task updating logic here
        return "Task updating is not implemented yet.";

      case 'question':
        // Implement basic question answering here
        return "I'm sorry, I don't have enough information to answer that question accurately.";

      default:
        return "I'm not sure how to help with that. Can you try rephrasing your request?";
    }
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    const intent = recognizeIntent(input);
    const response = handleIntent(intent, input);

    const aiMessage: Message = { text: response, isUser: false };
    setMessages(prevMessages => [...prevMessages, aiMessage]);

    setInput('');
  };

  return (
    <Paper sx={{ padding: '20px', maxWidth: '600px', margin: '20px auto' }}>
      <List>
        {messages.map((message, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemText
              primary={message.isUser ? 'You' : 'AI'}
              secondary={message.text}
              sx={{ textAlign: message.isUser ? 'right' : 'left' }}
            />
          </ListItem>
        ))}
      </List>
      <TextField
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type your message here..."
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSend}
        sx={{ marginTop: '10px' }}
      >
        Send
      </Button>
    </Paper>
  );
};

export default ChatInterface;