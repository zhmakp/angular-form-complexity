import { PaymentMethod } from './models/payment-method.model';
import { Component } from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { defer, Observable } from "rxjs";
import { delay, map, shareReplay, tap } from "rxjs/operators";
import { OrderType } from "./models/order-type.model";
import { ResultType } from "./models/result-type.model";

const getEnumValues = (type: {}) => (Object.keys(type).map(key => type[key]))

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  readonly orderTypes: string[] = getEnumValues(OrderType);
  readonly paymentMethods: string[] = getEnumValues(PaymentMethod);
  
  result: ResultType;

  orderForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.maxLength(128),
    ]),
    type: new FormControl(null, Validators.required),
    preOrderForm: new FormGroup({
      numberOfItems: new FormControl(0, Validators.required),
      items: new FormArray([], Validators.required),
    }),
    paymentMethod: new FormControl(null, Validators.required),
    contacts: new FormGroup({
      email: new FormControl(""),
      phone: new FormControl(""),
    }),
    address: new FormControl(null),
  });

  isDelivery$ = defer(() => this.orderForm.get("type").valueChanges.pipe(
    map((type: string) => type === OrderType.Delivery),
    tap(this.updateFormControl('address', this.createAddressFormGroup())),
  ));

  createAddressFormGroup() {
    return new FormGroup({
      city: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      houseNumber: new FormControl(null, Validators.required),
    })
  }

  updateFormControl = (name: string, control: AbstractControl) => (visible: boolean)  => {
    if(visible){
      this.orderForm.setControl(name, control)
    } else {
      this.orderForm.removeControl(name);
    }
  }

  onSubmit() {
    if (this.orderForm.valid) {
      this.result = ResultType.Success;
      console.log(this.orderForm.value)
    } else {
      this.result = ResultType.FormInvalid;
    }
  }
}
