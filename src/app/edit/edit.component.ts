import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryServices } from '../gallery/gallery.service';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';

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
  fontsFamily = 'Open Sans,Arial,Montserrat,Raleway,Tangerine'.split(',');
  selectedFont = 'Montserrat';
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;

  mouseDownEvents = ['mousedown', 'touchdown'];
  mouseMoveEvents = ['mousemove', 'touchmove'];
  mouseleaveEvents = ['mouseleave', 'mouseup', 'touchleave'];

  id: string;
  private sub: any;
  photo: [];

  positionX = 50;
  positionY = 50;

  constructor(private route: ActivatedRoute, private galleryServices: GalleryServices) {
    this.textColor = 'white';
    this.textBaseline = 'middle';
    this.textFont = this.textFontSize + 'px ' + this.selectedFont;

  }

  ngAfterViewInit() {
    this.canvas = this.myCanvas.nativeElement as HTMLCanvasElement;
    this.captureEvents(this.canvas);
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

  captureEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from the canvas element
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {

          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              // we'll stop (and unsubscribe) once the user releases the mouse
              // this will trigger a 'mouseup' event
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point
              pairwise()
            );
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        this.positionX = currentPos.x;
        this.positionY = currentPos.y;

        this.context.clearRect(0, 0, this.imageWidth, this.imageHeight);
        this.context.drawImage(this.baseImage, 0, 0);
        this.drawText(this.textTitle, currentPos.x, currentPos.y);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
