import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { State } from '../../interfaces/state.enum';
import { CategoriesService } from '../../../categories/services/categories.service';
import { Category } from '../../../categories/interfaces/categorie.interface';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { UsersService } from '../../../users/services/users.service';
import { User } from '../../../users/interfaces/user.interface';
import { Task } from '../../interfaces/task.interdace';
import { TasksService } from '../../services/tasks.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<TaskFormComponent>);
  private fb = inject(FormBuilder);
  private taskService = inject(TasksService)
  private categoriesService = inject(CategoriesService);
  private usersService = inject(UsersService)
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public states = Object.values(State);
  public allCategories: Category[] = [];
  public selectedCategories: Category[] = [];
  public filteredCategories: Category[] = [];
  public allUsers: User[] = []
  public selectedUsers: User[] = [];
  public filteredUsers: User[] = [];

  public taskForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    state: [State.pending],
    difficulty: [1],
    categories: [[]],
    assign: [[]],
    epic: [false]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { task: any, epicId: any }) {
    console.log(data.task)
    console.log(data.epicId)
  }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(res => {
      this.allCategories = res;
      this.filteredCategories = res;
      if (this.data.task) {
        this.taskForm.reset(this.data.task);
        this.selectedCategories = [];

        const isEpic = this.data.task.categories.includes('epic');
        this.taskForm.patchValue({
          ...this.data.task,
          epic: isEpic
        });

        this.data.task.categories.forEach((taskCat: string) => {

          const category = this.allCategories.find(cat => cat.name.toLowerCase() === taskCat.toLowerCase());
          if (category) {
            this.selectedCategories.push(category);
          }


        });

        this.selectedCategories = [...this.selectedCategories];
      }

    });

    this.usersService.getUsers().subscribe(res => {
      this.allUsers = res;
      this.filteredUsers = res;

      if (this.data.task) {
        this.data.task.assign.forEach((taskUsr: string) => {
          const user = this.allUsers.find(usr => usr.name.toLowerCase() === taskUsr.toLowerCase());
          if (user) {
            this.selectedUsers.push(user);
          }
        });

        this.selectedUsers = [...this.selectedUsers];

      }
    });

    console.log(this.taskForm.value)

  }



  filterCategories(value: string): void {
    this.filteredCategories = this.allCategories.filter(cat =>
      cat.name.toLowerCase().includes(value.toLowerCase())
    );
  }

  filterUsers(value: string): void {
    this.filteredUsers = this.allUsers.filter(usr =>
      usr.name.toLowerCase().includes(value.toLowerCase())
    );
  }

  addCat(categoryName: string): void {
    const category = this.allCategories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
    if (category && !this.selectedCategories.find(cat => cat.id === category.id)) {
      this.selectedCategories.push(category);
      this.taskForm.controls['categories'].setValue('');
    } else {
      console.log('El usuario ya está asignado o no existe');
    }
  }

  addUser(userName: string): void {
    const user = this.allUsers.find(usr => usr.name.toLowerCase() === userName.toLowerCase());
    if (user && !this.selectedUsers.find(usr => usr.id === usr.id)) {
      this.selectedUsers.push(user);
      this.taskForm.controls['users'].setValue('');
    } else {
      console.log('La categoría ya está seleccionada o no existe');
    }
  }


  selectedCat(event: MatAutocompleteSelectedEvent): void {
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

  selectedUsr(event: MatAutocompleteSelectedEvent): void {
    const user = event.option.value;
    if (user && !this.selectedUsers.find(usr => usr.id === user.id)) {
      this.selectedUsers.push(user);
      this.taskForm.controls['assign'].setValue('');
      console.log('Usuarios asignados:', this.selectedUsers);
    } else {
      this.taskForm.controls['users'].setValue('');
      console.log('El usuario ya está asignado o no existe');
    }
  }


  removeCat(category: Category): void {
    this.selectedCategories = this.selectedCategories.filter(cat => cat.id !== category.id);
  }

  removeUsr(user: User): void {
    this.selectedUsers = this.selectedUsers.filter(usr => usr.id !== user.id);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  newTask(): void {
    console.log(this.taskForm.value, this.selectedCategories, this.selectedUsers);
    if (this.taskForm.value.epic) {
      this.selectedCategories.push({ id: '', name: 'epic' })
    }
    const task: Task = {
      name: this.taskForm.value.name,
      description: this.taskForm.value.description,
      state: this.taskForm.value.state,
      assign: this.selectedUsers.map(user => user.name),
      categories: this.selectedCategories.map(cat => cat.name),
      id: uuidv4(),
      difficulty: this.taskForm.value.difficulty,
      epicId: this.data.epicId,
      sprintId: ''
    }
    if (this.taskForm.valid) {
      this.taskService.newTask(task).subscribe(res => {
        console.log(res)
      })
    }

    console.log(task)
  }

  saveTask(){
    if (this.taskForm.value.epic) {
      this.selectedCategories.push({ id: '', name: 'epic' })
    }
    const task: Task = {
      name: this.taskForm.value.name,
      description: this.taskForm.value.description,
      state: this.taskForm.value.state,
      assign: this.selectedUsers.map(user => user.name),
      categories: this.selectedCategories.map(cat => cat.name),
      id: this.data.task.id,
      difficulty: this.taskForm.value.difficulty,
      epicId: this.data.epicId,
      sprintId: ''
    }
    if (this.taskForm.valid) {
      this.taskService.updateTasks(task).subscribe(res => {
        console.log(res)
      })
    }

    console.log(task)
  }

}
