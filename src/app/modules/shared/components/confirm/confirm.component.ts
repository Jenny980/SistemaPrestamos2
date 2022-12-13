import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteService } from '../../services/cliente.service';
import { PrestamoService } from '../../services/prestamo.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any, private clienteService: ClienteService,
    private prestamoService: PrestamoService) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close(3);
  }

  delete(){
    console.log(this.data.prestamo)
    console.log("fsdfsdfs")
    if(this.data.prestamo == true){
      this.prestamoService.deletePrestamo(this.data.id)
        .subscribe((data: any) => {
          this.dialogRef.close(1);
        }, (error: any) =>{
          this.dialogRef.close(2);
        })
    } else {
      if(this.data != null){
      this.clienteService.deleteClientes(this.data.id)
        .subscribe((data: any) => {
          this.dialogRef.close(1);
        }, (error: any) =>{
          this.dialogRef.close(2);
        })
    } else {
      this.dialogRef.close(2);
    }
    }
  }
}
