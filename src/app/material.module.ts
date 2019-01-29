import {NgModule} from "@angular/core";
import {MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule} from "@angular/material";

@NgModule({
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
    ],
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
    ]

})

export class MaterialModule { }