import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDialogCreateComponent } from './project-dialog-create.component';

describe('ProjectDialogCreateComponent', () => {
  let component: ProjectDialogCreateComponent;
  let fixture: ComponentFixture<ProjectDialogCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDialogCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDialogCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
