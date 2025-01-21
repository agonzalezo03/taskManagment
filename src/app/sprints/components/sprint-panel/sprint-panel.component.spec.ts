import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintPanelComponent } from './sprint-panel.component';

describe('SprintPanelComponent', () => {
  let component: SprintPanelComponent;
  let fixture: ComponentFixture<SprintPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SprintPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
