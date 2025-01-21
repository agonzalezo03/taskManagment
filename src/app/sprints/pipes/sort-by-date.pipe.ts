import { Pipe, PipeTransform } from '@angular/core';
import { Sprint } from '../interfaces/sprint.interface';

@Pipe({
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {

  transform(sprints: Sprint[], order: 'asc' | 'desc' = 'asc'): Sprint[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return sprints.sort((a, b) => {
      const endDateA = this.parseDate(a.endDate);
      const endDateB = this.parseDate(b.endDate);

      const isPastA = endDateA < today;
      const isPastB = endDateB < today;

      if (isPastA !== isPastB) {
        return isPastA ? 1 : -1;
      }

      const startDateA = this.parseDate(a.startDate);
      const startDateB = this.parseDate(b.startDate);

      return order === 'asc' ? startDateA.getTime() - startDateB.getTime() : startDateB.getTime() - startDateA.getTime();
    });
  }

  private parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

}
