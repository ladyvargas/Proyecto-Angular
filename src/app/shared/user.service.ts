import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'http://localhost:3030/api';
  readonly BaseURII = 'http://localhost:4040/api';

  formModel = this.fb.group({
    id: ['', Validators.required],
    roles: ['', Validators.required],
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  formModel2 = this.fb.group({
    Id_Producto: ['', Validators.required],
    name_producto: [''],
    description_producto: [''],
    precio_producto: ['']
  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      id: this.formModel.value.id,
      roles: this.formModel.value.roles,
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    console.log(body);
    return this.http.post(this.BaseURI + '/registrar', body);
  }

  login(formData) {
    console.log(formData);
    return this.http.post(this.BaseURI + '/login', formData);
  }

  registerProducto() {
    var body2 = {
      Id_Producto: this.formModel2.value.Id_Producto,
      name_producto: this.formModel2.value.name_producto,
      description_producto: this.formModel2.value.description_producto,
      precio_producto: this.formModel2.value.precio_producto
    };
    console.log(body2);
    return this.http.post(this.BaseURI + '/createproducto', body2);
  }

  registerPedido(product) {
    console.log(product);
    return this.http.get(this.BaseURII + '/pedidos?id=' + product);
  }

  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }

  getProductos() {
    return this.http.get(this.BaseURII + '/producto');
  }
  pedidos() {
    return this.http.get(this.BaseURII + '/listapedidos');
  }
  delete() {
    return this.http.get(this.BaseURII + '/producto/');
  }

}
