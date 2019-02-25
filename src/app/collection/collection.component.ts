import { Component, OnInit , OnDestroy } from '@angular/core';
import { GalleryServices } from '../gallery/gallery.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
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

  ngOnDestroy(){

  }

}
