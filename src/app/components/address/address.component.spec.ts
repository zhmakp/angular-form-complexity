import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { address } from './address.mock';
import { AddressComponent } from './address.component';
import { byText, createComponentFactory, Spectator } from "@ngneat/spectator";
import { AppSelectComponent } from '../../shared/app-select.component';

const getSelectOptions = (select: HTMLSelectElement) => {
  const options = []
  for (let i = 1; i < select.options.length; i++) {
    options.push(select.options[i].value);
  }
  return options
}

describe('AddressComponent with spectator', () => {
  let spectator: Spectator<AddressComponent>;

  let formGroup = new FormGroup({
    city: new FormControl(null),
    street: new FormControl(null),
    houseNumber: new FormControl(null),
  });
  
  const selectByPlaceholder = (placeholder: string) => spectator.query(byText(placeholder)).parentNode as HTMLSelectElement;

  const createComponent = createComponentFactory({
    component: AddressComponent,
    declarations: [AppSelectComponent],
    imports: [ReactiveFormsModule]
  });

  beforeEach(() => spectator = createComponent({ props: { formGroup } }));

  it('should prefill streets on city select', () => {
    const city = address.cities[0];
    const expected = address.retrieveStreet(city);

    const citySelect = selectByPlaceholder('Select city');
    spectator.selectOption(citySelect, address.cities[0]);

    const streetsSelect = selectByPlaceholder('Select street');
    const actual = getSelectOptions(streetsSelect);
    expect(actual).toEqual(expected);
  })
})