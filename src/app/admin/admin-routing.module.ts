import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { SearchComponent } from "./search/search.component";
import { AuditoriaComponent } from "../auditoria/auditoria.component";



const routes : Routes = [
    {
        path:'/auditory',
        component: AuditoriaComponent
    },
    {
        path: 'search',
        component: SearchComponent
    }
]

@NgModule({
    imports: [SharedModule, RouterModule.forChild(routes)],
    declarations: [],
    exports: [RouterModule]
})
export default class AdminModule { }