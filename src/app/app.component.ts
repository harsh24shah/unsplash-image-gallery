import { Component } from '@angular/core';
import {GalleryServices} from './gallery/gallery.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'unsplashgallery';

  constructor(private galleryServices : GalleryServices){}

}
