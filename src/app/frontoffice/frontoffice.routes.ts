import { Routes } from "@angular/router";
import { Portail } from "./components/portail/portail";
import { MainPortail } from "../shared/layouts/main-portail/main-portail";
import { MainGuest } from "../shared/layouts/main-guest/main-guest";
import { Depose } from "./components/depose/depose";
import { title } from "process";
import { Suivi } from "./components/suivi/suivi";
import { Found } from "./components/found/found";

export const FRONTOFFICE_ROUTES:Routes =[
    {
        path: '',
        component: MainPortail,
        children: [
            {
                path: '',
                redirectTo: 'portail',
                pathMatch: 'full'
            },
            {
                path: 'portail',
                component: Portail
            },
           
        ],
    },
    {
        path:'',
        component: MainGuest,
        children:[  
            {
                path:'depose',
                component: Depose,
                data:{
                    title:'Demande une demande de reclamation',
                }
            },
            {
                path:'suivi',
                component: Suivi,
                data:{
                    title:'suivre sa demande'
                }
            },
            {
                path:'found',
                component: Found,
                data:{
                    title:'Demande trouvée'
                }
            }
        ]
    }
]