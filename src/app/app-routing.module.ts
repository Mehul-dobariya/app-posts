import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes:Routes = [
    {path: '', loadChildren: './post/post.module#PostModule'},
    {path: '**', pathMatch: 'full', redirectTo: '/'} // catch any unfound routes and redirect to home page
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
