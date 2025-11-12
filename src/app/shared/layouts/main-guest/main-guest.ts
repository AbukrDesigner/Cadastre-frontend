import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';
import { FooterGuest } from '../../components/footer-guest/footer-guest';

@Component({
  selector: 'app-main-guest',
  standalone: true,
  imports: [RouterOutlet, Header, FooterGuest],
  templateUrl: './main-guest.html',
  styleUrl: './main-guest.scss',
})
export class MainGuest {

}
