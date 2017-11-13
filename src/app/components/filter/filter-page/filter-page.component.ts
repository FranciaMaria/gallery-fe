import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryService } from '../../../shared/services/gallery/gallery.service';
import { Gallery } from '../../../shared/models/gallery';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.css']
})
export class FilterPageComponent implements OnInit {

   private galleries: Gallery[] = [];
  private term;

  constructor(private route: ActivatedRoute, private galleryService: GalleryService) { }

  ngOnInit() {
  	let term = this.route.snapshot.paramMap.get('term');
  	this.galleryService.search(term).subscribe(data =>{
  		this.galleries = data;
  		this.term = term;
  	});
	}

}
