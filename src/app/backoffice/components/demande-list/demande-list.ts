import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
@Component({
  selector: 'app-demande-list',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './demande-list.html',
  styleUrl: './demande-list.scss',
})
export class DemandeList {
	activeTab: 'encours' | 'acceptees' | 'rejetees' = 'encours';

	demandes = [
		{
			numero: 'DE-006-778',
			demandeur: 'Boubacar Baldé',
			typeReclamation: 'Foncière',
			typePropriete: 'Personnel',
			statut: 'En cours'
		},
		{
			numero: 'DE-0098-870',
			demandeur: 'Gérald charo',
			typeReclamation: 'Litiges',
			typePropriete: 'Familiale',
			statut: 'En cours'
		},
		{
			numero: 'DE-456-342',
			demandeur: 'Pavel Alméda',
			typeReclamation: 'Domaniale',
			typePropriete: 'Communautaire',
			statut: 'En cours'
		},
		{
			numero: 'DE-123-456',
			demandeur: 'Marie Dupont',
			typeReclamation: 'Foncière',
			typePropriete: 'Personnel',
			statut: 'Acceptée'
		},
		{
			numero: 'DE-789-012',
			demandeur: 'Jean Martin',
			typeReclamation: 'Litiges',
			typePropriete: 'Familiale',
			statut: 'Acceptée'
		},
		{
			numero: 'DE-345-678',
			demandeur: 'Sophie Bernard',
			typeReclamation: 'Domaniale',
			typePropriete: 'Communautaire',
			statut: 'Acceptée'
		},
		{
			numero: 'DE-901-234',
			demandeur: 'Pierre Durand',
			typeReclamation: 'Foncière',
			typePropriete: 'Personnel',
			statut: 'Rejetée'
		},
		{
			numero: 'DE-567-890',
			demandeur: 'Lucie Moreau',
			typeReclamation: 'Litiges',
			typePropriete: 'Familiale',
			statut: 'Rejetée'
		}
	];

	get filteredDemandes() {
		if (this.activeTab === 'encours') {
			return this.demandes.filter(d => d.statut === 'En cours');
		}
		if (this.activeTab === 'acceptees') {
			return this.demandes.filter(d => d.statut === 'Acceptée');
		}
		return this.demandes.filter(d => d.statut === 'Rejetée');
	}

	setActive(tab: 'encours' | 'acceptees' | 'rejetees') {
		this.activeTab = tab;
	}

}
