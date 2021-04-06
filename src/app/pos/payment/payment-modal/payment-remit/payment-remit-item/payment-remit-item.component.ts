
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-payment-remit-item',
  templateUrl: './payment-remit-item.component.html',
  styleUrls: ['./payment-remit-item.component.scss'],
})
export class PaymentRemitItemComponent implements OnInit {

  @Input() bank;
  @Output() selectedBank: EventEmitter<any> = new EventEmitter();
constructor() { }

ngOnInit() { }


onBankClick(){
  console.log('bank clicekd :', this.bank);
  this.selectedBank.emit(this.bank);
}
}
