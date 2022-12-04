import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primera-vista',
  templateUrl: './primera-vista.component.html',
  styleUrls: ['./primera-vista.component.css']
})
export class PrimeraVistaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  irLogin() {
    this.router.navigate(['/login']);
  }

  irRegistro() {
    this.router.navigate(['/registro']);
  }

}
