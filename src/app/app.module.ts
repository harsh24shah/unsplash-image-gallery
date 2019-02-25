import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-rounting.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { CollectionComponent } from './collection/collection.component';
import { DetailpageComponent } from './collection/detailpage/detailpage.component';
import { ImageDetails } from './Models/image-detail.model';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    CollectionComponent,
    DetailpageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
  ],
  providers: [ImageDetails],
  bootstrap: [AppComponent],
  exports: [GalleryComponent]
})
export class AppModule { }
