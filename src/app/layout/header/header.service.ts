import { EventEmitter, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  headerTitle = new EventEmitter<string>();



  setHeaderTitle(title: string) {
    console.log('emit ' + title);
    this.headerTitle.emit(title);
  }
}
