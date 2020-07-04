import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ToastService } from '../toast.service';
import { RegExService } from '../reg-ex.service';
import { HttpService } from '../http.service';
import { FlagService } from '../flag.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
	constructor(private toast: ToastService, private regex: RegExService, private http: HttpService, private flag: FlagService, private r: Router) {}

	username = '';
	password = '';

	loginObserver: Subscription;

	handleSubmit(/*e:Event*/) {
		// e.preventDefault();
		let {
			regex: { isValidUsername, isValidPassword },
			toast: { warn, err, success },
			http: { persistLogin },
			flag: { startLoading, stopLoading },
			username, password,
			r: { navigate }
		} = this;
		
		if(!isValidUsername(username)) {
			warn("Please enter your correct username");
			return
		}

		if(!isValidPassword(password)) {
			warn("Please enter your correct password");
			return
		}
		
		startLoading();
		this.loginObserver = this.http.loginReq({username, password})
		.subscribe( (data) => {
			let { message, userid } = data.body;
			persistLogin(userid, data.headers['token']);
			success(message || "Login Successful");
			navigate(['/users']);
		}, (error) => {
			let { message } = error;
			err(message || "Unexpected Error has Occurred");
		}, () => {
			stopLoading();
		});
	}

	ngOnDestroy() {
		if(this.loginObserver) {
			this.loginObserver.unsubscribe();
		}
	}
}
