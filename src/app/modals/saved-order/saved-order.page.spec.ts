import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedOrderPage } from './saved-order.page';

describe('SavedOrderPage', () => {
  let component: SavedOrderPage;
  let fixture: ComponentFixture<SavedOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
