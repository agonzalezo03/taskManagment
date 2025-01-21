import { Component, inject, OnInit, viewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { Sprint } from '../../interfaces/sprint.interface';
import { SprintsService } from '../../services/sprints.service';
import { Task } from '../../../tasks/interfaces/task.interdace';
import { TasksService } from '../../../tasks/services/tasks.service';


@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrl: './sprints.component.css',

})
export class SprintsComponent {

  public sprints: Sprint[] = []


  private sprintService = inject(SprintsService)


  constructor(){
    this.loadSprints()
  }



  loadSprints(){
    this.sprintService.getAllSprints().subscribe(res => {
      this.sprints = res

    })
  }


}
