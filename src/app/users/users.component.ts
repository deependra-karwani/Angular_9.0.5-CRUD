import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ToastService } from '../toast.service';
import { HttpService } from '../http.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnDestroy {
	constructor(private toast: ToastService, private r: Router, private http: HttpService) {}

	users;
	getAllObserver: Subscription;

	ngOnInit(): void {
		let {
			toast: { err, warn },
			http: { getUId }
		} = this;

		let params = new HttpParams();
		params = params.append('userid', getUId());

		this.getAllObserver = this.http.getAllUsersReq(params)
		.subscribe( (data) => {
			data.message ?
				warn(data.message)
			:
				this.users = data.users;			
		}, (error) => {
			err(error.message || "Unexpected Error has Occurred");
		});
	}

	navigateDetails(userid) {
		this.r.navigate(['/details/'+userid]);
	}

	ngOnDestroy() {
		if(this.getAllObserver) {
			this.getAllObserver.unsubscribe();
		}
	}
}
