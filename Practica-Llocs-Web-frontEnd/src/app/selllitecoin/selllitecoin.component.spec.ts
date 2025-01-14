import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelllitecoinComponent } from './selllitecoin.component';

describe('SelllitecoinComponent', () => {
  let component: SelllitecoinComponent;
  let fixture: ComponentFixture<SelllitecoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelllitecoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelllitecoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
