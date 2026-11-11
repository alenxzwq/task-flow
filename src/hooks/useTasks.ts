'use client';

import { useState, useEffect, useCallback } from 'react';
import { Task, FilterType } from '@/types';


const STORAGE_KEY = 'task-flow-tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedTasks: Task[] = JSON.parse(saved);

        const now = Date.now();
        const updatedTasks = parsedTasks.map(task => {
          if (task.isRunning && task.lastStartedAt) {
            const elapsedSeconds = Math.floor((now - task.lastStartedAt) / 1000);
            const newTimeLeft = Math.max(0, task.timeLeft - elapsedSeconds);
            return {
              ...task,
              timeLeft: newTimeLeft,
              isRunning: newTimeLeft > 0,
              isCompleted: newTimeLeft === 0 ? true : task.isCompleted,
            };
          }
          return task;
        });
        
        setTasks(updatedTasks);
      } catch (e) {
        console.error('Failed to parse tasks', e);
      }
    }
    setIsLoaded(true);
  }, []);

 
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);


  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(currentTasks => {
        let hasChanges = false;
        const newTasks = currentTasks.map(task => {
          if (task.isRunning && task.timeLeft > 0) {
            hasChanges = true;
            const newTimeLeft = task.timeLeft - 1;
            return {
              ...task,
              timeLeft: newTimeLeft,
              isRunning: newTimeLeft > 0,
              isCompleted: newTimeLeft === 0 ? true : task.isCompleted,
            };
          }
          return task;
        });
        return hasChanges ? newTasks : currentTasks;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addTask = useCallback((title: string, minutes: number, seconds: number) => {
    const duration = minutes * 60 + seconds;
    if (!title.trim() || duration <= 0) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      initialDuration: duration,
      timeLeft: duration,
      isRunning: false,
      isCompleted: false,
      lastStartedAt: null,
    };

    setTasks(prev => [newTask, ...prev]);
  }, []);

  const toggleTimer = useCallback((id: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id && !task.isCompleted) {
        return {
          ...task,
          isRunning: !task.isRunning,
          lastStartedAt: !task.isRunning ? Date.now() : null,
        };
      }
      return task;
    }));
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
          isRunning: false, 
          lastStartedAt: null,
        };
      }
      return task;
    }));
  }, []);

  const updateTaskTitle = useCallback((id: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, title: newTitle.trim() } : task
    ));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTasks(prev => prev.filter(task => !task.isCompleted));
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  const activeTasksCount = tasks.filter(t => !t.isCompleted).length;
  const hasCompletedTasks = tasks.some(t => t.isCompleted);

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    addTask,
    toggleTimer,
    toggleComplete,
    updateTaskTitle,
    deleteTask,
    clearCompleted,
    activeTasksCount,
    hasCompletedTasks,
    isLoaded
  };
}