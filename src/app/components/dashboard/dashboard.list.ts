import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DashboardDataConfig } from "src/app/Entities/dashboardDataConfig";
import { DialogData } from "src/app/Entities/dialogData";
import { UserDashboard } from "src/app/Entities/userDashboard";
import { DashboardService } from "src/app/services/dashboard.state.service";

@Component({
    selector: "app-dashboard-list",
    templateUrl: "./dashboard.list.html",
    styleUrls: ["./dashboard.list.css"]
})

export class DashboardList implements OnInit{
    userDashboards:UserDashboard[]=[];
    constructor(private dashboardService:DashboardService,private router:Router){
        
    }
    ngOnInit(): void {
        this.dashboardService.subscribeToUserDashBoardStream().subscribe({
            next:(usrDashBoardData:UserDashboard[])=>{
                //if(usrDashBoardData && usrDashBoardData.length>0){
                    // console.log("In Dashboard List");
                    // console.log(usrDashBoardData);
                    //console.log("Got new Subject trigger");
                    this.userDashboards=usrDashBoardData;
                //}
            },
            error:(err)=>{
                console.log("Error in Subscribing to User dashboard Data");
                console.log(err);
            }
        });
        //this.dashBoardDataConfigArr=this.dashboardService.getDashBoardDataConfig();
    }
    deleteDashBoard(usrDashBoardId:string){
        if(!this.dashboardService.deleteDashBoard(usrDashBoardId)){
            this.openDialog({statusMessage: "Unable to delete Dashboard..Please try sometimes later"});
            //console.log("Dashboard deleted successfully");
        }

    }
    navigateToBlogDetail(blogId:string){
        this.router.navigate(['dashboard/detail',blogId])
    }
    openDialog(dialogData:DialogData){

    }
}