import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ProductResolve } from './product-resolve';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<ProductResolve>{

  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolve > {
    const id = +route.paramMap.get('id');
    if(isNaN(id)) {
      const errorMessage = `Product id is not a number: ${id}`;
      return of({product: null, error: errorMessage});
    }
    return this.productService.getProduct(+id)
      .pipe(map(product => ({product: product})),
      catchError(error => {
        const errorMessage = `Retrieval error: ${error}`;
        return of({product: null, error: errorMessage});
      })
    );
  }
}
