import { Component, OnInit } from '@angular/core';
import {GalleryServices} from './gallery.service';

@Component({
  selector: 'gallery-grid',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {
  private Photos : any = [];
  searchQuery : '';
  constructor(private galleryServices : GalleryServices) { }

  ngOnInit() {
    this.getRandomImages();
  }

  getRandomImages(){
    this.galleryServices.getRandomImagesService().subscribe((data:{}) => {
      this.Photos = data;
    });
  }

  getSearchResult(searchQuery){
    console.log(searchQuery);
    this.galleryServices.getSearchedImages(searchQuery).subscribe((data:{})=>{ 
      this.Photos = data;
     });
  }

}
