import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { CollectionComponent } from './collection/collection.component';


const routes: Routes = [
{
  path: '',
  component: GalleryComponent
},
{
  path:'collections',
  component: CollectionComponent
}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
