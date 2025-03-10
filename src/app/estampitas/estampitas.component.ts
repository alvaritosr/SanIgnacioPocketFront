import { Component, OnInit } from '@angular/core';
import { EstampitasService } from '../services/estampitas.service';
import { Estampitas } from '../model/estampitas';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { Puntuaciones } from '../model/puntuaciones';
import {PuntuacionesService} from "../services/puntuaciones.service";

@Component
({
  selector: 'app-estampitas',
  templateUrl: './estampitas.component.html',
  styleUrls: ['./estampitas.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ]
})

export class EstampitasComponent implements OnInit
{
  sobreAbierto: boolean = false;
  animandoSobre: boolean = false;
  sobreAnimandoIndex: number | null = null;
  todosOcultos: boolean = false;
  estampitas: Estampitas[] = [];
  currentIndex: number = 0;
  correctAnswer: boolean = false;
  disabledButtons: Set<string> = new Set();
  currentOptions: string[] = [];
  timer: number = 60;
  timerInterval: any;
  gameOver: boolean = false;
  hasWon: boolean = false;
  score: number = 0;
  playerName: string = '';
  answerSelected: boolean = false;

  constructor(private puntuacionesService: PuntuacionesService, private estampitasService: EstampitasService, private alertController: AlertController) {}

  ngOnInit()
  {
    this.presentNameAlert();

    this.estampitasService.getRandomFour().subscribe(data =>
    {
      this.estampitas = data;
      this.setOptions();
    });
  }

  async presentNameAlert()
  {
    const alert = await this.alertController.create
    ({
      header: 'Ingresa tu nombre',
      inputs:
      [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre del jugador'
        }
      ],

      buttons:
      [
        {
          text: 'Aceptar',
          handler: (data) =>
          {
            this.playerName = data.name;
          }
        }
      ]
    });

    await alert.present();
  }

  setOptions()
  {
    this.currentOptions = this.estampitas.map(estampita => estampita.nombre);
    this.currentOptions = this.shuffle(this.currentOptions);
  }

  private shuffle(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--)
    {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  selectAnswer(answer: string) {
    const correctSanto = this.estampitas[this.currentIndex]?.nombre;

    if (answer === correctSanto) {
      this.correctAnswer = true;
      this.disabledButtons.add(answer);
      this.score += 25;
      setTimeout(() => this.nextQuestion(), 500);
    } else {
      this.correctAnswer = false;
      this.score -= 5;
    }

    this.answerSelected = true;

    if (this.currentIndex === this.estampitas.length - 1 && this.correctAnswer) {
      this.hasWon = true;
      this.stopTimer();
      this.saveScore();
    }
  }

  nextQuestion() {
    if (this.currentIndex < this.estampitas.length - 1) {
      this.currentIndex++;
      this.correctAnswer = false; // Restablecer a false
      this.answerSelected = false; // Restablecer a false
    }
  }

  startTimer()
  {
    this.timerInterval = setInterval(() =>
    {
      if (this.timer > 0 && !this.gameOver)
      {
        this.timer--;
      }

      else
      {
        clearInterval(this.timerInterval);
        this.gameOver = true;
        if (this.timer === 0)
        {
          this.saveScore();
        }
      }
    }, 1000);
  }

  stopTimer()
  {
    clearInterval(this.timerInterval);
  }

  saveScore()
  {
    if (this.playerName && this.score >= 0)
    {
      const puntuaciones: Puntuaciones =
        {
        nombre: this.playerName,
        pts: this.score
      };

      this.puntuacionesService.guardar(puntuaciones).subscribe(response =>
      {
        console.log('Puntuación guardada:', response);
      });
    }
  }

  abrirSobre(index: number)
  {
    this.sobreAnimandoIndex = index;

    setTimeout(() =>
    {
      this.sobreAbierto = true;
      this.sobreAnimandoIndex = null;
      this.todosOcultos = true;
    }, 1000);

    this.startTimer();
  }

}
