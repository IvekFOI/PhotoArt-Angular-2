import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AddArtComponent } from './add-art/add-art.component';
import { ArtDetailComponent } from './art-detail/art-detail.component';
import { ArtListComponent } from './art-list/art-list.component';

const routes: Routes = [
  { path: 'arts', component: ArtListComponent },
  { path: 'arts/:id', component: ArtDetailComponent },
  { path: 'new', component: AddArtComponent },
]

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    AddArtComponent,
    ArtDetailComponent,
    ArtListComponent
  ]
})
export class ArtsModule {}
