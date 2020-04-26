import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingFeedbackComponent } from './loading-feedback/loading-feedback.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    LoadingFeedbackComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    LoadingFeedbackComponent
  ]
})
export class ComponentsModule { }
