import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyethereumComponent } from './buyethereum.component';

describe('BuyethereumComponent', () => {
  let component: BuyethereumComponent;
  let fixture: ComponentFixture<BuyethereumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyethereumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyethereumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
