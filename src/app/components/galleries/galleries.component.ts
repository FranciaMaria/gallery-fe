import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { GalleryService } from '../../shared/services/gallery/gallery.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Gallery } from '../../shared/models/gallery';
import { Image } from '../../shared/models/image';
import { User } from '../../shared/models/user';


@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.css']
})
export class GalleriesComponent implements OnInit {

	galleries: Array<Gallery> = [];
  allGalleries: Array<Gallery> = [];
  length: number = 0;
  user: User;

  constructor(
  	private galleryService: GalleryService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  	this.galleryService.getAll()
  		.subscribe(
  			(data) => {
  				for (let gallery of data) {
  					let gal = new Gallery();
  					gal.id = gallery.id;
  					gal.name = gallery.name;
  					gal.description = gallery.description;
  					gal.images = gallery.images;
            gal.user = new User(gallery.user.id, gallery.user.first_name, gallery.user.last_name, gallery.user.email);
  					this.allGalleries.push(gal);
  				}
          this.user = this.authService.getUser();
          this.loadMore();
  			},
  			(err) => {
  				alert(`${err.error.message}`);
  			}
  		);
  }

  loadMore() {
    for (let i = this.length; i < this.length + 9; i++) {
      if (this.allGalleries[i]) {
          this.galleries.push(this.allGalleries[i]);
        }
      }
    this.length += 9;
  }
    
}
