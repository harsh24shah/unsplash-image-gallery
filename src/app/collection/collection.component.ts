import { Component, OnInit } from '@angular/core';
import {GalleryServices} from './collection.services';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})

export class CollectionComponent implements OnInit {
  private collections : any = [];
  
  constructor( private collectionServices : GalleryServices ) { }

  ngOnInit() {
    this.getCollections();
  }

  getCollections(){
    this.collectionServices.getCollection().subscribe((data:{}) =>{
      this.collections = data;
    });
  }

}
