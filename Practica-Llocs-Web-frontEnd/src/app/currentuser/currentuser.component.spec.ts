import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentuserComponent } from './currentuser.component';

describe('CurrentuserComponent', () => {
  let component: CurrentuserComponent;
  let fixture: ComponentFixture<CurrentuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
