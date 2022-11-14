import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //Form Validables 
  registerForm: any = FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }
  //Add user form actions
  get f() { return this.registerForm.controls; }
  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    //True if all the fields are filled
    if (this.submitted) {

      var username = this.registerForm.controls["email"].value;
      var password = this.registerForm.controls["password"].value;

      const Patient = {
        username: username,
        password: password
      };

      const otherParam: RequestInit = {
        headers:{
          "content-type":"application/json; charset=UTF-8"
        },
        body: JSON.stringify(Patient),
        method:"POST"
      }
      
      /*var valid = false;
      fetch("https://localhost:44354/Test", otherParam)
      .then(data =>{return data.json()})
      .then(res=>{if(res == true)
      {
        this.authService.login(true)
        this.router.navigate(['/Dashboard']);
      }
      else
      {
        alert("ERROR");
      }})
      .catch(error=>console.log(error))

      /*this.authService.login(true)
      ;*/
      this.authService.login(true);
      this.router.navigate(['/Dashboard']);
    }

  }
  ngOnInit() {
    //Add User form validations
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
}
