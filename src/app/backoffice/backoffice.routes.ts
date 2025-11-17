import { Routes } from "@angular/router";
import { Dashboard } from "./components/dashboard/dashboard";
import { DemandeList } from "./components/demande-list/demande-list";
import { Sidebar } from "../shared/layouts/sidebar/sidebar";
import { title } from "process";

// import { DemandeDetail } from "./components/demande-detail/demande-detail";
import { GestUlisateurs } from "./Gest-utilisateurs/user-list/user-list";
import { AddUser } from "./Gest-utilisateurs/add-user/add-user";
import { UserDetail } from "./Gest-utilisateurs/user-detail/user-detail";
import { EditUser } from "./Gest-utilisateurs/edit-user/edit-user";
import { DemandeDetail } from "./components/demande-detail/demande-detail";
import { ImputationCreate } from "./imputations/components/imputation-create/imputation-create";
import { ImputationDiffusion } from "./imputations/components/imputation-diffusion/imputation-diffusion";

export const BACKOFFICE_ROUTES: Routes =[
    {
        path:'',
        component: Sidebar,
        children: [
            {
                path:'',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path:'dashboard',
                component: Dashboard,
                data:{title:'Tableau de bord'}
            },
            {
                path: 'demandes',
                component: DemandeList,
                data:{title:'liste des demandes'}
            },
            {
                path:'demande-detail/:id',
                component: DemandeDetail,
                data:{title:"Detail d'une demande"}
            },
           
            {
                path:'add-user',
                component: AddUser,
                data:{title:'Ajouter un uilisateur'}
            },
            {
                path: 'users',
                component: GestUlisateurs,
                data: { title: 'gestion utilisateurs' }
            },
            {
                path:'user-detail/:id',
                component: UserDetail,
                data:{title:'Detail d\'un utilisateur'}
            },
            {
                path:'user-edit/:id',
                component: EditUser,
                data:{title:'Modifier un utilisateur'}
            },
            {
                path:'imputation-create',
                component: ImputationCreate,
                data:{title:'Créer une imputation'},
            },
            {
                path:'imputation-diffusion',
                component: ImputationDiffusion,
                data:{
                    title:'Imputation'
                }
            }
        ]
    }
]