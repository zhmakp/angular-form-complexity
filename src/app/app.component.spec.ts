import { AddressComponent } from './components/address/address.component';
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
    declarations: [AppSelectComponent],
    imports: [ReactiveFormsModule]
  });

  beforeEach(() => spectator = createComponent());

  it('should show invalid result when submit with empty name', () => {
    spectator.click(byText('Submit'));
    
    expect(spectator.query(byTestId('result'))).toHaveText(ResultType.FormInvalid);
  })
  
  it('should show address form on select delivery type', () => {
    const orderTypeSelect = spectator.query(byTestId('orderTypes')).firstChild as HTMLSelectElement;
    spectator.selectOption(orderTypeSelect, OrderType.Delivery);
    
    expect(spectator.query(AddressComponent)).toBeDefined()
  })
});
