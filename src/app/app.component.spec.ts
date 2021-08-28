import { OrderType } from './models/order-type.model';
import { PreOrderComponent } from './components/pre-order/pre-order.component';
import { byTestId, byText, createComponentFactory, Spectator } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { AppSelectComponent } from './shared/app-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MockComponent, ngMocks } from 'ng-mocks';
import { ResultType } from './models/result-type.model';

describe('AppComponent with spectator', () => {
  let spectator: Spectator<AppComponent>;

  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [AppSelectComponent, MockComponent(PreOrderComponent)],
    imports: [ReactiveFormsModule]
  });

  beforeEach(() => spectator = createComponent());

  it('should show invalid result when submit with empty name', () => {
    spectator.click(byText('Submit'));
    
    expect(spectator.query(byTestId('result'))).toHaveText(ResultType.FormInvalid);
  })
  
  it('should show pre order form on select pre order type', () => {
    const expected = OrderType.PreOrder;

    const orderTypeSelect = spectator.query(byText('Select order type')).parentNode as HTMLSelectElement;
    spectator.selectOption(orderTypeSelect, expected);
    
    expect(spectator.component.orderForm.get('type').value).toEqual(expected)
    expect(ngMocks.find(PreOrderComponent)?.componentInstance).toBeDefined()
  })
});
