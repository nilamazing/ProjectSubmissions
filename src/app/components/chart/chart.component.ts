import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { PredictXChartConfig } from "src/app/Entities/predictXChartConfig";
import { DashboardService } from "src/app/services/dashboard.state.service";
import { DialogData } from "src/app/Entities/dialogData";
import { MatDialog } from "@angular/material/dialog";
import { AppStatusDialog } from "../dialog/dialog.component";
import { UserChart } from "src/app/Entities/chartUser";


@Component({
    selector: "app-chart",
    templateUrl: "./chart.component.html",
    styleUrls: ["./chart.component.css"]
})
export class ChartComponent implements OnInit {
    dashboardId!: string;
    chartId!: string;
    eligibleChartConfigs!: PredictXChartConfig[];
    selectedChartTemplate?: string;
    chartTmpls = new FormControl(null, { validators: Validators.required });
    chartName = new FormControl('', { validators: Validators.required });
    chartOptions: any;
    targetChartConfig!: PredictXChartConfig;
    isCreateEligible = false;
    isRender = false;
    chartHeaderTitle = "Create Chart";
    isEditMode = false;
    isEditEligible = false;
    buttonText = "Create";
    userChart!: (UserChart | null);
    //chartAddStatus=false;
    constructor(private dahboardService: DashboardService, private activatedRoute: ActivatedRoute, private dialog: MatDialog) {

    }
    ngOnInit(): void {
        this.activatedRoute.params.subscribe({
            next: (params) => {
                if (params) {
                    this.dashboardId = params["id"];
                    if (this.dashboardId) {
                        //console.log(this.dashboardId);
                        this.eligibleChartConfigs = this.dahboardService.retrieveChartElementsForDashBoard(this.dashboardId);
                        // console.log("Logging eligibleChartConfigs");
                        // console.log(this.eligibleChartConfigs);
                        this.chartId = params["chartId"];
                        if (this.chartId) {
                            this.isEditMode = true;                            
                            this.userChart = this.dahboardService.getChartItem(this.dashboardId, this.chartId);
                            this.chartName.setValue(this.userChart?.name);
                            this.chartTmpls.setValue(this.userChart?.chartConfig.name);
                        }
                    }

                }

            },
            error: (err) => {
                console.log("Error retrieving params in Chart Element component")
                console.log(err);
            }
        });
        if(this.isEditMode){
            this.chartHeaderTitle = "Edit Chart"
            this.buttonText = "Edit";
        }
        if (this.isEditMode && this.userChart) {
            this.chartName.valueChanges.subscribe({
                next: (val) => {
                    if (val && val !== this.userChart?.name) {
                        this.isEditEligible = true;
                    }
                    else {

                        this.isEditEligible = false;

                    }
                }
            });
            this.chartTmpls.valueChanges.subscribe({
                next: (val: any) => {
                    if (val && val !== this.userChart?.chartConfig.name) {
                        this.isEditEligible = true;
                    }
                    else {

                        this.isEditEligible = false;

                    }
                }
            });
        }
    }

    renderChart() {
        let targetConfigs = [];
        try {
            if (this.chartTmpls.valid) {
                // console.log(this.chartTmpls.value);
                //this.highcharts.charts=[];
                //this.chartOptions=null;
                targetConfigs = this.eligibleChartConfigs.filter(config => config.name == this.chartTmpls.value);

                if (targetConfigs && targetConfigs.length > 0) {
                    this.targetChartConfig = targetConfigs[0];
                    // console.log(this.targetChartConfig);
                    this.isRender = true;
                }
            }
        }
        catch (err) {
            console.log("Error in previewing chart");
            this.isCreateEligible = false;
        }
    }
    addChartToDashBoard() {
        let chartAddStatus = false;
        if (this.chartTmpls.invalid || this.chartName.invalid) {
            this.openDialog({ statusMessage: "Please enter the required values and proceed" });
        }
        else {
            // In case preview button is not hit
            if (!this.targetChartConfig) {
                let targetConfigs = [];
                targetConfigs = this.eligibleChartConfigs.filter(config => config.name == this.chartTmpls.value);

                if (targetConfigs && targetConfigs.length > 0) {
                    this.targetChartConfig = targetConfigs[0];
                }
            }
            if (this.isEditMode) {
                // No need to check isEditEligible as it is taken care by front end disabled property binding
                if (this.userChart?.name !== this.chartName.value) {
                    this.userChart!["name"] = this.chartName.value;
                }
                if (this.userChart?.chartConfig.name !== this.chartTmpls.value) {
                    this.userChart!["chartType"] = this.chartTmpls.value;
                    this.userChart!["chartConfig"] = this.targetChartConfig;
                }

                this.dahboardService.updateChartItemForDashboard(this.dashboardId, this.userChart).subscribe({
                    next: (editStatus) => {
                        if (editStatus) {
                            this.openDialog({ statusMessage: "Chart Edited Successfully. Please navigate to Dashboard Details" });
                        }
                    }
                });
            }
            else {
                if (this.targetChartConfig) {
                    chartAddStatus = this.dahboardService.addChartToDashboard({ name: this.chartName.value, chartType: this.chartTmpls.value, chartConfig: this.targetChartConfig }, this.dashboardId);
                    if (chartAddStatus) {
                        this.openDialog({ statusMessage: "Chart Added Successfully. Please navigate to Dashboard Details" });
                    }
                }
            }
            this.targetChartConfig = (null as any);
        }

    }
    openDialog(dialogData: DialogData) {
        const dialogRef = this.dialog.open(AppStatusDialog, {
            data: dialogData,
            width: "350px"
        });
        dialogRef.afterClosed().subscribe({
            next: (data) => {
                console.log("The dialog is closed");
                console.log(data);
            },
            error: (err) => {
                console.log("Error closing the dialog");
                console.error(err);
            }
        })
    }
}