import { Component, Input } from "@angular/core";
import { UserChart } from "src/app/Entities/chartUser";
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
    selector: "app-chart-map-display",
    templateUrl: "chart-map-display.component.html",
    styleUrls: ["chart-map-display.component.css"]
})
export class ChartMapDisplayMapComponent{
  @Input() layout!:number;
  @Input() dashBoardCharts:UserChart[]=[];
}