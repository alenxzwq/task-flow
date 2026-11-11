'use client';

import { useTasks } from '@/hooks/useTasks';
import { TaskForm } from '@/components/TaskForm';
import { TaskItem } from '@/components/TaskItem';
import Link from 'next/link';

export default function Home() {
  const {
    tasks, filter, setFilter, addTask, toggleTimer, toggleComplete,
    updateTaskTitle, deleteTask, clearCompleted, activeTasksCount,
    hasCompletedTasks, isLoaded
  } = useTasks();

  if (!isLoaded) return null; // Предотвращаем мерцание при SSR

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-stone-200">
        
        {/* Шапка */}
        <header className="bg-[#1e293b] text-white p-6 sm:p-8 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-wide">TASK FLOW</h1>
          <span className="text-slate-400 text-sm">сегодня</span>
        </header>

        <div className="p-6 sm:p-8">
          <TaskForm onAdd={addTask} />

          {/* Список задач */}
          <div className="flex flex-col min-h-[300px]">
            {tasks.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-stone-400 py-12">
                {filter === 'all' ? 'Нет задач. Добавьте первую!' : 'Задач не найдено'}
              </div>
            ) : (
              tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleTimer={toggleTimer}
                  onToggleComplete={toggleComplete}
                  onUpdateTitle={updateTaskTitle}
                  onDelete={deleteTask}
                />
              ))
            )}
          </div>
        </div>

        {/* Нижняя панель */}
        <footer className="bg-stone-50 border-t border-stone-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-500">
          <div className="font-medium">
            {activeTasksCount} активн.
          </div>
          
          <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg p-1 shadow-sm">
            {(['all', 'active', 'completed'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  filter === f 
                    ? 'bg-stone-100 text-stone-900 font-medium' 
                    : 'hover:text-stone-800'
                }`}
              >
                {f === 'all' ? 'Все' : f === 'active' ? 'Активные' : 'Готово'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={clearCompleted}
              disabled={!hasCompletedTasks}
              className={`transition-colors ${hasCompletedTasks ? 'hover:text-stone-800' : 'opacity-50 cursor-not-allowed'}`}
            >
              Удалить выполненные
            </button>
            <Link href="/about" className="hover:text-stone-800 transition-colors underline decoration-stone-300 underline-offset-4">
              О проекте
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}