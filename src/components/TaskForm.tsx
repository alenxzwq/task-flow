'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

interface TaskFormProps {
  onAdd: (title: string, minutes: number, seconds: number) => void;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const m = parseInt(minutes) || 0;
    const s = parseInt(seconds) || 0;

    if (!title.trim()) {
      setError('Введите название задачи');
      return;
    }
    if (m < 0 || s < 0) {
      setError('Время не может быть отрицательным');
      return;
    }
    if (s > 59) {
      setError('Секунды не могут быть больше 59');
      return;
    }
    if (m === 0 && s === 0) {
      setError('Укажите время задачи');
      return;
    }

    onAdd(title, m, s);
    setTitle('');
    setMinutes('');
    setSeconds('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-8">
      <div className="flex items-center bg-stone-100 rounded-xl p-1.5 transition-all focus-within:ring-2 focus-within:ring-stone-300">
        <input
          type="text"
          placeholder="Добавить задачу..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 bg-transparent px-4 py-2 outline-none text-stone-800 placeholder:text-stone-400"
        />
        <div className="flex items-center gap-1 px-2 border-l border-stone-300">
          <input
            type="number"
            placeholder="Мин"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="w-12 bg-transparent text-center outline-none text-stone-800 placeholder:text-stone-400"
            min="0"
          />
          <span className="text-stone-400">:</span>
          <input
            type="number"
            placeholder="Сек"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            className="w-12 bg-transparent text-center outline-none text-stone-800 placeholder:text-stone-400"
            min="0"
            max="59"
          />
        </div>
        <button
          type="submit"
          className="bg-[#c85a3e] hover:bg-[#b34b31] text-white p-2.5 rounded-lg transition-colors flex items-center justify-center"
          aria-label="Добавить"
        >
          <Plus size={20} />
        </button>
      </div>
      {error && <p className="text-[#c85a3e] text-sm px-2">{error}</p>}
    </form>
  );
}