'use client';

import { useState } from 'react';
import { Play, Pause, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { Task } from '@/types';

interface TaskItemProps {
  task: Task;
  onToggleTimer: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onUpdateTitle: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggleTimer, onToggleComplete, onUpdateTitle, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTitleSubmit = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onUpdateTitle(task.id, editTitle);
    } else {
      setEditTitle(task.title);
    }
    setIsEditing(false);
  };

  return (
    <div className={`group flex items-center gap-4 p-4 border-b border-stone-100 transition-all ${task.isCompleted ? 'opacity-50' : ''}`}>
      <button onClick={() => onToggleComplete(task.id)} className="text-stone-400 hover:text-[#c85a3e] transition-colors">
        {task.isCompleted ? <CheckCircle2 className="text-[#c85a3e]" size={24} /> : <Circle size={24} />}
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            autoFocus
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleTitleSubmit}
            onKeyDown={(e) => e.key === 'Enter' && handleTitleSubmit()}
            className="w-full bg-stone-50 border-b border-stone-300 outline-none px-1 py-0.5 text-stone-800"
          />
        ) : (
          <p 
            onDoubleClick={() => !task.isCompleted && setIsEditing(true)}
            className={`text-stone-800 truncate cursor-pointer select-none ${task.isCompleted ? 'line-through text-stone-400' : ''}`}
            title="Двойной клик для редактирования"
          >
            {task.title}
          </p>
        )}
      </div>

      <div className={`font-mono text-sm tabular-nums font-medium ${task.timeLeft < 60 && task.timeLeft > 0 ? 'text-[#c85a3e]' : 'text-stone-500'}`}>
        {formatTime(task.timeLeft)}
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!task.isCompleted && (
          <button
            onClick={() => onToggleTimer(task.id)}
            className={`p-2 rounded-full transition-colors ${task.isRunning ? 'bg-stone-200 text-stone-700' : 'hover:bg-stone-100 text-stone-500'}`}
            aria-label={task.isRunning ? 'Пауза' : 'Запуск'}
          >
            {task.isRunning ? <Pause size={18} /> : <Play size={18} />}
          </button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 rounded-full hover:bg-red-50 text-stone-400 hover:text-red-500 transition-colors"
          aria-label="Удалить"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}