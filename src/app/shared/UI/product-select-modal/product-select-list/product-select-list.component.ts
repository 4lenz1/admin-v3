import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-select-product-list',
  templateUrl: './product-select-list.component.html',
  styleUrls: ['./product-select-list.component.scss'],
})
export class ProductSelectListComponent implements OnInit {


  @Input() products;
  constructor() { }

  ngOnInit() { }

}
