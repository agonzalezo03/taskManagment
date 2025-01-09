import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interfaces/categorie.interface';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrl: './categories-form.component.css'
})
export class CategoriesFormComponent implements OnInit {
 readonly dialogRef         = inject(MatDialogRef<CategoriesFormComponent>);
  private fb                = inject(FormBuilder)
  private categoriesService = inject(CategoriesService)

  public categories :Category[] = []
  public existCategory :Category[] = []

  public catForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  })


  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe( res => {
      this.categories = res
      this.existCategory = res
    })
  }

  addCategory(){
    if(this.catForm.valid){
      const catName = this.catForm.value.name
      const exists = this.categories.some(category => category.name.toLowerCase() === catName.toLowerCase());

      if(!exists){
        this.categories.push({id: uuidv4(), name: this.catForm.value.name } )

      }
      this.catForm.reset();

    }

  }

  deleteCat(category :Category){
    console.log(this.categories.filter( cat => cat.id !== category.id ))
    this.categories = this.categories.filter( cat => cat.id !== category.id )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveCategories(){


    this.existCategory.forEach( cat => {
      this.categoriesService.deleteCategory(cat).subscribe(res => {
        console.log(res)
      })
    })

    this.categories.forEach( cat => {
      this.categoriesService.saveCategory(cat).subscribe(res => {
        console.log(res)
      })
    })

  }
}
