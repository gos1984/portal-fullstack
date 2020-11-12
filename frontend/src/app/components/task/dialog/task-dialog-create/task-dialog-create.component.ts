import {Component, Inject, OnInit} from '@angular/core';
import {TaskService} from '../../../../services/task.service';
import {TaskProject} from '../../../../common/task-project';
import {Priority} from '../../../../common/priority.enum';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Project} from '../../../../common/project';
import {ProjectService} from '../../../../services/project.service';

@Component({
  selector: 'app-task-dialog-create',
  templateUrl: './task-dialog-create.component.html',
  styleUrls: ['./task-dialog-create.component.scss']
})
export class TaskDialogCreateComponent implements OnInit {

  task: TaskProject;
  priority = Priority;

  constructor(private taskService: TaskService,
              private projectService: ProjectService,
              private route: ActivatedRoute,
              public dialogRef: MatDialogRef<TaskDialogCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    this.task = new TaskProject();
    this.projectService.getById(this.data.project).subscribe(data => {
      this.task.project = data;
    });
  }

  create() {
    this.dialogRef.close(this.task);
  }

  priorityKeys() {
    return Object.keys(this.priority);
  }
}

interface DialogData {
  project: number;
}
