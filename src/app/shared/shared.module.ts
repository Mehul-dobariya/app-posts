import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MaterializeModule } from 'angular2-materialize';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatTableModule, MatPaginatorModule, MatSortModule, MaterializeModule],
    exports: [CommonModule, FormsModule, ReactiveFormsModule, MatTableModule, MatPaginatorModule, MatSortModule, MaterializeModule],
    declarations: []
})
export class SharedModule {
}
