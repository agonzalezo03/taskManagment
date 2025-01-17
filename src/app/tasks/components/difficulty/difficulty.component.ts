import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrl: './difficulty.component.css'
})
export class DifficultyComponent {
  @Input() difficulty!: number;
  fires = [0, 1, 2, 3, 4];

  getFireOpacity(index: number): string {
    if (this.difficulty > index) {
      return '1';
    } else {
      return '0.2';
    }
  }
}
