import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserChart } from "src/app/Entities/chartUser";
import { LayoutInfo } from "src/app/Entities/layoutInfo";
import { UserDashboard } from "src/app/Entities/userDashboard";
import { ConfigService } from "src/app/services/config.service";
import { DashboardService } from "src/app/services/dashboard.state.service";

@Component({
    selector:"app-detail-list",
    templateUrl:"./dashboard.detail.html",
    styleUrls:["./dashboard.detail.css"]
})

export class DashboardDetailComponent implements OnInit{
    dashBoardId:string="";
    displayedColumns: string[] = ['name','type','action'];
    dashBoardItem:UserDashboard={id:"",name:"",description:"",dashboardType:"",elements:[]}; // This placeholder value was set as the Test case was throwing error
    layoutInfoArr!:LayoutInfo[];
    currentChartLayout!:number;
    constructor(private configService:ConfigService,private dashboardService:DashboardService,private activatedRoute:ActivatedRoute,private router:Router){
        // console.log(this.activatedRoute.snapshot.params['id']);
        
    }
    ngOnInit(): void {
        let currChartLayouts;
        this.layoutInfoArr=this.dashboardService.getAllLayouts();
        if(this.layoutInfoArr.length===0){
            this.configService.loadConfigs("assets/configs/layout-info.json").subscribe({
                next:(data)=>{
                    if(data && data.length>0){
                        // console.log("Reading Layout Configuration");
                        // console.log(data);
                        this.dashboardService.setLayouts(data);
                    }
                },
                error:(err)=>{
                    console.log("Error Reading from Layout Config");
                    console.log(err);
                }
            })
        }
        this.activatedRoute.params.subscribe({
            next:(params)=>{
                if(params){
                    this.dashBoardId=params["id"];
                    if(this.dashBoardId){
                        let targetDashBoardItem =this.dashboardService.getDashboardItem(this.dashBoardId);
                        if(targetDashBoardItem){
                            this.dashBoardItem=targetDashBoardItem;
                            if(this.dashBoardItem){
                                // console.log("Current Dashboard Item");
                                // console.log(this.dashBoardItem)
                                currChartLayouts=this.layoutInfoArr.filter(layout=>layout.name===this.dashBoardItem.dashboardType);
                                if(currChartLayouts && currChartLayouts.length>0){
                                    this.currentChartLayout=currChartLayouts[0].columns;
                                    //console.log("Current Chart Layout is",this.currentChartLayout);
                                }
                            }
                        }
                    }
                }
            },
            error:(err)=>{
                console.log("Error in retrieving params in Blog Details component")
                console.log(err);
            }
        })
    }
    createChart(){
        this.router.navigate(["chart/create",this.dashBoardId]);
    }
    
    deleteChart(chartId:string){
        //console.log("Chart Id to be deleted",chartId);
        if(this.dashboardService.deleteChartFromDashboard(chartId,this.dashBoardItem)){
            this.dashBoardItem.elements=this.dashBoardItem.elements.filter(el=>el.id!==chartId);
            console.log("Logging New Dashboard Item");
            console.log(this.dashBoardItem);
        }
    }
}