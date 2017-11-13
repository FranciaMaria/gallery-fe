import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';

import { LoginComponent } from '../components/auth/login/login.component';
import { RegisterComponent } from '../components/auth/register/register.component';
import { GalleriesComponent } from '../components/galleries/galleries.component';
import { GalleryDetailsComponent } from '../components/galleries/gallery-details/gallery-details.component';
import { AuthorGalleriesComponent } from '../components/galleries/author-galleries/author-galleries.component';
import { GalleryFormComponent } from '../components/galleries/gallery-form/gallery-form.component';
//import { FilterPageComponent } from '../components/filter/filter-page/filter-page.component';

const appRoutes: Routes = [
  {
    path: '',
    component: GalleriesComponent
  },
  {
  	path: 'login',
  	component: LoginComponent
  },
  {
  	path: 'register',
  	component: RegisterComponent
  },
  {
    path: 'galleries/:id',
    component: GalleryDetailsComponent
  },
  {
    path: 'authors/:id',
    component: AuthorGalleriesComponent
  },
  {
    path: 'create-gallery',
    component: GalleryFormComponent
  },
  {
    path: 'edit-gallery/:id',
    component: GalleryFormComponent
  },
  /*{
    path: 'search/:term',
    component: FilterPageComponent
  },*/
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes
      )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {



}
