import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
    imports:[
        MatInputModule,
        MatButtonModule,
        MatExpansionModule,
        MatToolbarModule,
        MatCardModule,
        MatSelectModule,
        MatDividerModule,
        MatTableModule,
        MatDialogModule,
        MatGridListModule
    ],
    exports:[
        MatInputModule,
        MatButtonModule,
        MatExpansionModule,
        MatToolbarModule,
        MatCardModule,
        MatSelectModule,
        MatDividerModule,
        MatTableModule,
        MatDialogModule,
        MatGridListModule
    ]
})

export class MaterialModule{}