import { PaymentService } from './../../payment.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { PosService } from 'src/app/pos/pos.service';
import { PaymentRemitComponent } from '../payment-remit/payment-remit.component';
import { Payment } from '../../payment.model';


@Component({
  selector: 'app-payment-item',
  templateUrl: './payment-item.component.html',
  styleUrls: ['./payment-item.component.scss'],
})
export class PaymentItemComponent implements OnInit, AfterViewInit {
  @Input() payment: Payment;
  @Input() index;
  @Output() newPayment: EventEmitter<any> = new EventEmitter();

  payMethod = 'cash';
  methodName = '現金';
  totalPrice: number;
  layaway = 1;
  layawayBank = '';
  remitInfo: { code: string, name: string, digi: string };
  cardInfo: { authCode: string, digi: string, payInfo: { times: number, bank: string } };
  isConfirmDisabled = false;
  payPrice: number;
  authCodeLength: number;
  paymentList: { name: string, payPrice: number, info: {} }[];
  btnNewPaymentDisabled = false;
  info = {};

  remit5Digi = '';
  authCode = '';
  card4Digi = '';


  constructor(private posService: PosService,
    private modalController: ModalController,
    private paymentService: PaymentService,
    private alertController: AlertController) { }

  ngOnInit() {

    console.log('init payment : ' + JSON.stringify(this.payment));
    // get total price first
    this.totalPrice = this.posService.getTotalPrice();
    // 剛開始是 cash -> true
    this.posService.setPayMethodSelected(true);

    this.posService.totalPricechanged.subscribe(result => {
      this.totalPrice = result;
    });

    this.payPrice = this.payment.payPrice;


    const info = this.payment.info;
    // handle payment select
    if (this.payment.name === 'remit') {
      console.log('is remit');
      if (info) {
        console.log('has remit info : ', info, info['code'], info['name']);
        this.remitInfo = { code: info['code'], name: info['name'], digi: info['digi'] };
        this.remit5Digi = info['digi'];

      } else {

      }
    } else if (this.payment.name === 'credit-card') {
      if (this.payment.info) {
        console.log('payment info ', this.payment.info)
        this.cardInfo = {
          authCode: info['authCode'], digi: info['digi'], payInfo: {
            times: info['payInfo']['times'],
            bank: info['payInfo']['bank']
          }
        };
        this.authCode = info['authCode'] ? info['authCode'] : '';
        this.card4Digi = info['digi'] ? info['digi'] : info['digi'];
        this.layaway = this.cardInfo.payInfo.times;
      }


      console.log('credit card info ', this.cardInfo);
    }




  }
  ngAfterViewInit() {
    this.getAuthCodeLength();
  }

  getAuthCodeLength() {
    if (this.payment.name === 'credit-card') {
      this.authCodeLength = 6;
    } else if (this.payment.name === 'line-pay') {
      this.authCodeLength = 5;
    } else {
      this.authCodeLength = 0;
    }
  }

  onPaymentSelect(value) {
    console.log('changed', value);
    this.payMethod = value;
    if (value !== 'cash') {
      this.isConfirmDisabled = true;
    }

    if (value === 'cash') {
      this.cash();
      this.payment.name = 'cash';
      this.btnNewPaymentDisabled = false;

    } else if (value === 'credit-card') {
      this.payment.name = 'credit-card';
      this.authCodeLength = 6;
      this.btnNewPaymentDisabled = false;

      // this.posService.setPayMethodSelected(false);
    } else if (value === 'line-pay') {
      this.authCodeLength = 5;
      this.btnNewPaymentDisabled = false;

      this.payment.name = 'line-pay';
    } else if (value === 'jkos') {
      this.payment.name = 'jkos';
      this.isConfirmDisabled = false;
      this.btnNewPaymentDisabled = false;

    }
    else if (value === 'remit') {
      this.onRemitSelect();
      this.payment.name = 'remit';
      this.btnNewPaymentDisabled = true;

    } else if (value === 'ruten') {
      this.payment.name = 'ruten';
      this.btnNewPaymentDisabled = true;

      this.isConfirmDisabled = false;
    } else if (value === 'shopee') {
      this.payment.name = 'shopee';
      this.isConfirmDisabled = false;
      this.btnNewPaymentDisabled = true;
    }

    this.paymentService.editPayment(this.payment);
  }

