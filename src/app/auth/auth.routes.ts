import { Routes } from "@angular/router";
import { Log } from "../shared/layouts/log/log";
import { Login } from "./pages/login/login";
import { Reset } from "./pages/reset/reset";
import { Forget } from "./pages/forget/forget";
import { Otp } from "./pages/otp/otp";
import { title } from "process";

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        component: Log,
        children: [
            
            {
                path: '',
                component: Login,
                data: { title: 'Connexion' }
            },
            {
                path: 'reset',
                component: Reset,
                data: { title: 'Reinitialisation' }
            },
            {
                path: 'forget',
                component: Forget,
                data: { title: 'Mot de passe oublie' }
            },
            {
                path:'otp',
                component: Otp,
                data:{title:'Message otp'}
            }
        ]
    }
];