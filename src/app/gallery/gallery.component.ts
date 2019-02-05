import { Component, OnInit, HostListener } from '@angular/core';
import {GalleryServices} from './gallery.service';


@Component({
  selector: 'gallery-grid, date-pipe',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})



export class GalleryComponent implements OnInit {
  
  private Photos : any = [];
  private results : any =[];
  private temp : any = [];
  searchQuery : '';
  private pageNo : number = 2;

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
    this.pageNo = 2;

    this.galleryServices.getSearchedImages(searchQuery).subscribe((data:{})=>{ 
      if(this.Photos.length < 0){
        this.Photos = [];
      } 
      this.Photos = data; 
      this.Photos = this.Photos.results
     });
  }
  
  @HostListener("window:scroll", ['$event'])
  onWindowScroll() {
    let mesonaryDiv = document.getElementById('masonry');
    let pos = window.innerHeight + window.scrollY;
    let max = document.body.offsetHeight;
    console.log(pos +"----"+ max);
     if(pos >= max) {
        this.loadMore(this.pageNo,this.searchQuery);
     }
  }

  loadMore(pages, search:string){
    this.galleryServices.getLoadMoreImages(pages,search).subscribe((data:{})=>{   
       this.temp = data;
      if(!this.temp.results){
        this.Photos = this.Photos.concat(data);
      }
      else{
        this.Photos =this.Photos.concat(this.temp.results);
      }    
      this.pageNo++;
    }); 
  }
  
}
