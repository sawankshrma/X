import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPopupModal } from './main-popup-modal';

describe('MainPopupModal', () => {
  let component: MainPopupModal;
  let fixture: ComponentFixture<MainPopupModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPopupModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPopupModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
