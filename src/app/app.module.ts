import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { PostComponent } from './components/user/post/post.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ProcessingComponent } from './components/helper/processing/processing.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CreatePostComponent } from './components/user/post/create-post/create-post.component';
import { AlertComponent } from './components/helper/alert/alert/alert.component';
import { PostDetailComponent } from './components/user/post/post-detail/post-detail.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { CounterBoxComponent } from './components/helper/counter-box/counter-box.component';
import { EditPostComponent } from './components/user/post/edit-post/edit-post.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { CommentsComponent } from './components/user/post/comments/comments.component';
import { PostCommentComponent } from './components/user/post/comments/post-comment/post-comment.component';
import { PostSearchPipe } from './pipes/post-search.pipe';
import { FavoriteComponent } from './components/helper/favorite/favorite.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FavoritePostsComponent } from './components/user/favorite-posts/favorite-posts.component';
import { PaginationComponent } from './components/helper/pagination/pagination.component';
import { PaginationLoaderComponent } from './components/helper/pagination/pagination-loader/pagination-loader.component';
import { PostItemComponent } from './components/user/post/post-item/post-item.component';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { NavigationToggleDirective } from './directives/navigation-toggle.directive';

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
    DropdownDirective,
    NavigationToggleDirective,
    CommentsComponent,
    PostCommentComponent,
    PostSearchPipe,
    FavoriteComponent,
    FavoritePostsComponent,
    PaginationComponent,
    PaginationLoaderComponent,
    PostItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
