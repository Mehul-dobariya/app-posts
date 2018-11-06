import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post.component';

const routes:Routes = [
    {path: '', component: PostComponent},
    {path: 'manage/:postId', loadChildren: './manage/manage.module#ManageModule'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostRoutingModule {
    static components = [PostComponent];
}
