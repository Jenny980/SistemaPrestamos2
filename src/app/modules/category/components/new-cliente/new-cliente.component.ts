import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteService } from 'src/app/modules/shared/services/cliente.service';

@Component({
  selector: 'app-new-cliente',
  templateUrl: './new-cliente.component.html',
  styleUrls: ['./new-cliente.component.css']
})
export class NewClienteComponent implements OnInit {

  public clienteForm: FormGroup;
  estadoFormulario: string ="";
  constructor(private fb: FormBuilder, private clienteService: ClienteService,
    private dialogRef: MatDialogRef<NewClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.estadoFormulario = "Agregar";
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cc: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      barrio: ['', Validators.required]
    });

    if(data != null){
      this.updateForm(data);
      this.estadoFormulario = "Actualizar";
    }
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

    if(this.data != null){
      //update cliente
      this.clienteService.updateClientes(data, this.data.id)
        .subscribe((data: any) =>{
          this.dialogRef.close(1);
        }, (error: any) =>{
          this.dialogRef.close(2)
        })
    } else {
      //crear nuevo cliente
      this.clienteService.postClientes(data)
      .subscribe((data: any) => {
        console.log(data);
        this.dialogRef.close(1);
      }, (error: any) => {
        this.dialogRef.close(2);
      })
    }

    
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  updateForm(data: any){
    this.clienteForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      apellido: [data.apellido, Validators.required],
      cc: [data.cc, Validators.required],
      telefono: [data.telefono, Validators.required],
      direccion: [data.direccion, Validators.required],
      barrio: [data.barrio, Validators.required]
    });
  }

}