  cash() {
    this.totalPrice = this.posService.getTotalPrice();

  }

  onLayawaySelect(value) {
    this.layaway = value;

    this.cardInfo = {
      authCode: this.authCode.toString(),
      digi: this.card4Digi.toString(),
      payInfo: {
        times: this.layaway,
        bank: this.layawayBank
      }
    };
    this.updateInfo(this.cardInfo);
  }

  updateInfo(value) {
    this.info = value;
    this.payment.info = this.info;
    this.paymentService.editPayment(this.payment);
  }

  // 如果已選了匯款資訊，但要更改匯款銀行時
  onRemitItemClick() {
    console.log('renit click ! ');
    this.onRemitSelect();
  }


  // when payMeth selet
  async onRemitSelect() {
    const modal = await this.modalController.create({
      component: PaymentRemitComponent,
      backdropDismiss: false
    });


    modal.onWillDismiss().then(result => {
      const data = result.data;
      console.log('close modal , bank : ' + JSON.stringify(data));
      this.remitInfo = { code: data.code, name: data.name, digi: '' };
      // this.remitInfo.name = data.name;


      // add payment info
      this.payment.info = this.remitInfo;

      // update payment info to payment list
      this.paymentService.editPayment(this.payment);
    });

    return await modal.present();
  }

  onPayPriceChange() {
    this.payment.payPrice = this.payPrice;

    this.paymentService.updateTotalPrice(this.payment);
  }

  onRemitInfoChange() {
    const remitCode = this.remit5Digi.toString();
    if (remitCode.length === 5) {
      this.isConfirmDisabled = false;

      // assign code to remitinfo
      this.remitInfo.digi = remitCode;

      // assign to payment info
      this.payment.info = this.remitInfo;

      // update payment list
      this.paymentService.editPayment(this.payment);
    } else {
      this.isConfirmDisabled = true;
    }
  }


  onCreditCardInfoChange() {
    console.log('credit card changed ');
    // console.log(this.authCode.toString());
    // const code = this.authCode.toString();

    if (this.payMethod === 'line-pay') {
      if (this.authCode.toString().length === this.authCodeLength) {
        this.isConfirmDisabled = false;
        this.info = { authCode: this.authCode };
        this.payment.info = this.info;

        this.paymentService.editPayment(this.payment);
      } else {
        this.isConfirmDisabled = true;
      }
    } else {
      // const cardDigi = this.card4Digi.toString();

      // credit card
      console.log(this.authCode.toString().length);
      if (this.authCode.toString().length === this.authCodeLength && this.card4Digi.toString().length === 4) {
        this.isConfirmDisabled = false;


        this.cardInfo = {
          authCode: this.authCode.toString(),
          digi: this.card4Digi.toString(),
          payInfo: {
            times: this.layaway,
            bank: this.layawayBank
          }
        };

        this.info = this.cardInfo;
        this.payment.info = this.info;
        this.paymentService.editPayment(this.payment);

      } else {
        this.isConfirmDisabled = true;
      }
    }
  }

  onAddNewMethodClick() {
    console.log('button clicked');
    this.newPayment.emit(null);
  }

  async onDeleteMethodClick() {
    const alert = await this.alertController.create({
      header: 'QAQ',
      message: 'Are You **** Sure ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        }, {
          text: '刪 ! 都刪 !',
          handler: () => {
            console.log('delete method : ' + this.payment.id);
            this.paymentService.deletePayment(this.payment.id);
          }
        }
      ]
    });

    await alert.present();


  }

}


