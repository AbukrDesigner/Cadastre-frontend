import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject, filter, takeUntil } from 'rxjs';
import { UserService, Utilisateur } from '../services/user.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.scss',
})
export class EditUser implements OnInit, OnDestroy {
	currentTitle = 'Modifier un utilisateur';
	utilisateur: Utilisateur | null = null;
	private destroy$ = new Subject<void>();

	// Formulaire
	formData = {
		Prenom: '',
		Nom: '',
		Email: '',
		Telephone: ''
	};

	constructor(
		private route: ActivatedRoute,
		public router: Router,
		private userService: UserService
	) {}

	ngOnInit() {
		this.updateTitle(this.route);
		this.router.events
			.pipe(
				filter((e): e is NavigationEnd => e instanceof NavigationEnd),
				takeUntil(this.destroy$)
			)
			.subscribe(() => {
				this.updateTitle(this.route);
			});

		// Récupérer l'email depuis les paramètres de route
		this.route.params
			.pipe(takeUntil(this.destroy$))
			.subscribe(params => {
				const email = decodeURIComponent(params['id']);
				this.loadUtilisateur(email);
			});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private updateTitle(route: ActivatedRoute): void {
		let currentRoute: ActivatedRoute | null = route;
		while (currentRoute?.firstChild) {
			currentRoute = currentRoute.firstChild;
		}
		const title = currentRoute?.snapshot.data?.['title'] as string | undefined;
		this.currentTitle = title ?? 'Modifier un utilisateur';
	}

	loadUtilisateur(email: string) {
		const user = this.userService.getUtilisateurByEmail(email);
		if (!user) {
			// Si l'utilisateur n'existe pas, rediriger vers la liste
			this.router.navigate(['/backoffice/users']);
			return;
		}
		this.utilisateur = user;
		// Pré-remplir le formulaire
		this.formData = {
			Prenom: user.Prenom,
			Nom: user.Nom,
			Email: user.Email,
			Telephone: user.Telephone
		};
	}

	enregistrer() {
		if (!this.utilisateur) return;

		// Valider le formulaire
		if (!this.formData.Prenom || !this.formData.Nom || !this.formData.Email || !this.formData.Telephone) {
			Swal.fire({
				title: 'Erreur',
				text: 'Veuillez remplir tous les champs',
				icon: 'error',
				confirmButtonColor: '#0A9748'
			});
			return;
		}

		// Valider le format de l'email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(this.formData.Email)) {
			Swal.fire({
				title: 'Erreur',
				text: 'Veuillez saisir un email valide',
				icon: 'error',
				confirmButtonColor: '#0A9748'
			});
			return;
		}

		// Vérifier si l'email a changé et s'il existe déjà (sauf si c'est le même utilisateur)
		const oldEmail = this.utilisateur.Email;
		if (this.formData.Email !== oldEmail) {
			const existingUser = this.userService.getUtilisateurByEmail(this.formData.Email);
			if (existingUser && existingUser.Email !== oldEmail) {
				Swal.fire({
					title: 'Erreur',
					text: 'Cet email est déjà utilisé par un autre utilisateur',
					icon: 'error',
					confirmButtonColor: '#0A9748'
				});
				return;
			}
		}

		// Mettre à jour l'utilisateur via le service (utiliser l'ancien email pour trouver l'utilisateur)
		this.userService.updateUtilisateur(oldEmail, {
			Prenom: this.formData.Prenom,
			Nom: this.formData.Nom,
			Email: this.formData.Email,
			Telephone: this.formData.Telephone
		});

		// Message de succès
		Swal.fire({
			title: 'Succès',
			text: `L'utilisateur ${this.formData.Prenom} ${this.formData.Nom} a été modifié avec succès`,
			icon: 'success',
			confirmButtonColor: '#0A9748',
			timer: 2000,
			showConfirmButton: false
		}).then(() => {
			// Rediriger vers la liste des utilisateurs
			this.router.navigate(['/backoffice/users']);
		});
	}

	annuler() {
		this.router.navigate(['/backoffice/users']);
	}
}
