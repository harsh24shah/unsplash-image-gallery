import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GalleryServices } from '../../gallery/gallery.service';

@Component({
  selector: 'app-detailpage', 
  templateUrl: '../../gallery/gallery.component.html',
  styleUrls: ['../../../app/app.component.scss'] 
}) 

export class DetailpageComponent implements OnInit {

  private Photos : any = [];
  private collection : any = [];

  constructor(private route: ActivatedRoute, private galleryServices : GalleryServices) { }

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
}



