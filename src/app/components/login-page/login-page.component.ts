import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../service/user/user.service";

@Component({
  selector: 'app-login-page',
  standalone: true,
    imports: [
        RouterLink,
        ReactiveFormsModule
    ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  constructor(private userService: UserService, private router: Router) {
  }

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  signup() {
    let obj = {
      username: this.form.value?.username,
      password: this.form.value?.password,
    }
    this.userService.login(obj).subscribe(resp => {
      // cookie save
      // dashboard redirect
    })
  }
}
