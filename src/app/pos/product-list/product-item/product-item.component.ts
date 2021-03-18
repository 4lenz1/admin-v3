import { PosService } from './../../pos.service';
import { Product } from './../../product.model';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  constructor(private alertController: AlertController, private posService: PosService) { }




  async onDelete() {
    const alert = await this.alertController.create({
      cssClass: 'primary',
      header: '警告',
      // subHeader: '?',
      message: '確定要刪除嗎',
      buttons: [
        {
          text: '鼻要啦',
          role: 'cancel',
          handler: (result) => {
            console.log('cancel', result);
          }
        }, {
          text: '刪除',
          role: 'ok',
          handler: (result) => {
            console.log('ok ', result);
            this.posService.deleteProduct(this.product.id);
          }
        }]
    });
    return await alert.present();
  }



  ngOnInit() { }

  addAmount() {
    this.product.amount++;
    this.posService.setProduct(this.product);
  }
  minusAmount() {
    if (this.product.amount > 1) {
      this.product.amount--;
      this.posService.setProduct(this.product);
    }
  }
  // onDelete() {
  //   const result = this.presentAlert();

  //   console.log('result', result);
  // }
}
