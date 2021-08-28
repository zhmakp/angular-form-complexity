import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { address, City } from './address.mock';

@Component({
  selector: 'address',
  template: `
  <form [formGroup]="formGroup">
    <app-select control="city" placeholder="Select city" [collection]="cities">
    </app-select>
    <app-select control="street" placeholder="Select street" [collection]="streets$ | async">
    </app-select>
    <input formControlName="houseNumber" placeholder="Enter house number">
  </form>
  `
})
export class AddressComponent {
  @Input() formGroup: FormGroup;

  cities = address.cities;

  streets$: Observable<string[]> = defer(() => this.formGroup
    .get('city')
    .valueChanges.pipe(map((city: City) => address.retrieveStreet(city)))
  ) 
}
