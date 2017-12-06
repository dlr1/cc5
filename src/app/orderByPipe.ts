import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'orderBy'})
export class OrderByPipe implements PipeTransform {  
    transform(values: Array<any>, by: string): Array<any> {
        if (!values)
            return;
        return values.sort((a,b) => {
            let comparison = 0;
            
              if (a[by] > b[by]) {
                comparison = 1;
              } else if (b[by] > a[by]) {
                comparison = -1;
              }
            
              return comparison;
        } );
      }
}