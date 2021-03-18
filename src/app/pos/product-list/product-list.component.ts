import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products = [
    new Product(
      '1000xm4',
      2,
      2000
    ),
    new Product(
      '1000xm4',
      2,
      2000
    ), new Product(
      '1000xm4',
      2,
      2000
    ),
  ];
  constructor() { }

  ngOnInit() { }



}
