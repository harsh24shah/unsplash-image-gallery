import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryServices } from '../gallery/gallery.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['../../app/app.component.scss']
})

export class EditComponent implements OnInit, OnDestroy {
  @ViewChild('editCanvas') myCanvas: ElementRef;
  context: CanvasRenderingContext2D;
  baseImage = new Image();

  textTitle: '';
  textColor: string;
  textBaseline: CanvasTextBaseline;
  textFont: string;
  textFontSize = 20;
  selectedText = -1;
  textFontColor = '#fff';
  fontsFamily = ['Open Sans','Arial','Montserrat','Raleway','Tangerine']; 

  imageSrc: string;
  imageWidth: number;
  imageHeight: number;

  id: string;
  private sub: any;
  photo: [];

  constructor(private route: ActivatedRoute, private galleryServices: GalleryServices) {
    this.textColor = 'white';
    this.textBaseline = 'middle';
    this.textFont = this.textFontSize + "px" + " 'Montserrat'";
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getPhotoFromId(this.id);
  }

  getPhotoFromId(id: string) {
    this.galleryServices.getImage(id).subscribe(data => {
      this.photo = data;
      this.imageSrc = data.urls.regular;
      this.imageWidth = (data.width) / 3;
      this.imageHeight = (data.height) / 3;
      this.createBaseImage(this.imageSrc, this.imageWidth, this.imageHeight);
    });
  }

  createBaseImage(imageSrc: string, imageWidth: number, imageHeight: number) {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    this.baseImage.onload = () => {
      this.myCanvas.nativeElement.width = imageWidth;
      this.myCanvas.nativeElement.height = imageHeight;
      this.context.drawImage(this.baseImage, 0, 0);
      this.writeText();
    }
    this.baseImage.src = imageSrc;
  }

  writeText() {
    this.context.textBaseline = this.textBaseline;
    if (this.textTitle !== undefined && this.textFont !== undefined) {
      if (this.textTitle.length > 2 || this.textFontSize > 5) {
        this.drawUpdatedCanvas(this.textTitle);
        this.drawText(this.textTitle);
      } else {
        this.drawUpdatedCanvas('');
      }
    }
  }

  updateRangeFontSize(e) {
    this.textFont = e.target.value + "px" + " 'Montserrat'";
    this.writeText();
  }

  updateColor(e) {
    this.textColor = e.target.value;
    this.writeText();
  }

  drawText(textTitle: string) {
    this.context.fillText(textTitle, 50, 50);
  }

  drawUpdatedCanvas(textTitle: string) {
    this.context.fillStyle = this.textColor;
    this.context.font = this.textFont;
    this.drawText(textTitle);
    this.context.drawImage(this.baseImage, 0, 0);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
