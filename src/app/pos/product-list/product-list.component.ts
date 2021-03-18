import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { PosService } from '../pos.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  constructor(private posService: PosService) { }

  ngOnInit() {
    this.products = this.posService.getProductList();
  }



}
