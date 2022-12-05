import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { ClienteService } from 'src/app/modules/shared/services/cliente.service';
import { NewClienteComponent } from '../new-cliente/new-cliente.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayedColumns: String[] = ['id', 'nombre', 'apellido', 'cc', 'telefono', 'direccion', 'barrio', 'actions'];
  dataClientes = new MatTableDataSource<ClienteElement>();
  clientes = [];

  constructor(private categoryService: CategoryService,
    private clienteService: ClienteService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getClientes();
  }

   getClientes(){
    this.clienteService.getClientes()
    .subscribe( (data: any) => {
      this.ClienteResponse(data);
    }, (error: any) => {
      console.log("error" , error);
    })
  }

  ClienteResponse(resp: any){
    if(resp.metadata[0].Code === '00'){
      this.clientes = resp.clienteResponse.cliente;
      console.log(this.clientes)
    }
  }

  openClienteDialog(){
    const dialogRef = this.dialog.open(NewClienteComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Cliente registrado", "Exito");
        this.getClientes();
      } else if(result == 2){
        this.openSnackBar("Se produjo un error al registrar el cliente", "Error");
      }
    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  edit(id: number, nombre: string, apellido: string, cc: number, telefono: number, direccion: string, barrio: string){
    const dialogRef = this.dialog.open(NewClienteComponent, {
      width: '450px',
      data: {id: id, nombre: nombre, apellido: apellido, cc: cc, telefono: telefono, direccion: direccion, barrio: barrio}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Cliente actualizado", "Exito");
        this.getClientes();
      } else if(result == 2){
        this.openSnackBar("Se produjo un error al actualizar el cliente", "Error");
      }
    });
  }
}

export interface ClienteElement {
  id: number;
  nombre: string;
  apellido: string;
  cc: number;
  telefono: number;
  direccion: string;
  barrio: string;
}
