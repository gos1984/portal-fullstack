import { Component, OnInit } from '@angular/core';
import {Project} from '../../../common/project';
import {ProjectService} from '../../../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {StatusProject} from "../../../common/status-project.enum";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  project: Project;
  title: string;
  edit = false;
  status = StatusProject;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private accountService: AccountService) {
    this.accountService.verification();
  }

    ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProjectDetail();
    });
  }

  handleProjectDetail() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.projectService.getById(id).subscribe(
      data => {
        this.project = data;
        this.title = data.name;
      }
    );
  }

  editToggle() {
    this.edit = !this.edit;
  }

  statusKeys() {
    return Object.keys(this.status);
  }

  getStatus(status) {
    return StatusProject[status];
  }

  update() {
    this.projectService.update(this.project).subscribe(() => {
      this.handleProjectDetail();
      this.edit = false;
    });
  }
}
