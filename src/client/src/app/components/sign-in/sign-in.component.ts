import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { loginUser } from 'src/app/store/actions/user/user.actions';
import { loggedUserSelector } from 'src/app/store/selectors/user/user.selectors';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  //loggedUser$: Observable<User>
  authUserGroup: FormGroup;
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router
    ) 
  { 
    this.authUserGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  authUser() {
    this.store.dispatch(loginUser({data: this.authUserGroup.value}));
    this.authUserGroup.reset();
    //this.loggedUser$ = this.store.select(loggedUserSelector)
  }

  goToSignUp() {
    this.router.navigate(['/users']);
  }
}
