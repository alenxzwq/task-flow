export type Task = {
  id: string;
  title: string;
  initialDuration: number; 
  timeLeft: number;        
  isRunning: boolean;      
  isCompleted: boolean;    
  lastStartedAt: number | null;
}

export type FilterType = 'all' | 'active' | 'completed';