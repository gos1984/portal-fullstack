import {Component, OnInit} from '@angular/core';
import {Project} from '../../common/project';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  projects: Project[];
  selectedProject: Project;
  panelOpenState: boolean;

  constructor(private projectService: ProjectService) {
    projectService.totalProject.subscribe(() => {
      this.handleListProject();
    });
  }
  ngOnInit(): void {
    this.handleListProject();
  }

  private handleListProject() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }

}
