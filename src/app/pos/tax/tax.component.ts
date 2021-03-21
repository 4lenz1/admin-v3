import { PosService } from './../pos.service';
import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Popover } from '../popover-list/popover-models';
import { PopoverListComponent } from '../popover-list/popover-list.component';
import { InputModalComponent } from '../UI/input-modal/input-modal.component';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss'],
})
export class TaxComponent implements OnInit {

  show = {
    showCardTitle: true,
    showCardContent: true
  };
  icon = 'help-circle';
  tax = '未確認';
  color = 'danger';
  taxIsSelected = false;
  choice = [new Popover('no', '不開'), new Popover('yes', '開立統編')];
  enteredTaxNumber: string;


  constructor(public popoverController: PopoverController
    , private posService: PosService
    , private modalController: ModalController) { }

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
          this.onTaxOptionClick();
        } else {
          this.taxIsSelected = true;
          this.color = 'primary';
          this.tax = '不開統編';
          this.icon = 'close';
          // this.showTaxNumber = false;
          this.enteredTaxNumber = '';
          this.posService.setTaxSelected(true);
        }
      });
    return await popover.present();
  }

  async onTaxOptionClick() {
    const modal = await this.modalController.create({
      component: InputModalComponent,
      componentProps: {
        placeHolder: '輸入統編',
        type: 'number',
        minLength: 8,
        maxLength: 8
      },
      backdropDismiss: false
      // cssClass: 'my-custom-class'
    });

    modal.onWillDismiss().then(result => {
      console.log(result.data);
      if (result.data) {

        this.enteredTaxNumber = result.data;
        this.taxIsSelected = true;
        this.color = 'warning';
        this.tax = this.enteredTaxNumber;
        this.icon = 'checkmark-outline';
        this.posService.setTaxSelected(true);
      }

    });
    return await modal.present();
  }
}
