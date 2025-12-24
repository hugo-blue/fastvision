
export enum TaskStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export interface User {
  id: string;
  email: string;
  name: string;
  credits: number;
  subscription: 'FREE' | 'PRO' | 'ENTERPRISE';
  hasPaymentMethod: boolean;
}

export interface TrainingTask {
  id: string;
  name: string;
  status: TaskStatus;
  progress: number;
  createdAt: string;
  modelId?: string;
}

export interface VideoGenerationTask {
  id: string;
  prompt: string;
  status: TaskStatus;
  videoUrl?: string;
  createdAt: string;
}

export interface ApiKey {
  id: string;
  key: string;
  name: string;
  usageCount: number;
}
