import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-suivi',
  imports: [RouterLink, BreadcrumbComponent],
  templateUrl: './suivi.html',
  styleUrl: './suivi.scss',
})
export class Suivi {

}
