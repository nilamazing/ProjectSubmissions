import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { DialogData } from "src/app/Entities/dialogData";
import { UserDashboard } from "src/app/Entities/userDashboard";
import { DashboardService } from "src/app/services/dashboard.state.service";
import { AppStatusDialog } from "../dialog/dialog.component";

@Component({
    selector: "app-dashboard-create",
    templateUrl: "./dashboard.create.html",
    styleUrls: ["dashboard.create.css"]
})

export class DashboardCreate implements OnInit {
    dashBoardFormGroup!: FormGroup;
    dashboardTypes: string[] = [];
    dashboardId!: string;
    dashBoardItem!: (UserDashboard | null);
    createButtonText: string = "Create";
    isEditMode = false;
    isEditEligible = false;
    dashBoardName = "Create Dashboard";
    
    constructor(private dashboardService: DashboardService, private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
        this.activatedRoute.params.subscribe({
            next: (params) => {
                if (params) {
                    this.dashboardId = params["id"];
                    if (this.dashboardId) {
                        //this.eligibleChartConfigs = this.dahboardService.retrieveChartElementsForDashBoard(this.dashboardId);
                        this.dashBoardItem = this.dashboardService.getDashboardItem(this.dashboardId);
                        if(this.dashBoardItem){
                        this.isEditMode = true;
                        this.dashBoardName = "Edit Dashboard";
                        this.createButtonText = "Edit";
                        }
                    }
                }
            },
            error: (err) => {
                console.log("Error retrieving params in Chart Element component")
                console.log(err);
            }
        });
        this.dashboardTypes = this.dashboardService.getDashboardTypes();
        this.dashBoardFormGroup = new FormGroup({
            "name": new FormControl('', { validators: [Validators.required] }),
            "description": new FormControl('', { validators: [Validators.required] }),
            "layout": new FormControl(null, { validators: Validators.required })
        })
    }
    ngOnInit(): void {
        if (this.isEditMode) {
            this.dashBoardFormGroup.get('name')?.setValue(this.dashBoardItem?.name);
            this.dashBoardFormGroup.get('description')?.setValue(this.dashBoardItem?.description);
            this.dashBoardFormGroup.get('layout')?.setValue(this.dashBoardItem?.dashboardType);
            (this.dashBoardFormGroup.get('name') as FormControl).valueChanges.subscribe({
                next: (val) => {
                    if (val && val !== this.dashBoardItem?.name) {
                        this.isEditEligible = true;
                    }
                    else {
                        this.isEditEligible = false;
                    }
                }
            });
            (this.dashBoardFormGroup.get('description') as FormControl).valueChanges.subscribe({
                next: (val) => {
                    if (val && val !== this.dashBoardItem?.description) {
                        this.isEditEligible = true;
                    }
                    else {
                        this.isEditEligible = false
                    }
                }
            });
            (this.dashBoardFormGroup.get('layout') as FormControl).valueChanges.subscribe({
                next: (val) => {
                    if (val !== this.dashBoardItem?.dashboardType) {
                        this.isEditEligible = true;
                    }
                    else {
                        this.isEditEligible = false;
                    }
                }
            });
        }
    }
    createDashBoard() {
        let editObs$: Observable<boolean>;
        if (this.isEditMode) {
            editObs$ = this.dashboardService.editDashBoardItem({
                id: this.dashboardId,
                name: this.dashBoardFormGroup.get('name')?.value,
                description: this.dashBoardFormGroup.get('description')?.value,
                dashboardType: this.dashBoardFormGroup.get('layout')?.value
            });
            editObs$.subscribe({
                next: (editStatus) => {
                    if (editStatus) {
                        this.router.navigate(['/']);
                    }
                },
                error: (err) => {
                    console.log("Error");
                    this.openDialog({ statusMessage: err });
                }
            })
        }
        else {
            if (this.dashBoardFormGroup.valid) {
                if (this.dashboardService.createDashBoard({
                    id: '', name: this.dashBoardFormGroup.value.name,
                    dashboardType: this.dashBoardFormGroup.value.layout,
                    description: this.dashBoardFormGroup.value.description,
                    elements: []
                })) {
                    this.router.navigate(['/']);
                }
            }
            else {
                console.log("Invalid form")
            }
        }
    }
    openDialog(dialogData: DialogData) {
        const dialogRef = this.dialog.open(AppStatusDialog, {
            data: dialogData,
            width: "450px"
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