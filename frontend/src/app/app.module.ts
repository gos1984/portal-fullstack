import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {ProjectListComponent} from './components/project/project-list/project-list.component';
import {ProjectDetailComponent} from './components/project/project-detail/project-detail.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {TaskDetailComponent} from './components/task/task-detail/task-detail.component';
import {TaskListComponent} from './components/task/task-list/task-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ProjectDialogCreateComponent} from './components/project/dialog/project-dialog-create/project-dialog-create.component';
import {TaskDialogCreateComponent} from './components/task/dialog/task-dialog-create/task-dialog-create.component';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {AuthorizationComponent} from './components/account/authorization/authorization.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import { ProfileComponent } from './components/account/profile/profile.component';


const routes: Routes = [
  {path: '', redirectTo: '/projects', pathMatch: 'full'},
  {path: 'projects', component: ProjectListComponent},
  {path: 'projects/:id', component: ProjectDetailComponent},
  {path: ':projectId/tasks', component: TaskListComponent},
  {path: ':projectId/tasks/:id', component: TaskDetailComponent},
  {path: 'login', component: AuthorizationComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '**', redirectTo: '/projects', pathMatch: 'full'},
];
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    TaskDetailComponent,
    TaskListComponent,
    ProjectDialogCreateComponent,
    TaskDialogCreateComponent,
    AuthorizationComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgbPaginationModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [MatFormFieldModule, MatInputModule]
})
export class AppModule { }
