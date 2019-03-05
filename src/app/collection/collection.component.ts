import { Component, OnInit , OnDestroy, HostListener } from '@angular/core';
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
  private buffer : any = [];
  private pageNo : number = 2;
  searchQuery : '';
  showSearch : boolean = false;

  constructor( private collectionServices : GalleryServices, activatedRoute: ActivatedRoute ) { }
  
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

    this.collectionServices.addToLocalStorage(favImage);      
    favImage = null;    
  }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll() {
    let pos = window.innerHeight + window.scrollY;
    let max = document.body.offsetHeight;
     if(pos >= max) {
        this.loadMoreCollections(this.pageNo);
     }
  }

  loadMoreCollections(pages){
    this.collectionServices.getLoadMoreCollections(pages).subscribe((data:{})=>{   
      this.buffer = data;     
      this.collections = this.collections.concat(data);
      this.pageNo++;
    });
  }

  ngOnDestroy(){

  }

}
