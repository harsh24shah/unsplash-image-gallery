import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DailogData, ImageVM } from 'src/app/models/image.model';
import { MatDividerModule } from '@angular/material/divider';
import { DomSanitizer } from '@angular/platform-browser';
import { EditOptions } from 'src/app/constants/constants';
import { Util } from 'src/app/Utilities/util';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  standalone: true,
  styleUrls: ['./image-edit.component.scss'],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    FormsModule
  ],
})
export class ImageEditComponent implements OnInit {
  @ViewChild('editCanvas', { static: true }) myCanvas: ElementRef<HTMLCanvasElement>;
  public image: ImageVM;
  public context: CanvasRenderingContext2D | null;
  public baseImage = new Image();
  public downloadUrl: any;
  public canvas: any;
  public textTitle = EditOptions.TEXTTITLE;
  public textColor: string;
  public textBaseline: CanvasTextBaseline;
  public textFontSize = EditOptions.FONTSIZE;
  public textFontColor = EditOptions.FONTCOLOR;
  public fontsFamily = EditOptions.FONTFAMILY.split(',');
  public selectedFont = this.fontsFamily[0];
  public positionX: number;
  public positionY: number;
  public filters = EditOptions.FILTERS;
  public resetDownloadUrl: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DailogData,
    private dialog: MatDialog,
    private domSanitizer: DomSanitizer
  ) {
    this.image = data.imageData as ImageVM;
  }

  ngOnInit() {
    this.initializeData();
  }

  ngAfterViewInit() {
    if (this.myCanvas) {
      this.canvas = this.myCanvas.nativeElement as HTMLCanvasElement;
      this.createBaseImage();
    }
  }

  private initializeData() {
    this.downloadUrl = this.image.urls.regular;
    this.baseImage.src = this.image.urls.regular;
    this.baseImage.crossOrigin = 'Anonymous';
  }

  public resetBaseImage() {
    const width = 1080;
    const height = (this.image.height * 1080) / this.image.width;
    this.canvas.width = width;
    this.canvas.height = height;
    this.context?.drawImage(this.baseImage, 0, 0);
    if(this.resetDownloadUrl) {
      this.downloadUrl = this.resetDownloadUrl;
    }
    this.textTitle = '';
    this.textFontColor = EditOptions.FONTCOLOR;
    this.textFontSize = EditOptions.FONTSIZE;

  }

  private createBaseImage() {
    this.context = this.canvas.getContext('2d');
    this.baseImage.onload = () => {
      this.resetBaseImage();
      this.writeText();
    };
  }

  public writeText() {
    if (this.context) {
      this.context.textBaseline = this.textBaseline;
      if (this.textTitle.length > 3) {
        this.positionX = 100;
        this.positionY = 100;
        this.drawUpdatedCanvas(this.textTitle);
        this.drawText(this.textTitle, this.positionX, this.positionY);
      }
      this.saveEditing();
    }
  }

  public updateImageFilter(filtertype: string) {
    if (!this.context) {
      return;
    }
    this.resetBaseImage();
    let contextData = this.context.getImageData(0,0,this.canvas.width,this.canvas.height);
    contextData = Util.applyFilters(this.context, this.canvas, filtertype);

    this.context.putImageData(contextData, 0, 0);
    this.saveEditing();
  }

  private drawText(textTitle: string, positionX: number, positionY: number) {
    this.context?.fillText(textTitle, positionX, positionY);
  }

  private drawUpdatedCanvas(textTitle: string) {
    if (this.context) {
      this.context.fillStyle = this.textFontColor;
      this.context.font = this.textFontSize + 'px ' + this.selectedFont;
      this.drawText(textTitle, this.positionX, this.positionY);
      this.context.drawImage(this.baseImage, 0, 0);
    }
  }

  private saveEditing() {
    this.downloadUrl = this.canvas.toDataURL('image/jpeg');
    this.downloadUrl = this.domSanitizer.bypassSecurityTrustUrl(
      this.downloadUrl
    );
    if (!this.resetDownloadUrl) {
      this.resetDownloadUrl = this.downloadUrl;
    }
  }

  public downloadImage() {
    const link = document.createElement('a');
    link.href = this.downloadUrl;
    link.download = `edited-${this.image.alt_description}.jpg`;
    link.target = '_blank';
    link.click();
  }

  public close() {
    this.dialog.closeAll();
  }
}
