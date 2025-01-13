import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rol-option',
  templateUrl: './rol-option.component.html',
  styleUrl: './rol-option.component.css'
})
export class RolOptionComponent {

  @Input() name !: string
  @Input() rol : any

}
