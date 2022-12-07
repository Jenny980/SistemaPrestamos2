import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrestamoService } from '../../shared/services/prestamo.service';

@Component({
  selector: 'app-new-prestamo',
  templateUrl: './new-prestamo.component.html',
  styleUrls: ['./new-prestamo.component.css']
})
export class NewPrestamoComponent implements OnInit {

  public prestamoForm: FormGroup;
  estadoFormulario: string ="";
  idCliente;
  periodo = null;
  valorCuota = 0;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewPrestamoComponent>,
    private prestamoService: PrestamoService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      
      this.idCliente = data.clienteId;
      console.log(this.idCliente);
      this.estadoFormulario = "Agregar"
      this.prestamoForm = this.fb.group({
      credito: ['', Validators.required],
      porcentaje: ['', Validators.required],
      periodoPago: ['', Validators.required],
      Npagos: ['', Validators.required],
      valorCuota: ['', Validators.required],
      debe: ['', Validators.required],
      estado: ['', Validators.required],
      clienteId: ['', Validators.required]
      });

      
      if(data.credito != undefined){
        this.updateForm(data);
        this.estadoFormulario = "Actualizar"
      }
    }

  ngOnInit(): void {
    this.prestamoForm.get("clienteId")?.setValue(this.idCliente);
  }

  onSave(){
    let data = {
      credito: this.prestamoForm.get('credito')?.value,
      porcentaje: this.prestamoForm.get('porcentaje')?.value,
      periodoPago: this.prestamoForm.get('periodoPago')?.value,
      Npagos: this.prestamoForm.get('Npagos')?.value,
      valorCuota: this.prestamoForm.get('valorCuota')?.value,
      debe: this.prestamoForm.get('debe')?.value,
      estado: this.prestamoForm.get('estado')?.value,
      clienteId: this.idCliente
    }
    
    const formData = new FormData();
    formData.append('credito', data.credito);
    formData.append('porcentaje', data.porcentaje);
    formData.append('periodoPago', data.periodoPago);
    formData.append('Npagos', data.Npagos);
    formData.append('valorCuota', data.valorCuota);
    formData.append('debe', data.debe);
    formData.append('estado', data.estado);
    formData.append('clienteId', data.clienteId+"");

    if(this.data.credito != undefined){
      this.prestamoService.updatePrestamo(formData, this.data.id)
        .subscribe((data: any) => {
          this.dialogRef.close(1);
          console.log(data);
        }, (error: any) => {
          this.dialogRef.close(2);
        });
    } else {
      this.prestamoService.savePrestamo(formData)
      .subscribe((data: any) => {
        this.dialogRef.close(1);
        console.log(data);
      }, (error: any) => {
        this.dialogRef.close(2);
      });
    }
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  updateForm(data: any){
    console.log(data)
    this.prestamoForm = this.fb.group({
      credito: [data.credito, Validators.required],
      porcentaje: [data.porcentaje, Validators.required],
      periodoPago: [data.periodoPago, Validators.required],
      Npagos: [data.Npagos, Validators.required],
      valorCuota: [data.valorCuota, Validators.required],
      debe: [data.debe, Validators.required],
      estado: [data.estado, Validators.required],
      clienteId: [data.clienteId, Validators.required]
      });
  }

}