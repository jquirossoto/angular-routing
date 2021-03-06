import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ResolveData } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Product } from '../product';
import {ProductResolve} from './../product-resolve'

@Component({
  templateUrl: './product-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit {
  @ViewChild(NgForm, {static: false}) productForm: NgForm;

  errorMessage: string;
  product:Product;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data=> {
      if(this.productForm) {
        this.productForm.reset();
      }
      const resolvedData:ProductResolve = data['resolvedData'];
      this.product = resolvedData.product;
      this.errorMessage = resolvedData.error;
    });
  }
}
