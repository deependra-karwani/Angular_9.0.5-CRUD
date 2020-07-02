import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { ToastService } from '../toast.service';
import { RegExService } from '../reg-ex.service';
import { HttpService } from '../http.service';
import { FlagService } from '../flag.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
	constructor(private toast: ToastService, private regex: RegExService, private http: HttpService, private flag: FlagService) {}

	email;
	password;
	confPass;

	changePassObserver: Subscription;

	handleSubmit(/*e:Event*/) {
		// e.preventDefault();
		let {
			regex: { isValidEmail, isValidPassword },
			toast: { warn, err, success },
			http: { forgotPasswordReq },
			flag: { startLoading, stopLoading },
			email, password, confPass
		} = this;
		
		if(!isValidEmail(email)) {
			warn("Please enter your correct email");
			return
		}

		if(!isValidPassword(password)) {
			warn("Please enter a valid password");
			return
		}

		if(password !== confPass) {
			warn("Passwords do not match");
			return
		}
		
		startLoading();

		this.changePassObserver = forgotPasswordReq({email, password})
		.subscribe( (data) => {
			let { message } = data;
			success(message || "Password Changed Successfully");
		}, (error) => {
			let { message } = error;
			err(message || "Unexpected Error has Occurred");
		}, () => {
			stopLoading();
		});
	}

	ngOnDestroy() {
		if(this.changePassObserver) {
			this.changePassObserver.unsubscribe();
		}
	}
}
