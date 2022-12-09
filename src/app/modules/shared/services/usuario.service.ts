import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarioByEmailAndPass(email: any){
    const endPoint = `${base_url}/usuarios/filter/${email}`;
    return this.http.get(endPoint);
  }
}
