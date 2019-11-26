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
      case 'greyscale': this.greyscale(data); break;
      case 'sepia': this.sepia(data, 1); break;
      case 'invert': this.invert(data); break;
      case 'brightness': this.brightness(data, .3); break;
      case 'hueSaturation': this.hueSaturate(data, -2); break;
      case 'saturation': this.saturate(data, 1); break;
      case 'contrast': this.contrast(data, 0.5); break;
      case 'clarendon':
        this.brightness(data, .1);
        this.contrast(data, .1);
        this.saturate(data, .15);
        break;
      case 'gingham':
        this.sepia(data, -.15);
        this.contrast(data, .04);
        break;
      case 'moon':
        this.greyscale(data);
        this.contrast(data, -.04);
        this.brightness(data, .1);
        break;
      case 'lark':
        this.brightness(data, .08);
        this.rgbAdjust(data, [1, 1.03, 1.05]);
        this.saturate(data, .12);
        break;
      case 'reyes':
        this.sepia(data, .4);
        this.brightness(data, .13);
        this.contrast(data, -.05);
        break;
      case 'juno':
        this.rgbAdjust(data, [1.01, 1.04, 1]);
        this.saturate(data, .3);
        break;
      case 'slumber':
        this.brightness(data, .1);
        this.saturate(data, -.5);
        break;
      case 'crema':
        this.rgbAdjust(data, [1.04, 1, 1.02]);
        this.saturate(data, -.05);
        break;
      case 'ludwig':
        this.brightness(data, .3);
        this.saturate(data, -.03);
        break;
      case 'aden':
        this.colorFilter(data, [228, 130, 225, .13]);
        this.saturate(data, -.2);
        break;
      case 'perpetua':
        this.rgbAdjust(data, [1.05, 1.1, 1]);
        break;
      case 'amaro':
        this.saturate(data, .3);
        this.brightness(data, .15);
        break;
      case 'mayfair':
        this.colorFilter(data, [230, 115, 108, .05]);
        this.saturate(data, .15);
        break;
      case 'rise':
        this.colorFilter(data, [255, 170, 0, .1]);
        this.brightness(data, .09);
        this.saturate(data, .1);
        break;
      case 'hudson':
        this.rgbAdjust(data, [1, 1, 1.25]);
        this.contrast(data, .1);
        this.brightness(data, .15);
        break;
      case 'valencia':
        this.colorFilter(data, [255, 225, 80, .08]);
        this.saturate(data, .1);
        this.contrast(data, .05);
        break;
      case 'xpro2':
        this.colorFilter(data, [255, 255, 0, .07]);
        this.saturate(data, .2);
        this.contrast(data, .15);
        break;
      case 'sierra':
        this.contrast(data, -.15);
        this.saturate(data, .1);
        break;
      case 'willow':
        this.greyscale(data);
        this.colorFilter(data, [100, 28, 210, .03]);
        this.brightness(data, .1);
        break;
      case 'lofi':
        this.contrast(data, .15);
        this.saturate(data, .2);
        break;
      case 'inkwell':
        this.greyscale(data);
        break;
      case 'hefe':
        this.contrast(data, .1);
        this.saturate(data, .15);
        break;
      case 'nashville':
        this.colorFilter(data, [220, 115, 188, .12]);
        this.contrast(data, -.05);
        break;
      case 'stinson':
        this.brightness(data, .1);
        this.sepia(data, .3);
        break;
      case 'vesper':
        this.colorFilter(data, [255, 225, 0, .05]);
        this.brightness(data, .06);
        this.contrast(data, .06);
        break;
      case 'earlybird':
        this.colorFilter(data, [255, 165, 40, .2]);
        break;
      case 'brannan':
        this.contrast(data, .2);
        this.colorFilter(data, [140, 10, 185, .1]);
        break;
      case 'sutro':
        this.brightness(data, -.1);
        this.saturate(data, -.1);
        break;
      case 'toaster':
        this.sepia(data, .1);
        this.colorFilter(data, [255, 145, 0, .2]);
        break;
      case 'walden':
        this.brightness(data, .1);
        this.colorFilter(data, [255, 255, 0, .2]);
        break;
      case '1977':
        this.colorFilter(data, [255, 25, 0, .15]);
        this.brightness(data, .1);
        break;
      case 'kelvin':
        this.colorFilter(data, [255, 140, 0, .1]);
        this.rgbAdjust(data, [1.15, 1.05, 1]);
        this.saturate(data, .35);
        break;
      case 'maven':
        this.colorFilter(data, [225, 240, 0, .1]);
        this.saturate(data, .25);
        this.contrast(data, .05);
        break;
      case 'ginza':
        this.sepia(data, .06);
        this.brightness(data, .1);
        break;
      case 'skyline':
        this.saturate(data, .35);
        this.brightness(data, .1);
        break;
      case 'dogpatch':
        this.contrast(data, .15);
        this.brightness(data, .1);
        break;
      case 'brooklyn':
        this.colorFilter(data, [25, 240, 252, .05]);
        this.sepia(data, .3);
        break;
      case 'helena':
        this.colorFilter(data, [208, 208, 86, .2]);
        this.contrast(data, .15);
        break;
      case 'ashby':
        this.colorFilter(data, [255, 160, 25, .1]);
        this.brightness(data, .1);
        break;
      case 'charmes':
        this.colorFilter(data, [255, 50, 80, .12]);
        this.contrast(data, .05);
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

  RGBtoHSV = (r, g, b) => {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
    const d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [h, s, v];
  }

  HSVtoRGB = (h, s, v) => {
    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }
    return [r * 255, g * 255, b * 255];
  }

  // ColorFilter - add a slight color overlay. rgbColor is an array of [r, g, b, adj]
  colorFilter = (data, rgbColor) => {
    const adj = rgbColor[3];
    for (let i = 0; i < data.length; i += 4) {
      data[i] -= (data[i] - rgbColor[0]) * adj;
      data[i + 1] -= (data[i + 1] - rgbColor[1]) * adj;
      data[i + 2] -= (data[i + 2] - rgbColor[2]) * adj;
    }
    return data;
  }

  // RGB Adjust
  rgbAdjust = (data, rgbAdj) => {
    for (let i = 0; i < data.length; i += 4) {
      data[i] *= rgbAdj[0];		// R
      data[i + 1] *= rgbAdj[1];	// G
      data[i + 2] *= rgbAdj[2];	// B
    }
    return data;
  }

  contrast = (data, rgbAdj) => {
    // Contrast - the this.filterContrast value should be -1 to 1
    rgbAdj *= 255;
    const adjContrast = rgbAdj;
    const factor = (259 * (adjContrast + 255)) / (255 * (259 - adjContrast));
    for (let i = 0; i < data.length; i += 4) {
      data[i] = factor * (data[i] - 128) + 128;
      data[i + 1] = factor * (data[i + 1] - 128) + 128;
      data[i + 2] = factor * (data[i + 2] - 128) + 128;
    }
    return data;
  }

  saturate = (data, rgbAdj) => {
    //  Better result (slow) -  this.filterSaturate should be < 1 (desaturated) to 1 (unchanged) and < 1
    rgbAdj = 1;
    let adjSaturate = rgbAdj;
    adjSaturate = (adjSaturate < -1) ? -1 : adjSaturate;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b; //weights from CCIR 601 spec
      data[i] = -gray * adjSaturate + data[i] * (1 + adjSaturate);
      data[i + 1] = -gray * adjSaturate + data[i + 1] * (1 + adjSaturate);
      data[i + 2] = -gray * adjSaturate + data[i + 2] * (1 + adjSaturate);
    }
  }

  hueSaturate = (data, rgbAdj) => {
    //  Better result (slow) -  this.filterHuerotate should be < 1 (desaturated) to 1 (unchanged) and < 1
    for (let i = 0; i < data.length; i += 4) {
      const hsv = this.RGBtoHSV(data[i], data[i + 1], data[i + 2]);
      hsv[1] *= rgbAdj;
      const rgb = this.HSVtoRGB(hsv[0], hsv[1], hsv[2]);
      data[i] = rgb[0];
      data[i + 1] = rgb[1];
      data[i + 2] = rgb[2];
    }
  }

  brightness = (data, rgbAdj) => {
    // this.filterBrightness should be -1 (darker) to 1 (lighter). 0 is unchanged.
    let adjbrightness = rgbAdj;
    adjbrightness = (adjbrightness > 1) ? 1 : adjbrightness;
    adjbrightness = (adjbrightness < -1) ? -1 : adjbrightness;
    adjbrightness = ~~(255 * adjbrightness);
    for (let i = 0; i < data.length; i += 4) {
      data[i] += adjbrightness;
      data[i + 1] += adjbrightness;
      data[i + 2] += adjbrightness;
    }
  }

  invert = (data) => {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
  }

  sepia = (data, rgbAdj) => {
    // this.filterSepia is 0 (unchanged) to 1 (sepia)
    const adj = rgbAdj;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      data[i] = (r * (1 - (0.607 * adj))) + (g * .769 * adj) + (b * .189 * adj);
      data[i + 1] = (r * .349 * adj) + (g * (1 - (0.314 * adj))) + (b * .168 * adj);
      data[i + 2] = (r * .272 * adj) + (g * .534 * adj) + (b * (1 - (0.869 * adj)));
    }
  }

  greyscale = (data) => {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const avg = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      data[i] = data[i + 1] = data[i + 2] = avg;
    }
  }

  ngOnDestroy() {
    this.baseImage = null;
    this.canvas = null;
    this.downloadURL = '';
    this.imageSrc = '';
  }

}
