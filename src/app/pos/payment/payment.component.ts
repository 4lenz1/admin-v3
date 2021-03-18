import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  methodIsSelected = false;
  methodName = '選擇付款方式';
  methodColor = '';
  methodIocn = 'apps';
  constructor(public actionSheetController: ActionSheetController) { }

  ngOnInit() { }

  async onMethodSelect() {
    const actionSheet = await this.actionSheetController.create({
      header: '請選擇付款方式',
      cssClass: 'primary',
      buttons: [ {
        text: '現金',
        icon: 'cash',
        handler: () => {
          this.methodName = '現金';
          this.methodIsSelected = true;
          this.methodColor = 'tertiary';
          this.methodIocn = 'cash';

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

        }
      }, {
        text: '取消',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
          this.methodIsSelected = false;
          this.methodName = '選擇付款方式';
          this.methodColor = 'primary';
          this.methodIocn = 'apps';

        }
      }]
    });
    await actionSheet.present();
  }

}
