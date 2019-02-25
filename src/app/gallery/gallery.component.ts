import { Component, OnInit, HostListener } from '@angular/core';
import {GalleryServices} from './gallery.service';
import { ImageDetails } from '../Models/image-detail.model';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'gallery-grid, date-pipe',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {
  private Photos : any = [];
  private buffer : any = [];
  searchQuery : '';
  private pageNo : number = 2;
  showSearch : boolean = true;
  favoriteImagesBucket : any = [];
  constructor(private galleryServices : GalleryServices,public favImage : ImageDetails) { 
    
  }
  
  ngOnInit() {
    this.getRandomImages();
  }

  getRandomImages(){
    this.galleryServices.getRandomImagesService().subscribe((data:{}) => {
      this.Photos = data;
    });
  }

  getSearchResult(searchQuery){
    this.pageNo = 2;

    this.galleryServices.getSearchedImages(searchQuery).subscribe((data:{})=>{ 
      if(this.Photos.length < 0){
        this.Photos = [];
      } 
      this.Photos = data; 
      this.Photos = this.Photos.results
     });
  }

  addFavorite(photo){  
    var favImage = new ImageDetails;
  
      favImage.imageURL = photo.urls.small;
      favImage.imageDownloadPath = photo.links.download;
      favImage.imageAlt = photo.user.username;
      favImage.imageId = photo.id;
      this.favoriteImagesBucket.push(favImage);   
     favImage = null; 
  }
  
  @HostListener("window:scroll", ['$event'])
  onWindowScroll() {
    let mesonaryDiv = document.getElementById('masonry');
    let pos = window.innerHeight + window.scrollY;
    let max = document.body.offsetHeight;
    //console.log(pos +"----"+ max);
     if(pos >= max) {
        this.loadMoreImages(this.pageNo,this.searchQuery);
     }
  }

  loadMoreImages(pages, search:string){
    this.galleryServices.getLoadMoreImages(pages,search).subscribe((data:{})=>{   
       this.buffer = data;
      if(!this.buffer.results){
        this.Photos = this.Photos.concat(data);
      }
      else{
        this.Photos =this.Photos.concat(this.buffer.results);
      }    
      this.pageNo++;
    }); 
  }
  
}
