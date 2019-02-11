import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { CollectionComponent } from './collection/collection.component';
import { DetailpageComponent } from './collection/detailpage/detailpage.component';

const routes: Routes = [
  { path:'', component: GalleryComponent },
  { path:'collections', component: CollectionComponent},
  { path:'collection-details/:id', component: DetailpageComponent }  
];   
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
