import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CommentService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getComments(id) {
  	return new Observable((o: Observer<any>) => {
      this.http.get('http://localhost:8000/api/comments/'+id)
        .subscribe(
          (data) => {
            o.next(data);
            return o.complete();
          },
          (err) => {
            return o.error(err);
          }
        );
    });
  }

  addComment(text, userId, galleryId) {
    return new Observable((o: Observer<any>) => {
      this.http.post('http://localhost:8000/api/comments', {
        'text': text,
        'gallery_id': galleryId,
        'author_id': userId,
      },
      {
        headers: this.authService.getRequestHeaders(),
      })
        .subscribe(
          (data) => {
            o.next(data);
            return o.complete();
          },
          (err) => {
            return o.error(err);
          }
        );
    });
  }

  removeComment(id) {
    return new Observable((o: Observer<any>) => {
      this.http.delete('http://localhost:8000/api/comments/'+id, {
        headers: this.authService.getRequestHeaders(),
      })
        .subscribe(
          (data) => {
            o.next(data);
            return o.complete();
          },
          (err) => {
            return o.error(err);
          }
        );
    });
  }

}
