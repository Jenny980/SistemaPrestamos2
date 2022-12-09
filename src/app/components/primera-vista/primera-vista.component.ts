import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-primera-vista',
  templateUrl: './primera-vista.component.html',
  styleUrls: ['./primera-vista.component.css']
})
export class PrimeraVistaComponent implements OnInit {

  idUsuario: any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
        this.idUsuario = data['id'];
        console.log(data)
    });
    console.log(this.idUsuario)
  }

}
