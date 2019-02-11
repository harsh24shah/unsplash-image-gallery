import { Component, OnInit } from '@angular/core';
import { GalleryServices } from '../gallery/gallery.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})

export class CollectionComponent implements OnInit {
  private collections : any = [];
  constructor( private collectionServices : GalleryServices, activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.getCollections();
  }

  getCollections(){
    this.collectionServices.getCollection().subscribe((data:{}) =>{
      this.collections = data;
    });
  }

}
