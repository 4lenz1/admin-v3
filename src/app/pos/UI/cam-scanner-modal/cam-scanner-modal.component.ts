import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-cam-scanner-modal',
  templateUrl: './cam-scanner-modal.component.html',
  styleUrls: ['./cam-scanner-modal.component.scss'],
})
export class CamScannerModalComponent implements OnInit {


  @Input() format: [];
  constructor(private modalController: ModalController) { }



  ngOnInit() { }

  onCodeResult(result) {
    this.modalController.dismiss(result);
  }

  closeModal(){
    this.modalController.dismiss();
  }

}
