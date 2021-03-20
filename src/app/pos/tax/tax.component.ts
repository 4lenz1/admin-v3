import { Component, OnInit } from '@angular/core';
import { ActionSheetController, PopoverController } from '@ionic/angular';
import { Popover } from '../popover-list/popover-models';
import { PopoverListComponent } from '../popover-list/popover-list.component';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss'],
})
export class TaxComponent implements OnInit {


  icon = 'help-circle';
  tax = '未確認';
  color = 'danger';
  taxIsSelected = false;
  choice = [new Popover('no', '不開'), new Popover('yes', '開立統編')];

  constructor(public popoverController: PopoverController) { }

  ngOnInit() { }


  async onTaxSelect(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverListComponent,
      componentProps: { items: this.choice, title: '是否開統編' },
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    popover.onWillDismiss()
      .then((result) => {
        if (!result.data) {
          // do nothing 
          return;
        }
        else if (result.data.id === 'yes') {
          this.taxIsSelected = true;
          this.color = 'warning';
          this.tax = '開立統編';
          this.icon = 'checkmark-outline';
        } else {
          this.taxIsSelected = true;
          this.color = 'primary';
          this.tax = '不開統編';
          this.icon = 'close';
        }
      });
    return await popover.present();
  }


  // async aonTaxSelect() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: '要開統編嗎ㄇㄇㄇ?',
  //     cssClass: 'primary',
  //     buttons: [{
  //       text: '好哇',
  //       icon: 'checkmark-outline',
  //       handler: () => {
  //         this.taxIsSelected = true;
  //         this.color = 'warning';
  //         this.tax = '開立統編';
  //         this.icon = 'checkmark-outline';
  //       }
  //     }, {
  //       text: '鼻要',
  //       icon: 'close',
  //       handler: () => {
  //         this.taxIsSelected = true;
  //         this.color = 'primary';
  //         this.tax = '不開統編';
  //         this.icon = 'close';
  //       }
  //     }, {
  //       text: '取消',
  //       role: 'cancel',
  //       handler: () => {
  //         this.taxIsSelected = false;
  //         this.color = 'danger';
  //         this.icon = 'help-circle';

  //       }
  //     }]
  //   });
  //   await actionSheet.present();
  // }
}
