import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'sendRequestData')
  });

  describe('#sendRequestData', () => {
    it('should raise emit event', () => {
      const input = fixture.debugElement.query(By.css('.input'));
      input.triggerEventHandler('change');
      expect(component.sendRequestData).toHaveBeenCalled();
    });
  })
})
