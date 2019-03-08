import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { CollectionComponent } from './collection/collection.component';
import { DetailpageComponent } from './collection/detailpage/detailpage.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { DummydetailComponent } from './collection/dummydetail/dummydetail.component';

const routes: Routes = [
  { path: '', component: GalleryComponent },
  { path: 'favorite', component: FavoriteComponent },
  {
    path: 'collections', component: DummydetailComponent,
    children: [
      { path: '', component: CollectionComponent },
      { path: ':id', component: DetailpageComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }