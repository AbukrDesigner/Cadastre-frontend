import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-main-portail',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './main-portail.html',
  styleUrl: './main-portail.scss',
})
export class MainPortail {

}
