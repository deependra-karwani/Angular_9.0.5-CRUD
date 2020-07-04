import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

const defaultOps = {
	closeButton: false,
	timeOut: 3000,
	easeTime: 200,
	positionClass: 'toast-top-right',
	tapToDismiss: true
};

@Injectable({
	providedIn: 'root'
})
export class ToastService {
	constructor(private toast: ToastrService) {}

	info = (message) => {
		this.toast.info('', message, {
			...defaultOps
		});
	}

	success = (message) => {
		this.toast.success('', message, {
			...defaultOps
		});
	}

	warn = (message) => {
		this.toast.warning('', message, {
			...defaultOps
		});
	}

	err = (message) => {
		this.toast.error('', message, {
			...defaultOps
		});
	}
}
