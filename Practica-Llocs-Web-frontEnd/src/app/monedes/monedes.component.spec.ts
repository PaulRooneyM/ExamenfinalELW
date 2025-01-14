import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonedesComponent } from './monedes.component';

describe('MonedesComponent', () => {
  let component: MonedesComponent;
  let fixture: ComponentFixture<MonedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonedesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
