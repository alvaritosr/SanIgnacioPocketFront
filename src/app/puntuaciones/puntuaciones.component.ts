import { Component, OnInit } from '@angular/core';
import { PuntuacionesService } from '../services/puntuaciones.service';
import {Puntuaciones} from "../model/puntuaciones";
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";

@Component
({
  selector: 'app-puntuaciones',
  templateUrl: './puntuaciones.component.html',
  styleUrls: ['./puntuaciones.component.scss'],
  imports: [
    IonicModule,
    NgForOf
  ],
  standalone: true
})

export class PuntuacionesComponent implements OnInit
{
  puntuaciones: Puntuaciones[] = [];

  constructor(private puntuacionesService: PuntuacionesService) { }

  ngOnInit()
  {
    this.puntuacionesService.getAll().subscribe((data: Puntuaciones[]) =>
    {
      this.puntuaciones = data;
    });
  }
}
