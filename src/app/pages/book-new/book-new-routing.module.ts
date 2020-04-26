import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookNewPage } from './book-new.page';

const routes: Routes = [
  {
    path: '',
    component: BookNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookNewPageRoutingModule {}
