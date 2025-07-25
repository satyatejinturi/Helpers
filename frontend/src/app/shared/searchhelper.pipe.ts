import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchhelper',
  standalone: true
})
export class SearchhelperPipe implements PipeTransform {

  transform(helpers: any[], searchTerm: string,feildnames: string[]=[]): any[] {
    if (!helpers || !searchTerm) {
      return helpers;
    }
    searchTerm = searchTerm.toLowerCase();
    
    return helpers.filter(helper =>
      feildnames.some(feildname =>
        helper[feildname].toString()?.toLowerCase().includes(searchTerm)
      )  
    );
  }
}
