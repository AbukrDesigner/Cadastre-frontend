import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './forget.html',
  styleUrl: './forget.scss',
})
export class Forget {
  contactMethod: 'email' | 'phone' = 'email';

  setContactMethod(method: 'email' | 'phone'): void {
    this.contactMethod = method;
  }

  get contactLabel(): string {
    return this.contactMethod === 'email'
      ? 'Saisir votre adresse email'
      : 'Saisir votre numéro de téléphone';
  }

  get contactPlaceholder(): string {
    return this.contactMethod === 'email'
      ? 'exemple@domaine.com'
      : '770000000';
  }

  get contactInputType(): string {
    return this.contactMethod === 'email' ? 'email' : 'tel';
  }

  get contactInputMode(): string {
    return this.contactMethod === 'email' ? 'email' : 'tel';
  }

  get contactAutocomplete(): string {
    return this.contactMethod === 'email' ? 'email' : 'tel';
  }

  get contactIcon(): string {
    return this.contactMethod === 'email' ? 'bi-envelope-fill' : 'bi-telephone-fill';
  }
}
