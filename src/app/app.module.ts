import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { ProfileComponent } from './components/profile/profile.component';
import { CounterBoxComponent } from './components/helper/counter-box/counter-box.component';
import { EditPostComponent } from './components/post/edit-post/edit-post.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    PostComponent,
    DashboardComponent,
    ProcessingComponent,
    PageNotFoundComponent,
    CreatePostComponent,
    AlertComponent,
    PostDetailComponent,
    ProfileComponent,
    CounterBoxComponent,
    EditPostComponent,
    SignupComponent,
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
