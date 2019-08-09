import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanVoucherPage } from './scan-voucher.page';

describe('ScanVoucherPage', () => {
  let component: ScanVoucherPage;
  let fixture: ComponentFixture<ScanVoucherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanVoucherPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanVoucherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
