import { Component, Input, OnInit } from '@angular/core';
import { Popover } from './popover-models';

@Component({
  selector: 'app-popover-list',
  templateUrl: './popover-list.component.html',
  styleUrls: ['./popover-list.component.scss'],
})
export class PopoverListComponent implements OnInit {

  @Input() items: Popover[];
  @Input() title: string;
  constructor() { }

  ngOnInit() {
   }

}
