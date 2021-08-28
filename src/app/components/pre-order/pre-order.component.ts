import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { dishes } from "./pre-order.mock";

@Component({
  selector: "pre-order",
  templateUrl: "./pre-order.component.html",
})
export class PreOrderComponent implements OnInit {
  @Input() formGroup: FormGroup;

  get itemsFormArray() {
    return this.formGroup.get("items") as FormArray;
  }

  items: string[] = dishes;

  ngOnInit(): void {
    this.formGroup
      .get("numberOfItems")
      .valueChanges.subscribe((numberOfItemsr) => {
        this.itemsFormArray.clear();
        for (const _ of Array(numberOfItemsr).keys()) {
          this.itemsFormArray.push(new FormControl(null));
        }
      });
  }
}
