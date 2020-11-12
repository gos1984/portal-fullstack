import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Project} from '../../../../common/project';

@Component({
  selector: 'app-project-dialog-create',
  templateUrl: './project-dialog-create.component.html',
  styleUrls: ['./project-dialog-create.component.scss']
})
export class ProjectDialogCreateComponent implements OnInit {

  project: Project;

  constructor(public dialogRef: MatDialogRef<ProjectDialogCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
    this.project = new Project();
  }

  create() {
    this.dialogRef.close(this.project);
  }

}
