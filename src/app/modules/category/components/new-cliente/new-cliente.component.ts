import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from 'src/app/modules/shared/services/cliente.service';

@Component({
  selector: 'app-new-cliente',
  templateUrl: './new-cliente.component.html',
  styleUrls: ['./new-cliente.component.css']
})
export class NewClienteComponent implements OnInit {

  public clienteForm: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: ClienteService,
    private dialogRef: MatDialogRef<NewClienteComponent>) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cc: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      barrio: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  onSave(){

    let data = {
      nombre: this.clienteForm.get('nombre')?.value,
      apellido: this.clienteForm.get('apellido')?.value,
      cc: this.clienteForm.get('cc')?.value,
      telefono: this.clienteForm.get('telefono')?.value,
      direccion: this.clienteForm.get('direccion')?.value,
      barrio: this.clienteForm.get('barrio')?.value,
    }

    this.clienteService.postClientes(data)
      .subscribe((data: any) => {
        console.log(data);
        this.dialogRef.close(1);
      }, (error: any) => {
        this.dialogRef.close(2);
      })
  }

  onCancel(){
    this.dialogRef.close(3);
  }

}
