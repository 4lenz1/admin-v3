import { PosService } from './../pos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { IonInput } from '@ionic/angular';

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

  constructor(private posService: PosService) { }

  ngOnInit() { }
  onCamScanning() {
    this.camScanning = !this.camScanning;
    this.barCodeScanning = false;

    this.barcodeIconColor = 'warning';
    this.camIconColor = (this.camIconColor === 'warning') ? 'success' : 'warning';
  }

  onBarcodeScanning() {
    this.barCodeScanning = !this.barCodeScanning;
    this.camScanning = false;
    this.barcodeIconColor = (this.barcodeIconColor === 'warning') ? 'success' : 'warning';
    this.camIconColor = 'warning';
    console.log(this.inputBarcodeEl);
    this.inputBarcodeEl.setFocus();
  }
  onCodeResult(result: any) {
    // this.scanResult = result;
    this.posService.getProductByBarCode('1000');
  }

  onSearch(value: string) {
    this.posService.getProductByBarCode('1000');

  }
}
