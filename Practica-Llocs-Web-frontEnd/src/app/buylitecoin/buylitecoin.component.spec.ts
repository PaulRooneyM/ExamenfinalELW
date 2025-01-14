import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuylitecoinComponent } from './buylitecoin.component';

describe('BuylitecoinComponent', () => {
  let component: BuylitecoinComponent;
  let fixture: ComponentFixture<BuylitecoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuylitecoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuylitecoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
