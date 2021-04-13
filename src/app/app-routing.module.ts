import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { AuthGuard } from './guards/auth.guard';
import { PostComponent } from './components/user/post/post.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CreatePostComponent } from './components/user/post/create-post/create-post.component';
import { PostDetailComponent } from './components/user/post/post-detail/post-detail.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { EditPostComponent } from './components/user/post/edit-post/edit-post.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FavoritePostsComponent } from './components/user/favorite-posts/favorite-posts.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'posts',
    component: PostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'favorite-posts',
    component: FavoritePostsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'post-detail/:id',
    component: PostDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-post',
    component: CreatePostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-post/:id',
    component: EditPostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
