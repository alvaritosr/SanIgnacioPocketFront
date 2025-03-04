import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {IonicModule} from "@ionic/angular";

@Component
({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    RouterLink,
    IonicModule
  ],
  standalone: true
})

export class HomePage implements OnInit
{
  constructor(private router: Router) { }

  ngOnInit() { }

  aJugar()
  {
    this.router.navigate(['/sobres']);
  }
}
