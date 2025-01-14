import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellbitcoinComponent } from './sellbitcoin.component';

describe('SellbitcoinComponent', () => {
  let component: SellbitcoinComponent;
  let fixture: ComponentFixture<SellbitcoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellbitcoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellbitcoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
