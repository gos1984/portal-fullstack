import {EventEmitter, Injectable} from '@angular/core';
import {Project} from '../common/project';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AccountService} from "./account.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  totalProject: EventEmitter<number> = new EventEmitter<number>();
  private urlProject = 'http://localhost:8080/api/projects';



  constructor(private httpClient: HttpClient) {}


  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${this.urlProject}/list`, AccountService.getHeaders);
  }

  getProjectsPaginate(
    page: number,
    size: number,
    sort: string,
    direction: string): Observable<GetResponseProject> {
    const urlProject = `${this.urlProject}?page=${page}&size=${size}&sort=${sort}&direction=${direction}`;
    return this.httpClient
      .get<GetResponseProject>(urlProject, AccountService.getHeaders)
      .pipe(
        map(response => {
          this.totalProject.emit(response.totalElements);
          return response;
        })
      );
  }

  getById(id: number) {
    return this.httpClient.get<Project>(`${this.urlProject}/${id}`, AccountService.getHeaders);
  }

  create(project: Project) {
    return this.httpClient.post(this.urlProject, project, AccountService.getHeaders);
  }

  update(project: Project) {
    project.tasks = null;
    return this.httpClient.put(this.urlProject, project, AccountService.getHeaders);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.urlProject}/${id}`, AccountService.getHeaders);
  }
}

interface GetProject {
  content: Project;
  size: number;
  number: number;
  totalPages: number;
  totalElements: number;
}

interface GetResponseProject {
  content: Project[];
  size: number;
  number: number;
  totalPages: number;
  totalElements: number;
}

