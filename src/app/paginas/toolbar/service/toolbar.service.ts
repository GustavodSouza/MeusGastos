import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  public esconderToolbar = new Subject();
  public isMobile = false;

  constructor() { }

  get getEsconderToolbar() {
    return this.esconderToolbar.asObservable();
  }

  set setEsconderToolbar(value: boolean) {
    this.esconderToolbar.next(value);
  }

  get mobile(): boolean {
    return this.isMobile;
  }

  set mobile(value: boolean) {
    this.isMobile = value;
  }
}
