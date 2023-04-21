import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionComponent } from './collection/collection.component';
import { DetailpageComponent } from './collection/detailpage/detailpage.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { DummydetailComponent } from './collection/dummydetail/dummydetail.component';
import { TrendingComponent } from './trending/trending.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./landing-page/landing-page-routing.module').then(m => m.LandingPageRoutingModule) },
  { path: 'favorite', component: FavoriteComponent },
  { path: 'trending', component: TrendingComponent },
  {
    path: 'collections', component: DummydetailComponent,
    children: [
      { path: '', component: CollectionComponent },
      { path: ':id', component: DetailpageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
