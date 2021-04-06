import { ModalController } from '@ionic/angular';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import bankCode from '../../../../../../data/bank-code.json';
import Fuse from 'fuse.js';
@Component({
  selector: 'app-payment-remit',
  templateUrl: './payment-remit.component.html',
  styleUrls: ['./payment-remit.component.scss'],
})
export class PaymentRemitComponent implements OnInit, AfterViewInit {

  bankList = bankCode;

  constructor(private modalController: ModalController) { }


  options;
  fuse;
  matchedBank: { code: string, name: string }[];

  ngAfterViewInit() {
    console.log('init');
    this.matchedBank = bankCode;

    this.options = {
      includeScore: true,
      minMatchCharLength: 2,
      threshold: 0.3,
      keys: [
        {
          name: 'name',
          weight: 0.5
        },
        {
          name: 'code',
          weight: 0.5
        }
      ]
    };
    this.fuse = new Fuse(this.bankList, this.options);
  }
  ngOnInit() {

  }

  onSearch(value) {
    // console.log('input value',value);
    if (!value) {
      this.matchedBank = this.bankList;
    } else {
      const result = this.fuse.search(value);
      const searchedBank = [];
      result.forEach(x => {
        searchedBank.push(x.item);
      });

      this.matchedBank = searchedBank;
    }

  }

  onBankSelected(bank) {
    this.modalController.dismiss(bank);
  }

}
