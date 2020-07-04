import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ToastService } from '../toast.service';
import { RegExService } from '../reg-ex.service';
import { HttpService } from '../http.service';
import { FlagService } from '../flag.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {
	constructor(private toast: ToastService, private regex: RegExService, private http: HttpService, private flag: FlagService, private r: Router) {}

	name = '';
	username = '';
	email = '';
	mobile = '';
	password = '';
	confPass = '';
	profPic;
	profPicChanged = false;

	registerObserver: Subscription;

	handleSubmit(/*e:Event*/) {
		// e.preventDefault();
		let {
			regex: { isValidName, isValidUsername, isValidEmail, isValidMobile, isValidPassword },
			toast: { warn, err, success },
			http: { persistLogin },
			flag: { startLoading, stopLoading },
			name, username, email, mobile, password, confPass, profPic, profPicChanged,
			r: { navigate }
		} = this;
		
		if(!isValidName(name)) {
			warn("Please enter your name");
			return
		}

		if(!isValidUsername(username)) {
			warn("Please enter a valid username");
			return
		}

		if(!isValidEmail(email)) {
			warn("Please enter your correct email");
			return
		}

		if(mobile && !isValidMobile(mobile)) {
			warn("Please enter your correct contact mobile number");
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

		let formData = new FormData();
		formData.append('name', name);
		formData.append('username', username);
		formData.append('email', email);
		formData.append('mobile', mobile);
		formData.append('password', password);
		if(profPicChanged) {
			formData.append('prof', profPic);
		}
		this.registerObserver = this.http.registerReq(formData)
		.subscribe( (data) => {
			let { message, userid } = data.body;
			persistLogin(userid, data.headers['token']);
			success(message || "Registration Successful");
			navigate(['/users']);
		}, (error) => {
			let { message } = error;
			err(message || "Unexpected Error has Occurred");
		}, () => {
			stopLoading();
		});
	}

	handleFile(e: Event) {
		let FileInput = <HTMLInputElement>e.target;
		let file = (<HTMLInputElement>e.target).files[0];

		if(FileInput.files && file)
		{
			var reader = new FileReader();

			reader.onload = (e: any) =>
			{
				this.profPic = e.target.result;
				this.profPicChanged = true;
			}

			reader.readAsDataURL(file);
		}
	}

	ngOnDestroy() {
		if(this.registerObserver) {
			this.registerObserver.unsubscribe();
		}
	}
}
