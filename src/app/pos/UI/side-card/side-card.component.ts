import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-card',
  templateUrl: './side-card.component.html',
  styleUrls: ['./side-card.component.scss'],
})
export class SideCardComponent implements OnInit {
  @Input() show;
  constructor() { }

  ngOnInit() {
  
  }

}
