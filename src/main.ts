import 'zone.js/dist/zone';
import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1>Shopping Cart</h1>
    <select 
    [ngModel]="quantity()"
    (change)="onQuantitySelected($any($event.target).value)">
    <option disabled value="">--Select a quantity--</option>
    <option *ngFor="let q of qtyAvailable()">{{ q }}</option>
    </select>
    <div>Vehicle: {{ selectedVehicle().name }}</div>
    <div>Price: {{ selectedVehicle().price | number: '1.2-2' }}</div>
    <div style="font-weight: bold">Total: {{ exPrice() | number: '1.2-2' }}</div>
  `,
})
export class App {
  name = 'Angular';
  quantity = signal(1);
  qtyAvailable = signal([1, 2, 3, 4, 5, 6]);

  selectedVehicle = signal<Vehicle>({ id: 1, name: 'AT-AT', price: 10000 });

  vehicles = signal<Vehicle[]>([]);

  exPrice = computed(() => this.selectedVehicle().price * this.quantity());

  constructor() {
    console.log(this.quantity());

    this.quantity.update((qty) => qty * 2);
    
    this.selectedVehicle.mutate(v => v.price = v.price + (v.price * .2))
  }
  qtyEffect = effect(() => console.log('latest qty:', this.quantity()));

  onQuantitySelected(qty: number) {
    this.quantity.set(qty);
  }
}

bootstrapApplication(App);

export interface Vehicle {
  id: number;
  name: string;
  price: number;
}
