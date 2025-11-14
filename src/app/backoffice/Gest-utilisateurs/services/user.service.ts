import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Utilisateur {
	Prenom: string;
	Nom: string;
	Email: string;
	Telephone: string;
	Datecreation: string;
	actif: boolean;
}

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private utilisateursSubject = new BehaviorSubject<Utilisateur[]>(this.getInitialUsers());
	public utilisateurs$: Observable<Utilisateur[]> = this.utilisateursSubject.asObservable();

	constructor() {}

	// Obtenir les utilisateurs initiaux
	private getInitialUsers(): Utilisateur[] {
		return [
			{
				Prenom: 'Amadou',
				Nom: 'Ndiaye',
				Email: 'amadou.ndiaye@example.com',
				Telephone: '77 123 45 67',
				Datecreation: '2024-01-15',
				actif: true
			},
			{
				Prenom: 'Fatou',
				Nom: 'Diallo',
				Email: 'fatou.diallo@example.com',
				Telephone: '78 234 56 78',
				Datecreation: '2024-02-20',
				actif: true
			},
			{
				Prenom: 'Moussa',
				Nom: 'Fall',
				Email: 'moussa.fall@example.com',
				Telephone: '76 345 67 89',
				Datecreation: '2024-03-10',
				actif: false
			},
			{
				Prenom: 'Aissatou',
				Nom: 'Ba',
				Email: 'aissatou.ba@example.com',
				Telephone: '70 456 78 90',
				Datecreation: '2024-01-25',
				actif: true
			},
			{
				Prenom: 'Ousmane',
				Nom: 'Sow',
				Email: 'ousmane.sow@example.com',
				Telephone: '77 567 89 01',
				Datecreation: '2024-02-05',
				actif: true
			}
		];
	}

	// Obtenir tous les utilisateurs
	getUtilisateurs(): Utilisateur[] {
		return this.utilisateursSubject.value;
	}

	// Obtenir un utilisateur par email
	getUtilisateurByEmail(email: string): Utilisateur | undefined {
		return this.utilisateursSubject.value.find(u => u.Email === email);
	}

	// Mettre à jour l'état actif d'un utilisateur
	toggleUserStatus(email: string): void {
		const utilisateurs = [...this.utilisateursSubject.value];
		const index = utilisateurs.findIndex(u => u.Email === email);
		
		if (index > -1) {
			utilisateurs[index].actif = !utilisateurs[index].actif;
			this.utilisateursSubject.next(utilisateurs);
		}
	}

	// Mettre à jour les utilisateurs
	updateUtilisateurs(utilisateurs: Utilisateur[]): void {
		this.utilisateursSubject.next(utilisateurs);
	}

	// Mettre à jour un utilisateur spécifique
	updateUtilisateur(email: string, updatedUser: Partial<Utilisateur>): void {
		const utilisateurs = [...this.utilisateursSubject.value];
		const index = utilisateurs.findIndex(u => u.Email === email);
		
		if (index > -1) {
			// Préserver uniquement la date de création (non modifiable)
			utilisateurs[index] = {
				...utilisateurs[index],
				...updatedUser,
				Datecreation: utilisateurs[index].Datecreation // La date de création ne peut pas être modifiée
			};
			this.utilisateursSubject.next(utilisateurs);
		}
	}
}

