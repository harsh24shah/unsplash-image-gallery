import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { GridImageComponent } from '../shared/component/grid-image/grid-image.component';
import { ImageDetailComponent } from '../shared/component/image-detail/image-detail.component';


@NgModule({
  declarations: [
    LandingComponent, 
    GridImageComponent,
    ImageDetailComponent
  ],
  imports: [
    CommonModule, 
    LandingRoutingModule
  ]
})
export class LandingModule { }
