import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from '../../../shared/services/auth/auth.service';
import { GalleryService } from '../../../shared/services/gallery/gallery.service';

import { Gallery } from '../../../shared/models/gallery';
import { Image } from '../../../shared/models/image';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-gallery-form',
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.css']
})
export class GalleryFormComponent implements OnInit {

  gallery = new Gallery();
  user: User;

  constructor(
  	private galleryService: GalleryService,
    private authService: AuthService,
  	private route: ActivatedRoute,
  	private router: Router
  ) { }

  ngOnInit() {
  	this.gallery.images = [];
  	this.user = this.authService.getUser();
  	if (this.route.snapshot.params['id']) {
  	  this.galleryService.show(this.route.snapshot.params['id'])
  		.subscribe(
  			(data) => {
  				if (this.user.id != data.user.id) {
  					this.router.navigateByUrl('/');
  				}
  				this.gallery.id = data.id;
  				this.gallery.name = data.name;
  				this.gallery.description = data.description;
  				this.gallery.images = data.images;
	            this.gallery.user = this.user;
	            this.gallery.time = data.created_at;
  			},
  			(err) => {
  				alert('Error: ' + err);
  			}
  		);
  	} else {
  		this.gallery.images.push(new Image());
  	}
  }

  addImage() {
  	this.gallery.images.push(new Image());
  }

  removeImage(index) {
  	let removed = this.gallery.images.splice(index, 1);
  }

  moveImage(index, move) {
  	let removed = this.gallery.images.splice(index, 1);
  	let added = this.gallery.images.splice(index + move, 0, removed[0]);
  }

  submitGallery() {
    console.log(this.gallery);
    this.galleryService.submitGallery(
      this.gallery, 
      this.user.id,
      //this.gallery.images
    ).subscribe(
      () => {
        this.router.navigateByUrl('authors/' + this.user.id);
      }, (err: HttpErrorResponse) => {
        alert(`${err.error.message}`);
      }
    );
    this.gallery = new Gallery();
  }

}
