import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { AuthService } from '../../services/auth/auth.service';
import { Gallery } from '../../models/gallery';

@Injectable()
export class GalleryService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAll() {
  	return new Observable((o: Observer<any>) => {
  		this.http.get('http://localhost:8000/api/all-galleries')
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

  show(id) {
    return new Observable((o: Observer<any>) => {
      this.http.get('http://localhost:8000/api/galleries/'+id)
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

  getAuthorGalleries(id) {
    return new Observable((o: Observer<any>) => {
      this.http.get('http://localhost:8000/api/authors/'+id)
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

  submitGallery(gallery, userId) {
    return new Observable((o: Observer<any>) => {
      this.http.post('http://localhost:8000/api/create', {
        'name': gallery.name,
        'description': gallery.description,
        'user_id': userId
      },
        {
          headers: this.authService.getRequestHeaders(),
      }).subscribe((data) => {
        o.next(data);
        return o.complete();
      }, (err) => {
            return o.error(err);
          }
        );
    });
  }

  removeGallery(id) {
    return new Observable((o: Observer<any>) => {
      this.http.delete('http://localhost:8000/api/gallery/'+id, {
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


  public search($term){
    let galleries: Gallery [] = [];
    return new Observable((o: Observer<any>) =>{
      this.http.get('http://localhost:8000/api/all-galleries')
        .subscribe(
          (galleries: any[]) => {
            galleries.forEach(gallery => {
        if(gallery.name.match($term) || gallery.description.match($term) || gallery.user().name.match($term)){
          galleries.push(gallery);
        }
        else{
          return "No match!";
        }
      });
      o.next(galleries);
      o.complete();
    });
   });
}

}