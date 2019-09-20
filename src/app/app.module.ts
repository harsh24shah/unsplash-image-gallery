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
import { PopupService } from './popup/popup.service';
import { GalleryServices } from './gallery/gallery.service';
import { TrendingComponent } from './trending/trending.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    CollectionComponent,
    DetailpageComponent,
    FavoriteComponent,
    DummydetailComponent,
    PopupComponent,
    TrendingComponent,
    HomeComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SlickCarouselModule,
    FormsModule,
    RouterModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ImageDetails, PopupService, GalleryServices],
  bootstrap: [AppComponent],
  exports: [GalleryComponent]
})

export class AppModule { }
