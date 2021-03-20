import { PopoverController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Popover } from '../popover-models';

@Component({
  selector: 'app-popover-item',
  templateUrl: './popover-item.component.html',
  styleUrls: ['./popover-item.component.scss'],
})
export class PopoverItemComponent implements OnInit {

  @Input() item: Popover;
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }

  onItemClick() {
    this.popoverController.dismiss(
      { id: this.item.id, name: this.item.name });
  }
}
