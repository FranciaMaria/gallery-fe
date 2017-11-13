import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorGalleriesComponent } from './author-galleries.component';

describe('AuthorGalleriesComponent', () => {
  let component: AuthorGalleriesComponent;
  let fixture: ComponentFixture<AuthorGalleriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorGalleriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorGalleriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
