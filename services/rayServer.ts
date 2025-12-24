
import { TaskStatus, TrainingTask, VideoGenerationTask } from '../types';

// Simulating a remote GPU cluster managed by Ray
export class RayServerService {
  private static tasks: Map<string, any> = new Map();

  static async submitTraining(config: { name: string; datasetUrl: string }): Promise<string> {
    const taskId = `train_${Math.random().toString(36).substr(2, 9)}`;
    const task: TrainingTask = {
      id: taskId,
      name: config.name,
      status: TaskStatus.RUNNING,
      progress: 0,
      createdAt: new Date().toISOString()
    };
    this.tasks.set(taskId, task);
    
    // Simulate training progress
    this.simulateProgress(taskId);
    return taskId;
  }

  static async submitVideoGeneration(config: { prompt: string; modelId?: string }): Promise<string> {
    const taskId = `gen_${Math.random().toString(36).substr(2, 9)}`;
    const task: VideoGenerationTask = {
      id: taskId,
      prompt: config.prompt,
      status: TaskStatus.RUNNING,
      createdAt: new Date().toISOString()
    };
    this.tasks.set(taskId, task);

    // Simulate video generation
    setTimeout(() => {
      const t = this.tasks.get(taskId);
      if (t) {
        t.status = TaskStatus.COMPLETED;
        t.videoUrl = `https://picsum.photos/seed/${taskId}/1280/720`; // Placeholder for generated video
      }
    }, 15000);

    return taskId;
  }

  private static simulateProgress(taskId: string) {
    let progress = 0;
    const interval = setInterval(() => {
      const task = this.tasks.get(taskId);
      if (!task || progress >= 100) {
        clearInterval(interval);
        if (task) {
          task.status = TaskStatus.COMPLETED;
          task.modelId = `model_${taskId}`;
        }
        return;
      }
      progress += Math.random() * 5;
      task.progress = Math.min(progress, 100);
    }, 2000);
  }

  static getTaskStatus(taskId: string) {
    return this.tasks.get(taskId);
  }
}
