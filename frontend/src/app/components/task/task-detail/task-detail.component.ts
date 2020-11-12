import { Component, OnInit } from '@angular/core';
import {TaskProject} from '../../../common/task-project';
import {TaskService} from '../../../services/task.service';
import {ProjectService} from '../../../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../../../common/project';
import {AccountService} from "../../../services/account.service";
import {Priority} from "../../../common/priority.enum";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  taskId: number;
  projectId: number;
  task: TaskProject;
  project: Project;
  priority = Priority;
  edit = false;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private accountService: AccountService) {
    this.accountService.verification();
  }

  ngOnInit(): void {
    this.taskId = +this.route.snapshot.paramMap.get('id');
    this.projectId = +this.route.snapshot.paramMap.get('projectId');
    this.route.paramMap.subscribe(() => {
      this.handleTask();
    });
  }

  private handleTask() {
    this.taskId = +this.route.snapshot.paramMap.get('id');
    this.projectId = +this.route.snapshot.paramMap.get('projectId');

    this.taskService.getById(this.taskId).subscribe(data => {
      this.task = data;
    });
    this.projectService.getById(this.projectId).subscribe(data => {
      this.project = data;
    });
  }

  update() {
    this.taskService.update(this.task).subscribe(() => {
      this.handleTask();
      this.edit = false;
    });
  }

  editToggle() {
    this.edit = !this.edit;
  }

  priorityKeys() {
    return Object.keys(Priority);
  }

  getPriority(priority) {
    return Priority[priority];
  }
}
