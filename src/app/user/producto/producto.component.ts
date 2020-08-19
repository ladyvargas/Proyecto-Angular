import { UserService } from 'src/app/shared/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {

  constructor(public service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.formModel2.reset();
  }

  onSubmit() {
    this.service.registerProducto().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel2.reset();
          this.toastr.success('Nuevo producto creado!', 'Registration successful.');
        }
        else {
          this.service.formModel2.reset();
          this.toastr.success('Nuevo producto creado!', 'Registration successful.');
          res.errors.forEach(element => {
            switch (element.code) {
              default:
              this.toastr.error(element.description,'Registration failed.');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
  ver() {
    localStorage.removeItem('token');
    this.router.navigate(['/verproducto']);
  }
}
