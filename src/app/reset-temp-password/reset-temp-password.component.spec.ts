import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetTempPasswordComponent } from './reset-temp-password.component';

describe('ResetTempPasswordComponent', () => {
  let component: ResetTempPasswordComponent;
  let fixture: ComponentFixture<ResetTempPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetTempPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetTempPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
