import {Project} from './project';
import {Priority} from './priority.enum';

export class TaskProject {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  priority: Priority;
  project: Project;
  create: Date;
  modification: Date;
}
