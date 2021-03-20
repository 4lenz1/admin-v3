import { PopoverListComponent } from './../popover-list/popover-list.component';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
// import { PopinfoComponent } from '../popinfo/popinfo.component';
import { Popover } from '../popover-list/popover-models';
@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  styleUrls: ['./carrier.component.scss'],
})
export class CarrierComponent implements OnInit {

  icon = 'help-circle';
  color = 'warning';
  type = '紙本發票';
  carrierIsSelected = false;
  carrierItems = [new Popover('recipe', '紙本發票'), new Popover('carrier', '手機載具')];
  constructor(public actionSheetController: ActionSheetController, public popoverController: PopoverController) { }


  ngOnInit() { }
  async onCarrierSelect(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverListComponent,
      componentProps: { items: this.carrierItems , title: '發票形式' },
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
        else if (result.data.id === 'recipe') {
          this.color = 'success';
          this.type = '紙本發票';
          this.icon = 'document-outline';
        } else {
          this.color = 'primary';
          this.type = '手機載具';
          this.icon = 'phone-portrait-outline';
        }
      });
    return await popover.present();
  }
}
