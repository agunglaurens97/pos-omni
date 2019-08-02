import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {

  transform(array: any[], string?: String): any[] {
    if(string == "-1"){
      return array;
    }else if(string != null){
      return array.filter(item =>{
        return item.id_product_category.
        includes( string );
      });
    }

    return array;

    
  }

}
