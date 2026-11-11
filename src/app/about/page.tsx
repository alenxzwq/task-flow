import Link from 'next/link';
import { ArrowLeft, Timer, CheckCircle } from 'lucide-react';

export default function About() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-stone-200">
        
        <header className="bg-[#1e293b] text-white p-6 sm:p-8 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-wide">О ПРОЕКТЕ</h1>
          <Link href="/" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Назад
          </Link>
        </header>

        <div className="p-8 sm:p-12 space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-stone-800">Task Flow</h2>
            <p className="text-stone-600 leading-relaxed">
              Утонченный менеджер личных задач с встроенным таймером обратного отсчета. 
              Приложение помогает сфокусироваться на текущей задаче, отслеживать время и сохранять 
              прогресс даже после перезагрузки страницы.
            </p>
            <div className="flex gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-stone-500 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-100">
                <Timer size={16} /> Таймер
              </div>
              <div className="flex items-center gap-2 text-sm text-stone-500 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-100">
                <CheckCircle size={16} /> LocalStorage
              </div>
            </div>
          </section>

          <hr className="border-stone-100" />

          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-stone-400 uppercase tracking-wider">Автор</h3>
            <p className="text-stone-800 font-medium text-lg">Ваше Имя</p>
            <p className="text-stone-500">Frontend Developer</p>
            <div className="pt-4">
              <a href="https://github.com/your-username" target="_blank" rel="noreferrer" className="text-[#c85a3e] hover:underline">
                GitHub Profile
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}