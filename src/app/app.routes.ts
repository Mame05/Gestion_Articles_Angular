import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Routes } from '@angular/router';

export const routes: Routes = [];

export const providers = [
    provideHttpClient(withInterceptors([]))
  ];
