import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modals.html',
  styleUrl: './modals.scss',
})
export class Modals {
  constructor(private route: Router){}
  SendData(){
    Swal.fire({
      icon:'success',
      text:'Ejection reussi avec succès.',
      showConfirmButton: false,
      timer: 3000,
    })
    // this.route.navigate(['/backoffice/imputations']);

    }
    showDgidTag = true;
    procedureUrgence: string = '';
    commentaire: string = '';
  
    removeTag(tagName: string) {
      if (tagName === 'DGID') {
        this.showDgidTag = false;
      }
    }
}
 

