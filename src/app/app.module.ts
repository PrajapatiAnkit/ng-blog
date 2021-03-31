import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PostComponent } from './components/post/post.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ProcessingComponent } from './components/helper/processing/processing.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CreatePostComponent } from './components/post/create-post/create-post.component';
import { AlertComponent } from './components/helper/alert/alert/alert.component';
import { PostDetailComponent } from './components/post/post-detail/post-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReactiveFormComponent,
    HeaderComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductDetailComponent,
    ProductEditComponent,
    LoginComponent,
    LogoutComponent,
    PostComponent,
    DashboardComponent,
    ProcessingComponent,
    PageNotFoundComponent,
    CreatePostComponent,
    AlertComponent,
    PostDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
