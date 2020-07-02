import { Component } from '@angular/core';
import { FlagService } from './flag.service';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(public flag: FlagService, public local: HttpService) {}
  title = 'SampleCRUD';
}
