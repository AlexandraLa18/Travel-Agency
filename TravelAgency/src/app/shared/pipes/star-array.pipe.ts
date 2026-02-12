import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starArray',
  standalone: true
})
export class StarArrayPipe implements PipeTransform {
  transform(value: string): any[] {
    const num = parseInt(value, 10);
    return new Array(num);
  }
}
