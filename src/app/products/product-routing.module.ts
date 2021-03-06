import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list.component';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import {ProductResolverService} from './product-resolver.service';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([{
      path: 'products',
      children:[
        {
          path: '',
          component: ProductListComponent
        },
        {
          path: ':id', component: ProductDetailComponent,
          resolve: { resolvedData: ProductResolverService }
        },
        {
          path: ':id/edit',
          component: ProductEditComponent,
          resolve: { resolvedData: ProductResolverService },
          children: [
            { path: '', redirectTo: 'info', pathMatch: 'full'},
            { path: 'info', component: ProductEditInfoComponent},
            { path: 'tags', component: ProductEditTagsComponent }
          ]
        }
      ]
      },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ProductRoutingModule { }