import { Component, OnInit } from '@angular/core';
import { Activity, activities } from './activity-data';
import {ApiService} from '../../../services/api.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  activityData: Activity[];
  data:any;
  constructor(private api: ApiService) {
    this.activityData = activities;
  }


  ngOnInit(): void {
  }

  getData(stock:string){
	this.api.get(`http://api.marketstack.com/v1/eod?access_key=4f0a067e31a165f5768cbfce1b9c3760&symbols=${stock}`)
  	.subscribe((res:any) => {
  		this.data = res.data;
  		console.log(this.data);
  	});
  }

  onTabChanged(event:any){
  	this.data = null;
  }

}
