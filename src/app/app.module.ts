import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-rounting.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CollectionComponent } from './collection/collection.component';
import { DetailpageComponent } from './collection/detailpage/detailpage.component';
import { ImageDetails } from './models/image-detail.model';
import { FavoriteComponent } from './favorite/favorite.component';
import { DummydetailComponent } from './collection/dummydetail/dummydetail.component';
import { PopupComponent } from './popup/popup.component';
import {PopupService} from './popup/popup.service';
import { TrendingComponent } from './trending/trending.component';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    CollectionComponent,
    DetailpageComponent,
    FavoriteComponent,
    DummydetailComponent,
    PopupComponent,
    TrendingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
  ],
  providers: [ImageDetails, PopupService],
  bootstrap: [AppComponent],
  exports: [GalleryComponent]
})

export class AppModule { }
