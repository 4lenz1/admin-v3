import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.scss'],
})
export class InputModalComponent implements OnInit {
  @Input() placeHolder: string;
  @Input() type: string;
  @Input() minLength: number;
  @Input() maxLength: number;
  inputValue;
  isDisabled = true;
  color = 'medium';

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  onInput() {
    const length = this.inputValue.length;
    if (this.maxLength && this.minLength) {
      // console.log('in', value);
      if (length >= this.minLength && length <= this.maxLength) {
        this.isDisabled = false;
        this.color = 'success';
      }
      else if (length >= this.maxLength) {
        this.isDisabled = true;
        this.color = 'danger';
      }
      else {
        this.isDisabled = true;
        this.color = 'medium';
      }
    } else if (this.minLength) {
      if (length >= this.minLength) {
        this.isDisabled = false;
        this.color = 'success';
      } else {
        this.isDisabled = true;

      }
    }

  }

  onOkClick() {
    this.modalController.dismiss(this.inputValue);
  }

  onCancelClick() {
    this.modalController.dismiss();
  }

}
