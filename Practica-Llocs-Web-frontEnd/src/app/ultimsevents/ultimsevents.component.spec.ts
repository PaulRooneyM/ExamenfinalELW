import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimseventsComponent } from './ultimsevents.component';

describe('UltimseventsComponent', () => {
  let component: UltimseventsComponent;
  let fixture: ComponentFixture<UltimseventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UltimseventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UltimseventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
