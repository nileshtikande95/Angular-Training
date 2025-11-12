import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
 

import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './membership/sign-in/sign-in.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'estorespa';

  loggedInStatus:boolean|undefined;
 
  links:any=[];

  constructor( private router:Router){
    this.links=["home"];
  }
  convertToBoolean(result:string):boolean{
    let status=false;
    if(result=="true"){
      status=true;
    }
    return status;
  }

  ngOnInit() {
   const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    const navType = navigationEntries[0]?.type;

    if (navType === 'reload') {
      this.router.navigate(['/home']);
    }
    console.log("Router container component ngOnint is getting invoked");
      let strStatus:string|null=localStorage.getItem("loggedInStatus");
      console.log( " in routerocntainer strStatus ="+strStatus);
      if(strStatus!=null){
        this.loggedInStatus=true;
        //this.convertToBoolean(strStatus);
        console.log(this.loggedInStatus);
      }

  }
}
