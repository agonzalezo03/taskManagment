import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { State } from '../../interfaces/state.enum';
import { CategoriesService } from '../../../categories/services/categories.service';
import { Category } from '../../../categories/interfaces/categorie.interface';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit{


  readonly dialogRef          = inject(MatDialogRef<TaskFormComponent>);
  private fb                  = inject(FormBuilder)
  private categoriesService   = inject(CategoriesService)

  public states = Object.values(State);
  public allCategories :Category[] = [];
  public selectedCategories :Category[] = []


  public taskForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    state: [State.pending],
    dificulty: [0]
  })

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(res => {
      this.allCategories = res
    })
  }

  addCat(category: Category) {
    // Verificar si la categoría ya está seleccionada
    if (!this.selectedCategories.find(cat => cat.id === category.id)) {
      this.selectedCategories.push(category);
      console.log('Categorías seleccionadas:', this.selectedCategories);
    } else {
      console.log('La categoría ya está seleccionada');
    }
  }

  removeCat(category:Category){
    this.selectedCategories = this.selectedCategories.filter(cat => cat.id !== category.id)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  newTask(){
    console.log(this.taskForm.value)
  }




}
