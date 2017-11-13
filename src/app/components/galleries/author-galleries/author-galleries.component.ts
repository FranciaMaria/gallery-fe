import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";

import { AuthService } from '../../../shared/services/auth/auth.service';
import { GalleryService } from '../../../shared/services/gallery/gallery.service';
import { Gallery } from '../../../shared/models/gallery';
import { Image } from '../../../shared/models/image';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-author-galleries',
  templateUrl: './author-galleries.component.html',
  styleUrls: ['./author-galleries.component.css']
})
export class AuthorGalleriesComponent implements OnInit {

	galleries: Array<Gallery> = [];
  user: User;

  constructor(
  	private galleryService: GalleryService,
    private authService: AuthService,
  	private route: ActivatedRoute
  ) { }

  ngOnInit() {
  	this.galleryService.getAuthorGalleries(this.route.snapshot.params['id'])
  		.subscribe(
  			(data) => {
  				for (let gallery of data) {
  					let gal = new Gallery();
  					gal.id = gallery.id;
  					gal.name = gallery.name;
  					gal.description = gallery.description;
  					gal.images = gallery.images;
            gal.user = new User(gallery.user.id, gallery.user.first_name, gallery.user.last_name, gallery.user.email);
  					this.galleries.push(gal);
  				}
          this.user = this.authService.getUser();
  			},
  			(err) => {
  				alert('Error: ' + err);
  			}
  		);
  }

  removeGallery(id) {

    let check = confirm('Please confirm to delete the gallery.');

    if (check) {
      this.galleryService.removeGallery(id)
        .subscribe(
          (data) => {
            this.galleryService.getAll();
          },
          (err) => {
            alert(`${err.error.message}`);
          }
        );
    }
  }

}
