import { Component, Input, OnInit } from '@angular/core';

enum typesSize {
  normal = 'title-normal',
  toolbar = 'title-toolbar',
}

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input() public type: string;

  public typeClassSize = '';

  constructor() { }

  ngOnInit(): void {

    if (this.type === 'toolbar') {
      this.typeClassSize = 'title-toolbar';
    }

    if (this.type === 'normal') {
      this.typeClassSize = 'title-normal';
    }

    if (this.type === 'small') {
      this.typeClassSize = 'title-small';
    }
  }
}
