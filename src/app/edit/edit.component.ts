import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Generalparameters } from '../common/constants';
import { GalleryServices } from '../gallery/gallery.service';
import { PopupService } from '../popup/popup.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['../../app/app.component.scss']
})

export class EditComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('editCanvas', { static: true }) myCanvas: ElementRef;
  @Input() id: string;
  private sub: any;
  context: CanvasRenderingContext2D;
  baseImage = new Image();
  canvas;
  textTitle = Generalparameters.EditInitparameters.TEXTTITLE;
  textColor: string;
  textBaseline: CanvasTextBaseline;
  textFont: string;
  textFontSize = Generalparameters.EditInitparameters.FONTSIZE;
  textFontColor = Generalparameters.EditInitparameters.FONTCOLOR;
  selectedText = -1;
  fontsFamily = Generalparameters.EditInitparameters.FONTFAMILY.split(',');
  selectedFont = 'Open Sans';
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  downloadURL: any;
  showloader = true;
  photo: [];
  positionX: number;
  positionY: number;

  filterBlur = 0;
  filterBrightness = 100;
  filterContrast = 100;
  filterGrayscale = 0;
  filterHuerotate = 0;
  filterInvert = 0;
  filterSaturate = 100;
  filterSepia = 0;

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
      this.showloader = true;
      this.photo = data;
      this.imageSrc = data.urls.regular;
      this.baseImage.src = this.imageSrc;
      this.imageWidth = 1080;
      this.imageHeight = (data.height * 1080) / data.width;
      this.createBaseImage(this.imageSrc, this.imageWidth, this.imageHeight);
      this.downloadURL = this.imageSrc;
      this.showloader = false;
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
  }

  writeText() {
    this.context.textBaseline = this.textBaseline;
    if (this.textTitle !== undefined && this.textFont !== undefined) {
      if (this.textTitle.length > 2 || this.textFontSize > 5) {
        this.positionX = this.imageWidth / 2;
        this.positionY = this.imageHeight / 2;
        this.drawUpdatedCanvas(this.textTitle);
        this.drawText(this.textTitle, this.positionX, this.positionY);
        this.saveEditing();
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

  updateImageFilter(filtertype: string, e: any) {

    // if (filtertype === 'blur') {
    //   this.filterBlur = e.target.value;
    // }
    // if (filtertype === 'brightness') {
    //   this.filterBrightness = e.target.value;
    // }
    // if (filtertype === 'contrast') {
    //   this.filterContrast = e.target.value;
    // }
    // if (filtertype === 'greyscale') {
    //   this.filterGrayscale = e.target.value;
    // }
    // if (filtertype === 'huerotate') {
    //   this.filterHuerotate = e.target.value;
    // }
    // if (filtertype === 'invert') {
    //   this.filterInvert = e.target.value;
    // }
    // if (filtertype === 'saturate') {
    //   this.filterSaturate = e.target.value;
    // }
    // if (filtertype === 'sepia') {
    //   this.filterSepia = e.target.value;
    // }

    switch (filtertype) {
      case 'blur': this.filterBlur = e.target.value; break;
      case 'brightness': this.filterBrightness = e.target.value; break;
      case 'contrast': this.filterContrast = e.target.value; break;
      case 'greyscale': this.filterGrayscale = e.target.value; break;
      case 'huerotate': this.filterHuerotate = e.target.value; break;
      case 'invert': this.filterInvert = e.target.value; break;
      case 'saturate': this.filterSaturate = e.target.value; break;
      case 'sepia': this.filterSepia = e.target.value; break;
    }

    let filters =
      'blur(' + this.filterBlur + 'px) ' +
      'contrast(' + this.filterContrast + '%) ' +
      'brightness(' + this.filterBrightness + '%)' +
      'grayscale( ' + this.filterGrayscale + '%)' +
      'hue-rotate( ' + this.filterHuerotate + 'deg)' +
      'invert( ' + this.filterInvert + '%)' +
      'saturate( ' + this.filterSaturate + '%)' +
      'sepia( ' + this.filterSepia + '%)';

    this.context.filter = filters;
    this.writeText();
  }

  resetImageFilter() {
    this.context.filter = 'none';
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
