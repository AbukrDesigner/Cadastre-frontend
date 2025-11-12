import { Routes } from "@angular/router";
import { Dashboard } from "./components/dashboard/dashboard";
import { DemandeList } from "./components/demande-list/demande-list";
import { Sidebar } from "../shared/layouts/sidebar/sidebar";
import { title } from "process";
import { DemandeEncours } from "./components/demande-encours/demande-encours";
import { DemandeDetail } from "./components/demande-detail/demande-detail";

export const BACKOFFICE_ROUTES: Routes =[
    {
        path:'',
        component: Sidebar,
        children: [
            {
                path:'',
                component: Dashboard,
                data:{title:'Tableau de bord'}
            },
            {
                path: 'demandes',
                component: DemandeList,
                data:{title:'liste des demandes'}
            },
            {
                path:'encours',
                component: DemandeEncours,
                data:{title:'Liste des demandes en cours'}
            },
            {
                path:'detail/:id',
                component: DemandeDetail,
                data:{title:'detail d\'une demande demande'}
            }
        ]
    }
]