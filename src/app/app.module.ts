import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { AuthService } from './shared/services/auth/auth.service';
import { GalleryService } from './shared/services/gallery/gallery.service';
import { CommentService } from './shared/services/comment/comment.service';

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';

import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { GalleriesComponent } from './components/galleries/galleries.component';
import { GalleryDetailsComponent } from './components/galleries/gallery-details/gallery-details.component';
import { AuthorGalleriesComponent } from './components/galleries/author-galleries/author-galleries.component';
import { GalleryFormComponent } from './components/galleries/gallery-form/gallery-form.component';
//import { FilterComponent } from './components/filter/filter.component';
//import { FilterPageComponent } from './components/filter/filter-page/filter-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    GalleriesComponent,
    GalleryDetailsComponent,
    AuthorGalleriesComponent,
    GalleryFormComponent,
    //FilterComponent,
    //FilterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CustomFormsModule
  ],
  providers: [
  	AuthService,
    GalleryService,
    CommentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
