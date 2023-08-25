import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  public toolbar = new Subject();
  public isMobile = false;

  constructor() {}

  get getToolbar() {
    return this.toolbar.asObservable();
  }

  set setToolbar(value: boolean) {
    this.toolbar.next(value);
  }

  get mobile(): boolean {
    return this.isMobile;
  }

  set mobile(value: boolean) {
    this.isMobile = value;
  }

  ocultarToolbar(): void {
    this.setToolbar = true;
  }

  mostrarToolbar(): void {
    this.setToolbar = false;
  }
}
