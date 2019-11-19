import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { GalleryServices } from '../gallery/gallery.service';
import { PopupService } from '../popup/popup.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['../../app/app.component.scss']
})

export class EditComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('editCanvas') myCanvas: ElementRef;

  context: CanvasRenderingContext2D;
  baseImage = new Image();
  canvas;
  textTitle = '';
  textColor: string;
  textBaseline: CanvasTextBaseline;
  textFont: string;
  textFontSize = 40;
  textFontColor = '#000';
  selectedText = -1;
  fontsFamily = 'Open Sans,Arial,Raleway,Tangerine'.split(',');
  selectedFont = 'Open Sans';
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  downloadURL;

  @Input() id: string;
  private sub: any;
  photo: [];

  positionX = 50;
  positionY = 50;

  constructor(
    private galleryServices: GalleryServices,
    private popupService: PopupService,
    private domSanitizer: DomSanitizer) {
    this.textColor = 'white';
    this.textBaseline = 'middle';
    this.textFont = this.textFontSize + 'px ' + this.selectedFont;
  }

  ngAfterViewInit() {
    this.canvas = this.myCanvas.nativeElement as HTMLCanvasElement;
  }

  ngOnInit() {
    this.getPhotoFromId(this.id);
    this.baseImage.crossOrigin = 'Anonymous';
  }

  closeModal(id: string) {
    this.popupService.close(id);
  }

  getPhotoFromId(id: string) {
    this.galleryServices.getImage(id).subscribe(data => {
      this.photo = data;
      this.imageSrc = data.urls.regular;
      this.imageWidth = (data.width) / 3;
      this.imageHeight = (data.height) / 3;
      this.createBaseImage(this.imageSrc, this.imageWidth, this.imageHeight);
      this.downloadURL = this.imageSrc;
    });
  }

  createBaseImage(imageSrc: string, imageWidth: number, imageHeight: number) {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    this.baseImage.onload = () => {
      this.myCanvas.nativeElement.width = imageWidth;
      this.myCanvas.nativeElement.height = imageHeight;
      this.context.drawImage(this.baseImage, 0, 0);
      this.writeText();
    };
    this.baseImage.src = imageSrc;
  }

  writeText() {
    this.context.textBaseline = this.textBaseline;
    if (this.textTitle !== undefined && this.textFont !== undefined) {
      if (this.textTitle.length > 2 || this.textFontSize > 5) {
        this.drawUpdatedCanvas(this.textTitle);
        this.drawText(this.textTitle, this.positionX, this.positionY);
      } else {
        this.drawUpdatedCanvas('');
      }
    }
  }

  updateRangeFontSize(e: any) {
    this.textFontSize = e.target.value;
    this.textFont = this.textFontSize + 'px ' + this.selectedFont;
    this.writeText();
  }

  updateColor(e: any) {
    this.textColor = e.target.value;
    this.writeText();
  }

  changeFontFamily(font: string) {
    this.selectedFont = font;
    this.textFont = this.textFontSize + 'px ' + this.selectedFont;
    this.writeText();
  }

  drawText(textTitle: string, positionX, positionY) {
    this.context.fillText(textTitle, positionX, positionY);
  }

  drawUpdatedCanvas(textTitle: string) {
    this.context.fillStyle = this.textColor;
    this.context.font = this.textFont;
    this.drawText(textTitle, this.positionX, this.positionY);
    this.context.drawImage(this.baseImage, 0, 0);
  }

  saveEditing() {
   // console.log(this.context.getImageData(0, 0, this.canvas.width, this.canvas.height));
   this.downloadURL = this.canvas.toDataURL('image/jpeg');
   this.downloadURL = this.domSanitizer.bypassSecurityTrustUrl(this.downloadURL);
  }

  ngOnDestroy() {
   this.baseImage = null;
   this.canvas = null;
  }

}
