import { PosService } from './../pos.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {

  isDisabled = true;
  color = 'medium';
  show = {
    showCardTitle: false,
    showCardContent: true
  };

  constructor(private posService: PosService , public loadingController: LoadingController) {
    this.posService.checkoutValidateChanged.subscribe(result => {
      this.isDisabled = !result;
      if (this.isDisabled) {
        this.color = 'medium';
      } else {
        this.color = 'secondary';
      }
    });
  }

  ngOnInit() { }
  onCheckout() {
this.presentLoading();
  }



  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: '處理中.....',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
