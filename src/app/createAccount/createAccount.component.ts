import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first, last } from 'rxjs/operators';

@Component({
  selector: 'app-createAccount',
  templateUrl: './createAccount.component.html',
  styleUrls: ['./createAccount.component.css']
})
export class createAccountComponent {
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
      var firstname = this.registerForm.controls["firstname"].value;
      var lastname = this.registerForm.controls["lastname"].value;
      console.log(firstname, lastname);

      const Patient = {
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname
      };

      const otherParam: RequestInit = {
        headers:{
          "content-type":"application/json; charset=UTF-8"
        },
        body: JSON.stringify(Patient),
        method:"POST"
      }
      
      var valid = false;
      fetch("https://localhost:44354/Create", otherParam)
      .then(data =>{return data.json()})
      .then(res=>{if(res == true)
      {
        alert("USER ADDED");
        this.router.navigate(['/login']);
      }
      else
      {
        alert("ERROR");
      }})
      .catch(error=>console.log(error))

      /*this.authService.login(true)
      ;*/
    }

  }
  ngOnInit() {
    //Add User form validations
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      firstname: ['',[Validators.required]],
      lastname: ['',[Validators.required]]
    });
  }
}
