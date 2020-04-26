import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookNewPageRoutingModule } from './book-new-routing.module';

import { BookNewPage } from './book-new.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookNewPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [BookNewPage]
})
export class BookNewPageModule {}
