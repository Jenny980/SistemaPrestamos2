import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;
  menuNav =[
    {name: "Mi cuenta", route: "cuenta", icon: "face_retouching_natural"},
    {name: "Clientes", route: "clientes", icon: "people_outline"},
    {name: "Reportes", route: "reportes", icon: "bar_chart"}
  ]

  constructor(
    private router: Router,
    media: MediaMatcher
  ) { this.mobileQuery = media.matchMedia('(max-width: 600px)');}

  ngOnInit(): void {
  }

  cerrar() {
    this.router.navigate(['/home']);
  }

}
