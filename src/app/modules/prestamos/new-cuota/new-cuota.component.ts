import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CuotaService } from '../../shared/services/cuota.service';

@Component({
  selector: 'app-new-cuota',
  templateUrl: './new-cuota.component.html',
  styleUrls: ['./new-cuota.component.css']
})
export class NewCuotaComponent implements OnInit {

  public cuotaForm: FormGroup;
  idCliente;
  periodo = null;
  valorCuota = 0;
  cuotaMinima;
  idPrestamo;

  constructor(private fb: FormBuilder,
    private cuotaService: CuotaService,
    private dialogRef: MatDialogRef<NewCuotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      
      this.idCliente = data.clienteId;
      this.cuotaMinima = data.valorCuota;
      this.idPrestamo = data.idPrestamo;

      this.cuotaForm = this.fb.group({
        valor: ['', Validators.required],
        prestamoId: ['', Validators.required],
        cuotaSelect: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.cuotaForm.get("prestamoId")?.setValue(this.idPrestamo);
    this.cuotaForm.get("cuotaSelect")?.setValue("minima");
    this.cuotaForm.get("valor")?.setValue(this.cuotaMinima);
  }

  onSave(){
    let data = {
      valor: this.cuotaForm.get('valor')?.value,
      prestamoId: this.idPrestamo
    }
    console.log(data)
    const formData = new FormData();
    formData.append('valor', data.valor);

    formData.append('prestamoId', data.prestamoId+"");

    this.cuotaService.saveCuota(formData)
      .subscribe((data: any) => {
       this.dialogRef.close(1);
    }, (error: any) => {
      this.dialogRef.close(2);
    });
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  cuotaMin(){
    this.cuotaForm.get("valor")?.setValue(this.cuotaMinima);
  }

  cuotaOtro(){
    this.cuotaForm.get("valor")?.setValue(null);
  }

}
