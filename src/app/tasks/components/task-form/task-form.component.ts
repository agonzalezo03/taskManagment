import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { State } from '../../interfaces/state.enum';
import { CategoriesService } from '../../../categories/services/categories.service';
import { Category } from '../../../categories/interfaces/categorie.interface';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<TaskFormComponent>);
  private fb = inject(FormBuilder);
  private categoriesService = inject(CategoriesService);
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public states = Object.values(State);
  public allCategories: Category[] = [];
  public selectedCategories: Category[] = [];
  public filteredCategories: Category[] = [];

  public taskForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    state: [State.pending],
    difficulty: [1],
    categories: [[]]
  });

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(res => {
      this.allCategories = res;
      this.filteredCategories = res;
    });
  }


  filterCategories(value: string): void {
    this.filteredCategories = this.allCategories.filter(cat =>
      cat.name.toLowerCase().includes(value.toLowerCase())
    );
  }

  addCat(categoryName: string): void {
    const category = this.allCategories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
    if (category && !this.selectedCategories.find(cat => cat.id === category.id)) {
      this.selectedCategories.push(category);
      this.taskForm.controls['categories'].setValue('');
    } else {
      console.log('La categoría ya está seleccionada o no existe');
    }
  }


  selected(event: MatAutocompleteSelectedEvent): void {
    const category = event.option.value;
    if (category && !this.selectedCategories.find(cat => cat.id === category.id)) {
      this.selectedCategories.push(category);
      this.taskForm.controls['categories'].setValue('');
      console.log('Categorías seleccionadas:', this.selectedCategories);
    } else {
      this.taskForm.controls['categories'].setValue('');
      console.log('La categoría ya está seleccionada o no existe');
    }
  }


  removeCat(category: Category): void {
    this.selectedCategories = this.selectedCategories.filter(cat => cat.id !== category.id);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  newTask(): void {
    console.log(this.taskForm.value);
  }

}
