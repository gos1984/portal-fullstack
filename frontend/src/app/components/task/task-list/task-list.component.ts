import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../../services/task.service';
import {TaskProject} from '../../../common/task-project';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../../../common/project';
import {ProjectService} from '../../../services/project.service';
import {MatDialog} from '@angular/material/dialog';
import {TaskDialogCreateComponent} from '../dialog/task-dialog-create/task-dialog-create.component';
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: TaskProject[];
  title: string;
  page = 0;
  totalElements: number;
  totalPages: number;
  pageSize = 5;
  project: Project;
  sort = 'id';
  direction = 'desc';
  pageSizeOptions = [5, 10, 25, 100];
  projectId: number;

  constructor(private taskService: TaskService,
              private projectService: ProjectService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private accountService: AccountService) {
    this.accountService.verification();
  }

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe(() => {
      this.handleListTask();
    });
    this.listTask();
    this.title = 'Задачи';
  }

  listTask() {
    this.handleListTask();
  }

  completed(task: TaskProject) {
    this.projectId = +this.route.snapshot.paramMap.get('id');
    task.completed = !task.completed;
    this.projectService.getById(this.projectId).subscribe(data => {
      task.project = data;
      this.taskService.completedTask(task).subscribe();
    });
  }

  paginationData(data) {
    this.page = data.pageIndex;
    this.pageSize = data.pageSize;
    this.listTask();
  }

  sortData(data) {
    this.projectId = +this.route.snapshot.paramMap.get('id');
    this.sort = data.active;
    this.direction = data.direction;
    this.taskService.getAllByProject(this.projectId, this.page, this.pageSize, this.sort, this.direction).subscribe(this.resultProcess());
  }

  private handleListTask() {
    this.projectId = +this.route.snapshot.paramMap.get('id');
    if (this.projectId !== 0) {
      this.taskService.getAllByProject(this.projectId, this.page, this.pageSize, this.sort, this.direction).subscribe(this.resultProcess());
    } else {
      this.taskService.getAll(this.page, this.pageSize).subscribe(this.resultProcess());
    }
  }

  private resultProcess() {
    return data => {
      this.tasks = data.content;
      this.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
      this.page = data.number;
      this.pageSize = data.size;
    };
  }

  create(task: TaskProject) {
    this.taskService.create(task).subscribe(() => {
      this.listTask();
    });
  }

  delete(id: number) {
    this.taskService.delete(id).subscribe(() => {
      this.listTask();
    });
  }


  openDialog() {
    const dialogRef = this.dialog.open(TaskDialogCreateComponent, {
      data: {
        project: this.projectId
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.create(result);
    });
  }
}
