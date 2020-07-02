import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../toast.service';
import { Subscription } from 'rxjs';
import { HttpService } from '../http.service';
import { FlagService } from '../flag.service';
import { HttpParams } from '@angular/common/http';
import { RegExService } from '../reg-ex.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
	constructor(private ar: ActivatedRoute, private r: Router, private toast: ToastService, private http: HttpService, private flag: FlagService, private regex: RegExService) {}

	id;
	name;
	username;
	email;
	mobile;
	profPic;
	profPicChanged;
	isUser;

	getDetailsObserver: Subscription;
	updProfObserver: Subscription;
	logoutObserver: Subscription;
	delProfObserver: Subscription;

	ngOnInit(): void {
		this.ar.params.subscribe( (params) => {
			this.id = params.id;
			this.isUser = this.id === this.http.getUId();

			let req = new HttpParams();
			req = req.append('userid', this.id);
			this.getDetailsObserver = this.http.getUserDetailsReq(req)
			.subscribe( (data) => {
				// this = {...this, ...data};
				this.profPic = data.profpic;
				this.name = data.name;
				this.username = data.username;
				this.email = data.email;
				this.mobile = data.mobile;
			}, (error) => {
				this.toast.err(error.message || "Could not Fetch User Details");
			});
		});
	}

	handleSubmit(/*e: Event*/) {
		// e.preventDefault();

		let {
			regex: { isValidName, isValidMobile, isValidUsername },
			http: { updateProfileReq, getUId },
			flag: { startLoading, stopLoading },
			toast: { warn, err, success },
			name, username, mobile, profPic, profPicChanged
		} = this;
		
		if(this.id !== getUId()) {
			return
		}
		
		if(!isValidName(name)) {
			warn("Please enter your name");
			return
		}

		if(!isValidUsername(username)) {
			warn("Please enter a valid username");
			return
		}

		if(!isValidMobile(mobile)) {
			warn("Please enter your mobile number");
			return
		}

		startLoading();
		let formData = new FormData();
		formData.append('name', name);
		formData.append('username', username);
		formData.append('mobile', mobile);
		if(profPicChanged) {
			formData.append('prof', profPic);
		}
		this.updProfObserver = updateProfileReq(formData)
		.subscribe( (data) => {
			success(data.message || "Profile Updated Successfully");
		}, (error) => {
			err(error.message || "Unexpected Error has Occurred");
		}, () => {
			stopLoading();
		});
	}

	logout() {
		let {
			http: { getUId, logoutReq, getSession, persistLogout },
			flag: { startLoading, stopLoading },
			toast: { err, success },
			r: { navigate }
		} = this;

		if(this.id === getUId() && window.confirm("Are you sure you want to logout?")) {
			startLoading();

			this.logoutObserver = logoutReq(getSession())
			.subscribe( (data) => {
				success(data.message || "Logout Successful");
				persistLogout();
				navigate(['/login']);
			}, (error) => {
				err(error.message || "Unexpected Error has Occurred");
			}, () => {
				stopLoading();
			});
		}
	}

	delProf() {
		let {
			http: { getUId, deleteAccountReq, persistLogout },
			flag: { startLoading, stopLoading },
			toast: { err, success },
			r: { navigate }
		} = this;

		if(this.id === getUId() && window.confirm("Are you sure you want to logout?")) {
			startLoading();

			this.delProfObserver = deleteAccountReq({userid: this.id})
			.subscribe( (data) => {
				success(data.message || "Profile Deleted Successfully");
				persistLogout();
				navigate(['/login']);
			}, (error) => {
				err(error.message || "Unexpected Error has Occurred");
			}, () => {
				stopLoading();
			});
		}
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
		if(this.getDetailsObserver) {
			this.getDetailsObserver.unsubscribe();
		}
		if(this.updProfObserver) {
			this.updProfObserver.unsubscribe();
		}
		if(this.logoutObserver) {
			this.logoutObserver.unsubscribe();
		}
		if(this.delProfObserver) {
			this.delProfObserver.unsubscribe();
		}
	}
}
