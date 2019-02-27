import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GalleryServices } from '../../gallery/gallery.service';
import { GalleryComponent } from '../../gallery/gallery.component';

@Component({
  providers:[ GalleryComponent ],
  selector: 'app-detailpage', 
  templateUrl: '../../gallery/gallery.component.html',
  styleUrls: ['../../../app/app.component.scss'] 
}) 

export class DetailpageComponent implements OnInit {
  private Photo : any = [];
  private Photos : any = []; 
  private collection : any = [];

  constructor(private route: ActivatedRoute, private galleryServices : GalleryServices, private galleryComponent : GalleryComponent) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params["id"];
    this.getCollectionPhotos(id);
  }

  getCollectionPhotos(collectionId : Number){
    this.galleryServices.getCollectionDetails(collectionId).subscribe((data:{})=>{
      this.Photos = data;
    })

    this.galleryServices.getCollectionInfo(collectionId).subscribe((data:{})=>{
      this.collection = data;
    })
  }

  addFavorite(photo){
   this.galleryComponent.addFavorite(photo);
  }
}



