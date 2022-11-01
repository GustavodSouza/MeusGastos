import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements AfterViewInit {
  @ViewChild('menu') menu: ElementRef;

  constructor(
    private menuService: MenuService,
  ) { }

  ngAfterViewInit(): void {
    this.menuService.referencia = this.menu;
  }

  mudarEstadoMenu(): void {
    this.menuService.isAtivo = !this.menuService.isAtivo;
    this.menu.nativeElement.classList.value = this.menuService.isAtivo ? 'active' : '';
  }
}
