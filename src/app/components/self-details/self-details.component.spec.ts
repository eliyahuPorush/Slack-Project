import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfDetailsComponent } from './self-details.component';

describe('SelfDetailsComponent', () => {
  let component: SelfDetailsComponent;
  let fixture: ComponentFixture<SelfDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
