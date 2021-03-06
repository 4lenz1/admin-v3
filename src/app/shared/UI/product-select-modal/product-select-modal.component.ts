import { Component, OnInit } from '@angular/core';
import Fuse from 'fuse.js';

import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-select-modal',
  templateUrl: './product-select-modal.component.html',
  styleUrls: ['./product-select-modal.component.scss'],
})
export class ProductSelectModalComponent implements OnInit {
  products: any;
  matchedProducts = [];
  showResult = false;


  // fuse;
  constructor(private productService: ProductService) { }


  ngOnInit() {
    this.productService.getProductIndexList().subscribe(result => {
      this.products = result;
    });
    // this.fuse = new Fuse(this.products, this.options);

  }


  onSearch(value: any) {


    const options = {
      includeScore: true,
      minMatchCharLength: 2,
      threshold: 0.3,
      keys: [
        {
          name: 'Name',
          weight: 0.4
        },
        {
          name: 'PartNo',
          weight: 0.4
        },
        ,
        {
          name: 'Brand',
          weight: 0.2
        }
      ]
    };
    const fuse = new Fuse(this.products, options);

    // console.log('value', value)
    this.matchedProducts = fuse.search(value);

    this.showResult = this.matchedProducts.length > 0 ? true : false;
  }

}
