import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellethereumComponent } from './sellethereum.component';

describe('SellethereumComponent', () => {
  let component: SellethereumComponent;
  let fixture: ComponentFixture<SellethereumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellethereumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellethereumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
