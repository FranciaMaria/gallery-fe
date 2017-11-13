import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

	private search: string;

  	constructor(private router: Router) { }


  	searchGallery($term) {
        this.router.navigate(['/search', this.search]);
	}

  ngOnInit() {
  }

}
