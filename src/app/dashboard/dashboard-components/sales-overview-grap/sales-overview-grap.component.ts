import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import {ApiService} from '../../../services/api.service';
import * as $ from 'jquery';
declare var require: any;
const data= require('./data.json');

export interface Chart {
	type: ChartType;
	data: Chartist.IChartistData;
	options?: any;
	responsiveOptions?: any;
	events?: ChartEvent;
}

@Component({
  selector: 'app-sales-overview-grap',
  templateUrl: './sales-overview-grap.component.html',
  styleUrls: ['./sales-overview-grap.component.css']
})
export class SalesOverviewGrapComponent implements OnInit {

  error:boolean = false;
  value: string[] = ["sample1","sample2"];
  barChart1: Chart = {
		type: 'Bar',
		data: data['Bar'],
		options: {
			seriesBarDistance: 15,
			high: 12.5,

			axisX: {
				showGrid: false,
				offset: 20
			},
			axisY: {
				showGrid: true,
				offset: 40
			},
			height: 360
		},

		responsiveOptions: [
			[ 
				'screen and (min-width: 640px)',
				{
					axisX: {
						labelInterpolationFnc: function(value: number,index: number): string {
							return index % 1 === 0 ? `${value}` : '';
						}
					}
				}
			]
		]
	};


  constructor(private api: ApiService) { }

  ngOnInit(): void {
  		// this.api.get("http://api.marketstack.com/v1/eod?access_key=4f0a067e31a165f5768cbfce1b9c3760&symbols=AAPL")
  		// 				.subscribe((res:any)=>console.log(res))
  		var limit = 2;
  		$(".single-checkbox").on('change', (evt) => {
  		   var element: any = evt.target;
		   if($(element).siblings(':checked').length >= limit) {
		       element.checked = false;
		   }
		});
  }

  getArray(){

  }


  getData(){
  	var items: any = $(".single-checkbox:checked");
  	if(items.length < 2){
  		this.error = true;
  		return;
  	}
  	this.error = false;
  	var data;
  	var series_data:any = this.barChart1.data.series;
  	for(let i = 0;i<=1;i++){
  		this.value[i] = items[i].value;
  		this.api.get(`http://api.marketstack.com/v1/eod?access_key=4f0a067e31a165f5768cbfce1b9c3760&symbols=${items[i].value}`)
	  	.subscribe((res:any) => {
	  		data = res.data;
			var x: any[] = [];
			for(let j = 0; j<=5;j++){
				x.push(data[j].open);
			}	
			series_data[i] = x;
	  		this.barChart1.data = {
	  			labels: this.barChart1.data.labels,
	  			series: series_data
	  		}
	  		this.barChart1.options.high = Math.max(this.barChart1.options.high,Math.max(...x));
	  	});
  	}
  

  }

}
