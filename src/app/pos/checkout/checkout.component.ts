import { PosService } from './../pos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {

  isDisabled = true;
  color = 'medium';
  constructor(private posService: PosService) {
    this.posService.checkoutValidateChanged.subscribe(result => {
      this.isDisabled = result;
      if (this.isDisabled) {
        this.color = 'medium';
      } else {
        this.color = 'secondary';
      }
    });
  }

  ngOnInit() { }
  onCheckout() {

  }
}
