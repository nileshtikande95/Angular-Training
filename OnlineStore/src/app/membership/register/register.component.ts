import { Component } from '@angular/core';
import { Customer } from '../models/customer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CRMService } from '../crm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']  // ✅ note: should be styleUrls (plural)
})
export class RegisterComponent {
  [x: string]: any;

  submitted = false;
  message = '';

  locations = ['Pune', 'Mumbai', 'Delhi', 'Bangalore', 'Nashik', 'Chennai'];
  memberShips = [
    { value: 'G', display: 'Gold' },
    { value: 'S', display: 'Silver' },
    { value: 'P', display: 'Platinum' }
  ];

  social = [
    { value: 'T', display: 'Twitter' },
    { value: 'F', display: 'Facebook' },
    { value: 'B', display: 'Blog' },
    { value: 'I', display: 'Instagram' },
    { value: 'L', display: 'LinkedIn' }
  ];

  socialStatus = ['T', 'B'];

  // ✅ Initialize model
  model: Customer = new Customer(
    '', '', '', 0, 0, new Date(),
    '', '', false,'', []
  );

  constructor(private crmService: CRMService, private router: Router) {
    
  }
membershipTouched = false;
  onSubmit(form: any): void {
    const customer = new Customer(
      form.firstName,
      form.lastName,
      form.email,
      Number(form.phoneNo),
      Number(form.age),
      new Date(form.birthDate),
      form.location,
      form.memberShip,
      form.isRegistered,
      form.password,
      form.socialStatus || []
    );

    const registered = this.crmService.registerCustomer(customer);

    if (registered) {
      debugger
      this.message = '✅ Registration successful!';
      this.submitted = true;
      this.router.navigate(['/home']);
      form.resetForm();
      this.membershipTouched = false;
    } else {
      this.message = '⚠️ Email already registered.';
    }
    setTimeout(() => (this.message = ''), 3000);
  }
  goHome(): void {
    this.router.navigate(['/home']);
  }
}
