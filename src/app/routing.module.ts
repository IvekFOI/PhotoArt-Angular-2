import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  { path: '', redirectTo: '/arts', pathMatch: 'full'},
  { path: '', loadChildren: () => import('./arts/arts.module').then(m => m.ArtsModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
