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
  private buffer : any = [];
  private Photos : any = []; 
  private pageNo : number = 2;
  private collection : any = [];
  private id : Number;
  constructor(private route: ActivatedRoute, private galleryServices : GalleryServices, private galleryComponent : GalleryComponent) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params["id"];
    this.getCollectionPhotos(this.id);
  }

  getCollectionPhotos(collectionId : Number){
    this.galleryServices.getCollectionDetails(collectionId).subscribe((data:{})=>{
      this.Photos = data;
    })

    this.galleryServices.getCollectionInfo(collectionId).subscribe((data:{})=>{
      this.collection = data;
    })
  }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll() {
    let pos = window.innerHeight + window.scrollY;
    let max = document.body.offsetHeight;
     if(pos >= max) {
        this.loadMoreCollections(this.pageNo, this.id);
     }
  }

  loadMoreCollections(pages,id){
    this.galleryServices.getLoadMoreCollectionDetailImages(pages,id).subscribe((data:{})=>{   
      this.buffer = data;     
      this.Photos = this.Photos.concat(data);
      this.pageNo++;
    });
  }

  addFavorite(photo){
   this.galleryComponent.addFavorite(photo);
  }
}



