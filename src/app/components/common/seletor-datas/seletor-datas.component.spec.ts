import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeletorDatasComponent } from './seletor-datas.component';

describe('SeletorDatasComponent', () => {
  let component: SeletorDatasComponent;
  let fixture: ComponentFixture<SeletorDatasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeletorDatasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeletorDatasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
