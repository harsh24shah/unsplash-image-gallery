import { Component, OnInit , OnDestroy } from '@angular/core';
import { GalleryServices } from '../gallery/gallery.service';
import { ActivatedRoute } from "@angular/router";
import { ImageDetails } from '../models/image-detail.model';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['../../app/app.component.scss']
})

export class CollectionComponent implements OnInit, OnDestroy {
  private collections : any = [];
  constructor( private collectionServices : GalleryServices, activatedRoute: ActivatedRoute ) { }
  showSearch : boolean = false;
  
  ngOnInit() {
    this.getCollections();
  }

  getCollections(){
    this.collectionServices.getCollection().subscribe((data:{}) =>{
      this.collections = data;
    });
  }

  addFavorite(photo){  
    var favImage = new ImageDetails;
    favImage.imageURL = photo.urls.small;
    favImage.imageDownloadPath = photo.links.download;
    favImage.imageAlt = photo.user.username;
    favImage.imageId = photo.id;
    favImage.ImageOwnerProfile = photo.user.profile_image.small;
    favImage.ImageOwnerName = photo.user.first_name;

    this.collectionServices.addTofavouriteService(favImage);      
    favImage = null;    
  }

  ngOnDestroy(){

  }

}
