import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Project} from '../../../common/project';
import {ProjectService} from '../../../services/project.service';
import {MatDialog} from '@angular/material/dialog';
import {ProjectDialogCreateComponent} from '../dialog/project-dialog-create/project-dialog-create.component';
import {AccountService} from "../../../services/account.service";
import {StatusProject} from "../../../common/status-project.enum";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProjectListComponent implements OnInit{
  projects: Project[];
  title: string;
  page = 0;
  totalElements: number;
  totalPages: number;
  pageSize = 5;
  sort = 'id';
  direction = 'desc';
  pageSizeOptions = [5, 10, 25, 100];

  constructor(private projectService: ProjectService,
              public dialog: MatDialog, private accountService: AccountService) {
    this.accountService.verification();
  }

  ngOnInit(): void {
    this.listProject();
    this.title = 'Проекты';
  }

  listProject() {
    this.handleListProject();
  }

  paginationData(data) {
    this.page = data.pageIndex;
    this.pageSize = data.pageSize;
    this.listProject();
  }

  sortData(sort) {
    this.sort = sort.active;
    this.direction = sort.direction;
    this.handleListProject();
  }

  create(project: Project) {
    this.projectService.create(project).subscribe(() => {
      this.listProject();
    });
  }

  delete(id: number) {
    this.projectService.delete(id).subscribe(() => {
      this.listProject();
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProjectDialogCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.create(result);
    });
  }

  getStatus(status) {
    return StatusProject[status];
  }

  private handleListProject() {
    this.projectService.getProjectsPaginate(this.page, this.pageSize, this.sort, this.direction).subscribe(
      data => {
        this.projects = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.page = data.number;
        this.pageSize = data.size;
      }
    );
  }

}
