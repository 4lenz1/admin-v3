import { Product } from './../product.model';
import { ProductService } from './../../product.service';
import { PosService } from './../pos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { IonInput, AlertController, ModalController, LoadingController } from '@ionic/angular';
import { ProductSelectModalComponent } from 'src/app/shared/UI/product-select-modal/product-select-modal.component';
import { CamScannerModalComponent } from '../UI/cam-scanner-modal/cam-scanner-modal.component';

@Component({
  selector: 'app-bar-code',
  templateUrl: './bar-code.component.html',
  styleUrls: ['./bar-code.component.scss'],
})
export class BarCodeComponent implements OnInit {
  camScanning = false;
  barCodeScanning = false;
  camIconColor = 'warning';
  barcodeIconColor = 'warning';
  scanAllowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.EAN_8];

  @ViewChild('inputBarcode') inputBarcodeEl: IonInput;

  constructor(private posService: PosService
    , private productService: ProductService
    , private alertController: AlertController
    , private modalController: ModalController
    , private loadingController: LoadingController) { }

  ngOnInit() { }
  async onCamScanning() {

    this.barcodeIconColor = 'warning';
    this.barCodeScanning = false;
    this.camIconColor = (this.camIconColor === 'warning') ? 'success' : 'warning';

    this.camScanning = !this.camScanning;

    const modal = await this.modalController.create({
      component: CamScannerModalComponent,
      backdropDismiss: false,
      componentProps: {
        format: this.scanAllowedFormats
      }
      // cssClass: 'my-custom-class'
    });

    const loading = await this.loadingController.create({
      message: '等等ㄛ'
    });



    modal.onWillDismiss().then(result => {
      const data = result.data;
      console.log(result.data);
      if (data) {

        // show loading popup
        loading.present();
        console.log('scan data :' + data);

        // call api

        this.productService.getProductByCode(data)
          .subscribe((resultData) => {
            const product = resultData[0];

            if (product) {
              this.posService.addProduct(
                new Product(product.Id,
                  product.Name,
                  1,
                  product.SalePrice));
            } else {
              // product not found
              this.showNotFoundAlert();
            }

            loading.dismiss();
          });


        this.camIconColor = (this.camIconColor === 'warning') ? 'success' : 'warning';

        // this.posService.setTaxSelected(true);
      }
    });

    return await modal.present();





  }

  onBarcodeScanning() {
    this.barCodeScanning = !this.barCodeScanning;
    this.camScanning = false;
    this.barcodeIconColor = (this.barcodeIconColor === 'warning') ? 'success' : 'warning';
    this.camIconColor = 'warning';
    console.log(this.inputBarcodeEl);
    this.inputBarcodeEl.setFocus();
  }


  presentModal() {
  }


  async onSearch(value: string) {
    const modal = await this.modalController.create({
      component: ProductSelectModalComponent,
      // cssClass: 'my-custom-class'
    });
    return await modal.present();

    // this.posService.getProductByBarCode('1000');

  }

  async scanByCode(value: string) {
    // 4548736089655
    console.log(value);
    if (value.length === 0) {
      return 0;
    }
    // show loading popup
    const loading = await this.loadingController.create({
      message: '等等ㄛ'
    });
    await loading.present();

    // call api
    this.productService.getProductByCode(value)
      .subscribe(result => {
        const product = result[0];
        console.log(product);

        if (product) {
          this.posService.addProduct(
            new Product(product.Id,
              product.Name,
              1,
              product.SalePrice));
        } else {
          // product not found
          this.showNotFoundAlert();
        }

        loading.dismiss();
        this.inputBarcodeEl.value = '';
      });
  }


  async showNotFoundAlert() {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Q_Q',
      // subHeader: 'Subtitle',
      message: '找不到該品項 QQ',
      buttons: ['OK']
    });

    await alert.present();
  }

}
