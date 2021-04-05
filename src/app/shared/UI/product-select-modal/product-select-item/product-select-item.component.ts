import { PosService } from './../../../../pos/pos.service';
import { ProductService } from 'src/app/product.service';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/pos/product.model';

@Component({
  selector: 'app-select-product-item',
  templateUrl: './product-select-item.component.html',
  styleUrls: ['./product-select-item.component.scss'],
})
export class ProductSelectItemComponent implements OnInit {
  @Input() product: any;

  constructor(private productService: ProductService, private posService: PosService) { }

  ngOnInit() {
    this.product = this.product.item;
  }


  onProductSelect() {
    this.productService.getProductBriefById(this.product.Id).subscribe(result => {
      const showPrice = result.Special_Price !== 0 ? result.Special_Price : result.Sale_Price;
      this.posService.addProduct(new Product(result.Id, result.Name, 1, +showPrice));
    });
    console.log(this.product);
  }
}
