import {TaskProject} from './task-project';
import {StatusProject} from "./status-project.enum";

export class Project {
  id: number;
  name: string;
  description: string;
  url: string;
  status: StatusProject;
  tasks: TaskProject[];
  create: Date;
  modification: Date;
}
