import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuybitcoinComponent } from './buybitcoin.component';

describe('BuybitcoinComponent', () => {
  let component: BuybitcoinComponent;
  let fixture: ComponentFixture<BuybitcoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuybitcoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuybitcoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
