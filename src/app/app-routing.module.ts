import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full'
  },
  {
    path: 'books',
    loadChildren: () => import('./pages/book-list/book-list.module').then( m => m.BookListPageModule)
  },
  {
    path: 'books/new',
    pathMatch: 'full',
    loadChildren: () => import('./pages/book-new/book-new.module').then( m => m.BookNewPageModule)
  },
  {
    path: 'books/:id',
    loadChildren: () => import('./pages/book-details/book-details.module').then( m => m.BookDetailsPageModule)
  },
  {
    path: '**',
    redirectTo: 'books'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
