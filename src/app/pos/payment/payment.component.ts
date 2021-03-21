import { PosService } from './../pos.service';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { InputModalComponent } from '../UI/input-modal/input-modal.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  methodIsSelected = false;
  methodName = '選擇付款方式';
  methodColor = 'danger';
  methodIocn = 'apps';
  constructor(public actionSheetController: ActionSheetController
    , private posService: PosService
    , private modalController: ModalController) { }

  ngOnInit() { }

  async onMethodSelect() {
    const actionSheet = await this.actionSheetController.create({
      header: '請選擇付款方式',
      cssClass: 'primary',
      buttons: [{
        text: '現金',
        icon: 'cash',
        handler: () => {
          this.methodName = '現金';
          this.methodIsSelected = true;
          this.methodColor = 'tertiary';
          this.methodIocn = 'cash';
          this.posService.setPayMethodSelected(true);
          this.onCashOptionClick();
        }
      }, {
        text: '刷卡',
        icon: 'card',
        handler: () => {
          console.log('Favorite clicked');
          this.methodIsSelected = true;
          this.methodName = '刷卡';
          this.methodColor = 'tertiary';
          this.methodIocn = 'card';
          this.posService.setPayMethodSelected(true);

        }
      }

        , {
        text: 'LINE PAY',
        icon: 'qr-code',
        handler: () => {
          console.log('Favorite clicked');
          this.methodIsSelected = true;
          this.methodName = 'LINE PAY';
          this.methodColor = 'tertiary';
          this.methodIocn = 'qr-code';
          this.posService.setPayMethodSelected(true);

        }
      }, {
        text: '街口',
        icon: 'qr-code',
        handler: () => {
          console.log('Favorite clicked');
          this.methodIsSelected = true;
          this.methodName = '街口';
          this.methodColor = 'tertiary';
          this.methodIocn = 'qr-code';
          this.posService.setPayMethodSelected(true);

        }
      }, {
        text: '匯款',
        icon: 'calculator',
        handler: () => {
          console.log('Favorite clicked');
          this.methodIsSelected = true;
          this.methodName = '匯款';
          this.methodColor = 'tertiary';
          this.methodIocn = 'card';
          this.posService.setPayMethodSelected(true);

        }
      }
        , {
        text: '蝦皮',
        icon: 'storefront',
        handler: () => {
          console.log('Favorite clicked');
          this.methodIsSelected = true;
          this.methodName = '蝦皮';
          this.methodColor = 'tertiary';
          this.methodIocn = 'storefront';
          this.posService.setPayMethodSelected(true);

        }
      }
        , {
        text: '露天',
        icon: 'storefront',
        handler: () => {
          console.log('Favorite clicked');
          this.methodIsSelected = true;
          this.methodName = '露天';
          this.methodColor = 'tertiary';
          this.methodIocn = 'storefront';
          this.posService.setPayMethodSelected(true);

        }
      }
        , {
        text: '取消',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
          this.methodIsSelected = false;
          this.methodName = '選擇付款方式';
          this.methodColor = 'danger';
          this.methodIocn = 'apps';
          this.posService.setPayMethodSelected(false);
        }
      }]
    });
    await actionSheet.present();
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

        // this. = result.data;
        // this.carrierIsSelected = true;
        // this.color = 'warning';
        // this.type = this.enteredCarrierNumber;
        // this.icon = 'phone-portrait-outline';
        // this.posService.setTaxSelected(true);
      }

    });
    return await modal.present();
  }
}
