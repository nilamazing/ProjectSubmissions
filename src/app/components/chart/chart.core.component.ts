import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import * as Highcharts from 'highcharts';

let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

declare var require: any;
Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
    selector: "app-chart-core",
    templateUrl: "chart.core.component.html"
})
export class ChartCoreComponent implements OnInit, OnChanges{
    @Input() chartContainerId:string="";
    @Input() chartElementConfig:any;
    chartOptions:any;
    ngOnInit(): void {
        // if(this.chartElementConfig){
        //     this.chartOptions=JSON.parse(JSON.stringify(this.chartElementConfig.config));
        //     //console.log(this.chartOptions);
        //     setTimeout(()=>{
        //       Highcharts.chart(this.chartContainerId,this.chartOptions);
        //     });
            
        //   }
    }
    ngOnChanges(changes: SimpleChanges): void {
      if(changes["chartContainerId"]){
        this.chartContainerId=changes["chartContainerId"].currentValue;
      }
      if(changes["chartElementConfig"]){
        this.chartElementConfig=changes["chartElementConfig"].currentValue;
      }
      this.chartOptions=JSON.parse(JSON.stringify(this.chartElementConfig.config));
            //console.log(this.chartOptions);
      setTimeout(()=>{
          Highcharts.chart(this.chartContainerId,this.chartOptions);
       });
      
    }
}