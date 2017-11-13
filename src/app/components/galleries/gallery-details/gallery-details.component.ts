import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";

import { AuthService } from '../../../shared/services/auth/auth.service';
import { GalleryService } from '../../../shared/services/gallery/gallery.service';
import { CommentService } from '../../../shared/services/comment/comment.service';

import { Gallery } from '../../../shared/models/gallery';
import { Image } from '../../../shared/models/image';
import { User } from '../../../shared/models/user';
import { Comment } from '../../../shared/models/comment';

@Component({
  selector: 'app-gallery-details',
  templateUrl: './gallery-details.component.html',
  styleUrls: ['./gallery-details.component.css']
})
export class GalleryDetailsComponent implements OnInit {

	gallery = new Gallery();
  user: User;
  activeImage = 0;
  comments: Array<Comment> = [];
  newComment: string = '';

  constructor(
  	private galleryService: GalleryService,
    private authService: AuthService,
    private commentService: CommentService,
  	private route: ActivatedRoute
  ) { }

  ngOnInit() {
  	this.galleryService.show(this.route.snapshot.params['id'])
  		.subscribe(
  			(data) => {
  				this.gallery.id = data.id;
  				this.gallery.name = data.name;
  				this.gallery.description = data.description;
  				this.gallery.images = data.images;
          this.gallery.user = new User(data.user.id, data.user.first_name, data.user.last_name, data.user.email);
          this.gallery.time = data.created_at;
          this.user = this.authService.getUser();
  			},
  			(err) => {
  				alert('Error: ' + err);
  			}
  		);
    this.getComments();
  }

  changeImage(value) {
    if (this.activeImage + value < 0) this.activeImage = this.gallery.images.length -1;
    else if (this.activeImage + value == this.gallery.images.length) this.activeImage = 0;
    else this.activeImage = (this.activeImage + value) % this.gallery.images.length;
  }

  openImage(url) {
    window.open(url, '_blank');
  }

  getComments() {
    this.comments = [];
    this.commentService.getComments(this.route.snapshot.params['id'])
      .subscribe(
        (data) => {
          for (let comment of data) {
            let c = new Comment();
            c['id'] = comment.id;
            c['text'] = comment.text;
            c['galleryId'] = comment.gallery_id;
            c['authorId'] = comment.author_id;
            c['time'] = comment.created_at;
            c['user'] = new User(comment.user.id, comment.user.first_name, comment.user.last_name, comment.user.email);
            this.comments.push(c);
          }
        },
        (err) => {
          alert(`${err.error.message}`);
        }
      );
  }

  addComment() {
    this.commentService.addComment(this.newComment, this.user.id, this.gallery.id)
      .subscribe(
        (data) => {
          this.getComments();
          this.newComment = '';
        },
        (err) => {
          alert(`${err.error.message}`);
        }
        );
  }

  removeComment(id) {

    let check = confirm('Please confirm to delete the comment.');

    if (check) {
      this.commentService.removeComment(id)
        .subscribe(
          (data) => {
            this.getComments();
          },
          (err) => {
            alert(`${err.error.message}`);
          }
        );
    }
  }

}
