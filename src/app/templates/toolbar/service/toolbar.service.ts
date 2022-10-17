import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  public hidden = false;
  public isMobile = false;

  constructor() { }

  get class(): boolean {
    return this.hidden;
  }

  set class(value: boolean) {
    this.hidden = value;
  }

  get mobile(): boolean {
    return this.isMobile;
  }

  set mobile(value: boolean) {
    this.isMobile = value;
  }
}
