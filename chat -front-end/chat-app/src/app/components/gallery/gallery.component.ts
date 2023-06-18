import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[]=[];
  galleryImages: NgxGalleryImage[]=[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { images: string[] }) { }

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '100vh',
        thumbnailsColumns: 4,
        thumbnailsRows: 3,
        thumbnailsPercent: 30,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      {
        breakpoint: 768,
        width: '100%',
        height: '100vh',
        thumbnailsColumns: 3,
        thumbnailsRows: 2,
        thumbnailsPercent: 40,
        imageAnimation: NgxGalleryAnimation.Slide
      }
    ];

    this.galleryImages = this.data.images.map((image) => {
      return {
        small: image,
        medium: image,
        big: image
      };
    });
  }

}
