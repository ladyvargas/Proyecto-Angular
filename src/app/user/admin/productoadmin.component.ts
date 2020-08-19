import { UserService } from 'src/app/shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './productoadmin.component.html',
  styles: []
})
export class ProductoadminComponent implements OnInit {
  Details;
  Details2;

  constructor(private router: Router, public service: UserService) { }

  ngOnInit() :void{
    this.service.getProductos().subscribe(
      res => {
        console.log(res);
        this.Details = res;
      },
      err => {
        console.log(err);
      },
    );
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
  ingresar() {
    localStorage.removeItem('token');
    this.router.navigate(['/producto']);
  }
  eliminar() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
  pedidos() {
    localStorage.removeItem('token');
    this.router.navigate(['/pedidos']);
  }
  agregarProduct(product) {
    this.service.registerPedido(product);
  }
}
