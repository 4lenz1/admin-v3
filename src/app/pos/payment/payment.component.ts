import { PosService } from './../pos.service';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { InputModalComponent } from '../UI/input-modal/input-modal.component';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  methodIsSelected = false;
  methodName = '選擇付款方式';
  payMethod: string;
  methodColor = 'danger';
  methodIocn = 'apps';
  showCalculator = false;
  paidMoney: number;
  totalPrice: number;
  constructor(private posService: PosService
    , private modalController: ModalController) { }

  ngOnInit() {
    this.totalPrice = this.posService.getOriginalTotalPrice();
    this.posService.totalPricechanged.subscribe(result => {
      this.totalPrice = result;
      console.log(this.totalPrice);
    });
  }

  // async onMethodSelect() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: '請選擇付款方式',
  //     cssClass: 'primary',
  //     buttons: [{
  //       text: '現金',
  //       icon: 'cash',
  //       handler: () => {
  //         this.methodName = '現金';
  //         this.methodIsSelected = true;
  //         this.methodColor = 'tertiary';
  //         this.methodIocn = 'cash';
  //         this.posService.setPayMethodSelected(true);
  //         this.onCashOptionClick();
  //       }
  //     }, {
  //       text: '刷卡',
  //       icon: 'card',
  //       handler: () => {
  //         console.log('Favorite clicked');
  //         this.methodIsSelected = true;
  //         this.methodName = '刷卡';
  //         this.methodColor = 'tertiary';
  //         this.methodIocn = 'card';
  //         this.posService.setPaidMoney(this.totalPrice);
  //         this.posService.setPayMethodSelected(true);

  //         this.showCalculator = false;
  //       }
  //     }

  //       , {
  //       text: 'LINE PAY',
  //       icon: 'qr-code',
  //       handler: () => {
  //         console.log('Favorite clicked');
  //         this.methodIsSelected = true;
  //         this.methodName = 'LINE PAY';
  //         this.methodColor = 'tertiary';
  //         this.methodIocn = 'qr-code';
  //         this.posService.setPaidMoney(this.totalPrice);
  //         this.posService.setPayMethodSelected(true);

  //         this.showCalculator = false;

  //       }
  //     }, {
  //       text: '街口',
  //       icon: 'qr-code',
  //       handler: () => {
  //         console.log('Favorite clicked');
  //         this.methodIsSelected = true;
  //         this.methodName = '街口';
  //         this.methodColor = 'tertiary';
  //         this.methodIocn = 'qr-code';
  //         this.posService.setPaidMoney(this.totalPrice);
  //         this.posService.setPayMethodSelected(true);

  //         this.showCalculator = false;

  //       }
  //     }, {
  //       text: '匯款',
  //       icon: 'calculator',
  //       handler: () => {
  //         console.log('Favorite clicked');
  //         this.methodIsSelected = true;
  //         this.methodName = '匯款';
  //         this.methodColor = 'tertiary';
  //         this.methodIocn = 'card';
  //         this.posService.setPaidMoney(this.totalPrice);
  //         this.posService.setPayMethodSelected(true);

  //         this.showCalculator = false;

  //       }
  //     }
  //       , {
  //       text: '蝦皮',
  //       icon: 'storefront',
  //       handler: () => {
  //         console.log('Favorite clicked');
  //         this.methodIsSelected = true;
  //         this.methodName = '蝦皮';
  //         this.methodColor = 'tertiary';
  //         this.methodIocn = 'storefront';

  //         this.posService.setPaidMoney(this.totalPrice);
  //         this.posService.setPayMethodSelected(true);

  //         this.showCalculator = false;

  //       }
  //     }
  //       , {
  //       text: '露天',
  //       icon: 'storefront',
  //       handler: () => {
  //         console.log('Favorite clicked');
  //         this.methodIsSelected = true;
  //         this.methodName = '露天';
  //         this.methodColor = 'tertiary';
  //         this.methodIocn = 'storefront';
  //         console.log(this.totalPrice);
  //         this.posService.setPaidMoney(this.totalPrice);
  //         this.posService.setPayMethodSelected(true);
  //         this.showCalculator = false;

  //       }
  //     }
  //       , {
  //       text: '取消',
  //       icon: 'close',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log('Cancel clicked');
  //         this.optionCancel();
  //       }
  //     }]
  //   });
  //   await actionSheet.present();
  // }



  async onMethodSelect() {
    const modal = await this.modalController.create({
      component: PaymentModalComponent,
      backdropDismiss: false
    });

    modal.onDidDismiss().then(result => {
      if (result.data) {
        const paidPrice = result.data.paidPrice;
        this.posService.setPaidMoney(paidPrice);
        this.payMethod = result.data.payMethod;
        this.methodName = result.data.methodName;
        this.methodColor = 'primary';
      } else {
        this.methodColor = 'warning';
        this.methodName = '請選擇付款方式';
        this.payMethod = '';
        this.posService.setPaidMoney(0);
      }
    });

    return await modal.present();
  }



  async onCashOptionClick() {
    const modal = await this.modalController.create({
      component: InputModalComponent,
      componentProps: {
        placeHolder: '金額',
        type: 'number',
        minLength: 1,
        // maxLength: 8
      },
      backdropDismiss: false
      // cssClass: 'my-custom-class'
    });

    modal.onWillDismiss().then(result => {
      console.log(result.data);
      if (result.data) {
        this.showCalculator = true;
        this.paidMoney = result.data;
        this.posService.setPaidMoney(this.paidMoney);
        this.posService.setPayMethodSelected(true);
      } else {
        this.optionCancel();

      }
    });
    return await modal.present();
  }

  optionCancel() {
    this.methodIsSelected = false;
    this.methodName = '選擇付款方式';
    this.methodColor = 'danger';
    this.methodIocn = 'apps';
    this.posService.setPaidMoney(0);

    this.posService.setPayMethodSelected(false);
    this.showCalculator = false;
  }

 
}
