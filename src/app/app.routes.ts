import { Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './message/message/message.component';
import { ContactComponent } from './contact/contact.component';
import { MessageThreadComponent } from './message-thread.component';
import { CreateListingComponent } from './create-listing/create-listing.component';

export const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'account', component: AccountComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'messages', component: MessageComponent },
  { path: 'contact/:ownerId/:postId', component: ContactComponent },
  { path: 'messages/:otherUserId/:postId', component: MessageThreadComponent },
  {
    path: 'create-listing',
    component: CreateListingComponent,
    canActivate: [authGuard],
  },
];
