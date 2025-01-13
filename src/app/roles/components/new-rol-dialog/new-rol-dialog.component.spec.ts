import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRolDialogComponent } from './new-rol-dialog.component';

describe('NewRolDialogComponent', () => {
  let component: NewRolDialogComponent;
  let fixture: ComponentFixture<NewRolDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewRolDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
