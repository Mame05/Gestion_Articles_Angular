import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Routes } from '@angular/router';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';

export const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'article/:id', component: ArticleDetailComponent },
  { path: 'add', component: ArticleFormComponent },
  { path: 'edit/:id', component: ArticleFormComponent }
];

export const providers = [
    provideHttpClient(withInterceptors([]))
  ];
