// src/contexts/TaskContext.tsx

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  dueDate: string | null;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (text: string, dueDate?: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  updateTaskDueDate: (id: number, dueDate: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const loadTasks = () => {
      if (user) {
        const storedTasks = localStorage.getItem(`tasks_${user.uid}`);
        console.log("Loading stored tasks for user:", user.uid, storedTasks);
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        } else {
          setTasks([]);
        }
      } else {
        setTasks([]);
      }
    };

    loadTasks();

    // Add an event listener to handle changes in localStorage
    window.addEventListener('storage', loadTasks);

    return () => {
      window.removeEventListener('storage', loadTasks);
    };
  }, [user]);

  useEffect(() => {
    if (user && tasks.length > 0) {
      console.log("Saving tasks for user:", user.uid, tasks);
      localStorage.setItem(`tasks_${user.uid}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  const addTask = (text: string, dueDate?: string) => {
    console.log("Adding task:", text, dueDate);
    setTasks(prevTasks => {
      const newTasks = [
        ...prevTasks,
        { id: Date.now(), text, completed: false, dueDate: dueDate || null }
      ];
      console.log("New tasks state:", newTasks);
      return newTasks;
    });
  };

  const toggleTask = (id: number) => {
    console.log("Toggling task:", id);
    setTasks(prevTasks => {
      const newTasks = prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      console.log("New tasks state after toggle:", newTasks);
      return newTasks;
    });
  };

  const deleteTask = (id: number) => {
    console.log("Deleting task:", id);
    setTasks(prevTasks => {
      const newTasks = prevTasks.filter(task => task.id !== id);
      console.log("New tasks state after delete:", newTasks);
      return newTasks;
    });
  };

  const updateTaskDueDate = (id: number, dueDate: string) => {
    console.log("Updating task due date:", id, dueDate);
    setTasks(prevTasks => {
      const newTasks = prevTasks.map(task =>
        task.id === id ? { ...task, dueDate } : task
      );
      console.log("New tasks state after update:", newTasks);
      return newTasks;
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, updateTaskDueDate }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};