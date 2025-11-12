import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, MatCheckboxModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  togglePassword(inputId: string, iconId: string) {
    const passwordInput = document.getElementById(inputId) as HTMLInputElement | null;
    const eyeIcon = document.getElementById(iconId);

    if (!passwordInput || !eyeIcon) {
      return;
    }

    const isHidden = passwordInput.type === 'password';
    passwordInput.type = isHidden ? 'text' : 'password';
    eyeIcon.classList.toggle('bi-eye', !isHidden);
    eyeIcon.classList.toggle('bi-eye-slash', isHidden);
  }
}
