import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  }
  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/verproducto');
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        console.log(res);
        console.log(res.dataUser.roles);
        var roles=res.dataUser.roles;
        localStorage.setItem('token', res.token);
        if(roles=="1"){
          this.router.navigateByUrl('/productosadmin');
        }else {
          this.router.navigateByUrl('/verproducto');
        }
      },
      err => {
        this.toastr.error('Contraseña o Correo incorrecto.', 'Autentificacion fallida.');
        if (err.status == 400)
          this.toastr.error('Contraseña o Correo incorrecto.', 'Autentificacion fallida.');
        else
          console.log(err);
      }
    );
  }


}
