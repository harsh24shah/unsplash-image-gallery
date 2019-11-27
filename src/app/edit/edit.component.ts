import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Generalparameters } from '../common/constants';
import { GalleryServices } from '../gallery/gallery.service';
import { Util } from '../common/util';
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
  imageThumbSrc: string;
  imageWidth: number;
  imageHeight: number;
  downloadURL: any;
  showloader = true;
  photo: [];
  positionX: number;
  positionY: number;
  filters = Generalparameters.EditInitparameters.FILTERS;
  slideConfig = Generalparameters.SliderConfig.SLIDERPARAMS;
  filterBrightness: number;
  filterContrast = .5;
  filterHuerotate: number;
  filterSaturate: number;
  filterSepia: number;

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
    this.ngOnDestroy();
  }

  getPhotoFromId(id: string) {
    this.galleryServices.getImage(id).subscribe(data => {
      this.showloader = true;
      this.photo = data;
      this.imageSrc = data.urls.regular;
      this.imageThumbSrc = data.urls.thumb;
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

  updateImageFilter(filtertype: string) {
    this.showloader = true;
    const contextData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = contextData.data;

    switch (filtertype) {
      case 'greyscale': Util.greyscale(data); break;
      case 'sepia': Util.sepia(data, 1); break;
      case 'invert': Util.invert(data); break;
      case 'brightness': Util.brightness(data, .3); break;
      case 'hueSaturation': Util.hueSaturate(data, -2); break;
      case 'saturation': Util.saturate(data, 1); break;
      case 'contrast': Util.contrast(data, 0.5); break;
      case 'clarendon':
        Util.brightness(data, .1);
        Util.contrast(data, .1);
        Util.saturate(data, .15);
        break;
      case 'gingham':
        Util.sepia(data, -.15);
        Util.contrast(data, .04);
        break;
      case 'moon':
        Util.greyscale(data);
        Util.contrast(data, -.04);
        Util.brightness(data, .1);
        break;
      case 'lark':
        Util.brightness(data, .08);
        Util.rgbAdjust(data, [1, 1.03, 1.05]);
        Util.saturate(data, .12);
        break;
      case 'reyes':
        Util.sepia(data, .4);
        Util.brightness(data, .13);
        Util.contrast(data, -.05);
        break;
      case 'juno':
        Util.rgbAdjust(data, [1.01, 1.04, 1]);
        Util.saturate(data, .3);
        break;
      case 'slumber':
        Util.brightness(data, .1);
        Util.saturate(data, -.5);
        break;
      case 'crema':
        Util.rgbAdjust(data, [1.04, 1, 1.02]);
        Util.saturate(data, -.05);
        break;
      case 'ludwig':
        Util.brightness(data, .3);
        Util.saturate(data, -.03);
        break;
      case 'aden':
        Util.colorFilter(data, [228, 130, 225, .13]);
        Util.saturate(data, -.2);
        break;
      case 'perpetua':
        Util.rgbAdjust(data, [1.05, 1.1, 1]);
        break;
      case 'amaro':
        Util.saturate(data, .3);
        Util.brightness(data, .15);
        break;
      case 'mayfair':
        Util.colorFilter(data, [230, 115, 108, .05]);
        Util.saturate(data, .15);
        break;
      case 'rise':
        Util.colorFilter(data, [255, 170, 0, .1]);
        Util.brightness(data, .09);
        Util.saturate(data, .1);
        break;
      case 'hudson':
        Util.rgbAdjust(data, [1, 1, 1.25]);
        Util.contrast(data, .1);
        Util.brightness(data, .15);
        break;
      case 'valencia':
        Util.colorFilter(data, [255, 225, 80, .08]);
        Util.saturate(data, .1);
        Util.contrast(data, .05);
        break;
      case 'xpro2':
        Util.colorFilter(data, [255, 255, 0, .07]);
        Util.saturate(data, .2);
        Util.contrast(data, .15);
        break;
      case 'sierra':
        Util.contrast(data, -.15);
        Util.saturate(data, .1);
        break;
      case 'willow':
        Util.greyscale(data);
        Util.colorFilter(data, [100, 28, 210, .03]);
        Util.brightness(data, .1);
        break;
      case 'lofi':
        Util.contrast(data, .15);
        Util.saturate(data, .2);
        break;
      case 'inkwell':
        Util.greyscale(data);
        break;
      case 'hefe':
        Util.contrast(data, .1);
        Util.saturate(data, .15);
        break;
      case 'nashville':
        Util.colorFilter(data, [220, 115, 188, .12]);
        Util.contrast(data, -.05);
        break;
      case 'stinson':
        Util.brightness(data, .1);
        Util.sepia(data, .3);
        break;
      case 'vesper':
        Util.colorFilter(data, [255, 225, 0, .05]);
        Util.brightness(data, .06);
        Util.contrast(data, .06);
        break;
      case 'earlybird':
        Util.colorFilter(data, [255, 165, 40, .2]);
        break;
      case 'brannan':
        Util.contrast(data, .2);
        Util.colorFilter(data, [140, 10, 185, .1]);
        break;
      case 'sutro':
        Util.brightness(data, -.1);
        Util.saturate(data, -.1);
        break;
      case 'toaster':
        Util.sepia(data, .1);
        Util.colorFilter(data, [255, 145, 0, .2]);
        break;
      case 'walden':
        Util.brightness(data, .1);
        Util.colorFilter(data, [255, 255, 0, .2]);
        break;
      case 'vintage':
        Util.colorFilter(data, [255, 25, 0, .15]);
        Util.brightness(data, .1);
        break;
      case 'kelvin':
        Util.colorFilter(data, [255, 140, 0, .1]);
        Util.rgbAdjust(data, [1.15, 1.05, 1]);
        Util.saturate(data, .35);
        break;
      case 'maven':
        Util.colorFilter(data, [225, 240, 0, .1]);
        Util.saturate(data, .25);
        Util.contrast(data, .05);
        break;
      case 'ginza':
        Util.sepia(data, .06);
        Util.brightness(data, .1);
        break;
      case 'skyline':
        Util.saturate(data, .35);
        Util.brightness(data, .1);
        break;
      case 'dogpatch':
        Util.contrast(data, .15);
        Util.brightness(data, .1);
        break;
      case 'brooklyn':
        Util.colorFilter(data, [25, 240, 252, .05]);
        Util.sepia(data, .3);
        break;
      case 'helena':
        Util.colorFilter(data, [208, 208, 86, .2]);
        Util.contrast(data, .15);
        break;
      case 'ashby':
        Util.colorFilter(data, [255, 160, 25, .1]);
        Util.brightness(data, .1);
        break;
      case 'charmes':
        Util.colorFilter(data, [255, 50, 80, .12]);
        Util.contrast(data, .05);
        break;
    }

    this.context.putImageData(contextData, 0, 0);
    this.saveEditing();
    this.showloader = false;
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
    this.downloadURL = this.canvas.toDataURL('image/jpeg');
    this.downloadURL = this.domSanitizer.bypassSecurityTrustUrl(this.downloadURL);
  }

  ngOnDestroy() {
    this.baseImage = null;
    this.imageSrc = '';
  }

}
