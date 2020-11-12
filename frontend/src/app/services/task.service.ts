import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TaskProject} from '../common/task-project';
import {map} from 'rxjs/operators';
import {Priority} from '../common/priority.enum';
import {AccountService} from "./account.service";
import {Project} from "../common/project";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) {
  }

  getAll(
    page: number,
    size: number): Observable<GetResponseTask> {
    return this.httpClient.get<GetResponseTask>(`${this.url}/tasks?page=${page}&size=${size}`, AccountService.getHeaders);
  }

  getAllByProject(
    id: number,
    page: number,
    size: number,
    sort: string,
    direction: string): Observable<GetResponseTask> {
    return this.httpClient
      .get<GetResponseTask>(`${this.url}/${id}/tasks?page=${page}&size=${size}&sort=${sort}&direction=${direction}`, AccountService.getHeaders)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  getById(id: number){
    return this.httpClient.get<TaskProject>(`${this.url}/tasks/${id}`, AccountService.getHeaders);
  }

  completedTask(task: TaskProject) {
    return this.httpClient.put(`${this.url}/tasks`, task, AccountService.getHeaders);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.url}/tasks/${id}`, AccountService.getHeaders);
  }

  create(task: TaskProject) {
    return this.httpClient.post(`${this.url}/tasks`, task, AccountService.getHeaders);
  }

  update(task: TaskProject) {
    return this.httpClient.put(`${this.url}/tasks`, task, AccountService.getHeaders);
  }
}

interface GetResponseTask {
  content: TaskProject[];
  size: number;
  number: number;
  totalPages: number;
  totalElements: number;
}
