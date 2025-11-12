import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

Chart.register(
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale
);

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initDonutChart();
      this.initBarChart();
    }
  }

  initDonutChart() {
    const canvas = document.getElementById('circle') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Données : Validées = 10, Rejetées = 3, En cours = 4 (total = 17)
    const data = {
      labels: ['En cours', 'Validées', 'Rejetées'],
      datasets: [{
        data: [4, 10, 3],
        backgroundColor: [
          '#D3D3D3', // Gris clair pour "En cours"
          '#0A9748', // Vert (primary-color) pour "Validées"
          '#F67366'  // Rouge (secondary-color) pour "Rejetées"
        ],
        borderWidth: 0,
        cutout: '60%'
      }]
    };

    new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.0,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 15,
              font: {
                family: 'Archivo',
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed || 0;
                return label + ': ' + value + ' demandes';
              }
            }
          }
        },
        layout: {
          padding: {
            top: 20,
            bottom: 20
          }
        }
      },
      plugins: [{
        id: 'centerText',
        beforeDraw: (chart) => {
          const ctx = chart.ctx;
          const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
          const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;

          // Dessiner "Total demandes"
          ctx.save();
          ctx.font = '14px Archivo';
          ctx.fillStyle = '#9CA3AF';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('Total demandes', centerX, centerY - 15);

          // Dessiner "17" en grand
          ctx.font = 'bold 32px Archivo';
          ctx.fillStyle = '#374151';
          ctx.fillText('17', centerX, centerY + 10);
          ctx.restore();
        }
      }]
    });
  }

  initBarChart() {
    const canvas = document.getElementById('barre') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Données d'exemple proches du visuel: S1..S4
    const labels = ['S1', 'S2', 'S3', 'S4'];
    const recues = [3, 10, 7, 5];      // gris
    const valides = [2, 8, 5, 3];      // primary
    const rejetees = [0, 1, 0, 1];     // secondary

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Reçues',
            data: recues,
            backgroundColor: '#5A6573', // gris foncé pour contraste
            borderRadius: 6,
            borderSkipped: false,
            barPercentage: 0.5,
            categoryPercentage: 0.6
          },
          {
            label: 'Validées',
            data: valides,
            backgroundColor: '#0A9748', // primary
            borderRadius: 6,
            borderSkipped: false,
            barPercentage: 0.5,
            categoryPercentage: 0.6
          },
          {
            label: 'Rejetées',
            data: rejetees,
            backgroundColor: '#F67366', // secondary
            borderRadius: 6,
            borderSkipped: false,
            barPercentage: 0.5,
            categoryPercentage: 0.6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'start',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: { family: 'Archivo', size: 13 }
            }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}`
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: '#E5E7EB'
            },
            border: { display: false },
            ticks: {
              color: '#9CA3AF',
              font: { family: 'Archivo', size: 14 }
            },
            title: {
              display: true,
              text: 'Semaines',
              color: '#9CA3AF',
              font: { family: 'Archivo', size: 16, weight: 'normal' },
              padding: { top: 16 }
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#E5E7EB'
            },
            border: { display: false },
            ticks: {
              color: '#9CA3AF',
              font: { family: 'Archivo', size: 14 },
              stepSize: 2
            },
            title: {
              display: true,
              text: 'Nombres de demandes',
              color: '#9CA3AF',
              font: { family: 'Archivo', size: 16, weight: 'normal' }
            }
          }
        }
      }
    });
  }
}
