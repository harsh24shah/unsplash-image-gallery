import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule, 
    FormsModule,  
    LandingPageRoutingModule
  ] 
})
export class LandingPageModule { }
 