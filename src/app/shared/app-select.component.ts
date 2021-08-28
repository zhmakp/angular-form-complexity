import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-select',
  // Angular 8 and 9: You can use viewProvider in you custom component
  // when you assign formControlName, your component will attach itself to the parent form.
  viewProviders: [
    {
        provide: ControlContainer,
        useExisting: FormGroupDirective
    }
  ],
  template: `
    <select [formControlName]="control">
      <option [ngValue]="null" disabled>{{ placeholder }}</option>
      <option *ngFor="let item of collection" [value]="item">{{item}}</option>
    </select>`
})
export class AppSelectComponent {
  @Input() control: string;
  @Input() collection: string[];
  @Input() placeholder: string;
}
