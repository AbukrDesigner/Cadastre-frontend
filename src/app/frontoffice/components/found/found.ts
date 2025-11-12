import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-found',
  imports: [RouterLink, MatStepperModule, BreadcrumbComponent],
  templateUrl: './found.html',
  styleUrl: './found.scss',
})
export class Found {

}
