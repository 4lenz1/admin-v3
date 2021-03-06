import { PosService } from './../pos.service';
import { PopoverListComponent } from './../popover-list/popover-list.component';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { BarcodeFormat } from '@zxing/library';

// import { PopinfoComponent } from '../popinfo/popinfo.component';
import { Popover } from '../popover-list/popover-models';
import { CamScannerModalComponent } from '../UI/cam-scanner-modal/cam-scanner-modal.component';
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
  scanAllowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.EAN_8];
  carrierItems = [new Popover('recipe', '紙本發票'), new Popover('carrier', '手機載具')];
  show = {
    showCardTitle: true,
    showCardContent: true
  };

  enteredCarrierNumber: string;

  constructor(private popoverController: PopoverController
    , private modalController: ModalController,
    private posService: PosService) { }


  ngOnInit() { }
  async onCarrierSelect(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverListComponent,
      componentProps: { items: this.carrierItems, title: '發票形式' },
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
          this.color = 'primary';
          this.type = '紙本發票';
          this.icon = 'document-outline';
        } else {
          this.onCarrierOptionClick();
        }
      });
    return await popover.present();
  }



  // async onCarrierOptionClick() {
  //   const modal = await this.modalController.create({
  //     component: InputModalComponent,
  //     componentProps: {
  //       placeHolder: '載具號碼 /123-ABC',
  //       type: 'string',
  //       minLength: 8,
  //       maxLength: 8
  //     },
  //     backdropDismiss: false
  //     // cssClass: 'my-custom-class'
  //   });

  //   modal.onWillDismiss().then(result => {
  //     console.log(result.data);
  //     if (result.data) {

  //       this.enteredCarrierNumber = result.data;
  //       this.carrierIsSelected = true;
  //       this.color = 'warning';
  //       this.type = this.enteredCarrierNumber;
  //       this.icon = 'phone-portrait-outline';
  //       // this.posService.setTaxSelected(true);
  //     }

  //   });
  //   return await modal.present();
  // }


  async onCarrierOptionClick() {
    const modal = await this.modalController.create({
      component: CamScannerModalComponent,
      backdropDismiss: false,
      componentProps: {
        format: this.scanAllowedFormats
      }
      // cssClass: 'my-custom-class'
    });

    modal.onWillDismiss().then(result => {
      const data = result.data;
      console.log(result.data);
      if (data) {
        this.enteredCarrierNumber = result.data;
        this.carrierIsSelected = true;
        this.color = 'warning';
        this.type = this.enteredCarrierNumber;
        this.icon = 'phone-portrait-outline';
        // this.posService.setTaxSelected(true);
      }
    });

    return await modal.present();
  }
}
