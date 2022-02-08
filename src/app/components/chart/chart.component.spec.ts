import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ChartComponent } from "./chart.component";
import { DashboardService } from 'src/app/services/dashboard.state.service';
import { MaterialModule } from "src/app/material-module";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { ChartCoreComponent } from "./chart.core.component";
import { AppStatusDialog } from "../dialog/dialog.component";
import { testDashBoard } from "src/app/testing/dashboard-sample";
import { chartSample } from "src/app/testing/chart-sample";
import { By } from "@angular/platform-browser";
import { PredictXChartConfig } from "src/app/Entities/predictXChartConfig";
import { Observable, Observer, Subject } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

describe("ChartComponent", () => {
    let component: ChartComponent;
    let fixture: ComponentFixture<ChartComponent>;
    let service: DashboardService;
    let chartToDashboardSpy: any;
    let dialogSpy: any;
    let consoleSpy: any;
    let editChartSpy:any;
    let dialogRef:any;
    let eventStream:Subject<any>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                ReactiveFormsModule
            ],
            declarations: [
                ChartComponent,
                ChartCoreComponent,
                AppStatusDialog
            ],
            providers: [DashboardService]
        }).compileComponents();
    });
    beforeAll(()=>{
        eventStream=new Subject();
        dialogRef={ afterClosed: () => eventStream, close: null };
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(ChartComponent);
        component = fixture.componentInstance;
        service = fixture.debugElement.injector.get(DashboardService);
        eventStream=new Subject();
        
        chartToDashboardSpy = spyOn(service, "addChartToDashboard").and.callFake(() => {
            //console.log("I am fake spy");
            return true;
        });
        dialogSpy=spyOn(TestBed.get(MatDialog), "open").and.returnValue(dialogRef);
        editChartSpy=spyOn(service,"updateChartItemForDashboard").and.callFake(()=>{
            console.log("I am fake spy");
           return new Observable((observer:Observer<boolean>)=>{
              observer.next(true);
              observer.complete();
           })
        })
        consoleSpy=spyOn(console,"log")
        fixture.detectChanges();
    });
    it("Check Chart Creation Fields exist", () => {
        expect(component.chartTmpls).not.toBeNull();
        expect(component.chartName).not.toBeNull();
    });
    it("Check Chart Creation Fields are Required", () => {
        expect(component.chartTmpls.hasError("required")).toBeTruthy();
        expect(component.chartName.hasError("required")).toBeTruthy();
    });
    it("Check if Preview and Create Button is disabled for Bad Input", () => {
        const compiled = fixture.nativeElement as HTMLElement;
        let elements = compiled.querySelectorAll("button[color='primary']");
        expect(elements[0].getAttribute("disabled")).toEqual('true');
        expect(elements[1].getAttribute("disabled")).toEqual('true');
    });
    it("Check if Preview Button is enabled for Chart Template Valid selection", () => {
        component.eligibleChartConfigs = chartSample;
        component.chartTmpls.setValue(component.eligibleChartConfigs[0].name);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        let element = compiled.querySelector("button[color='primary']"); //assuming the first button is Preview button always
        expect(element?.getAttribute('disabled')).toBeNull();
    });
    it("Preview Button click should render the chart", () => {
        component.eligibleChartConfigs = chartSample;
        component.dashboardId = "dx0uby407xs";
        component.chartTmpls.setValue(component.eligibleChartConfigs[0].name);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        let element = compiled.querySelector("button[color='primary']"); //assuming the first button is Preview button always
        if (element) {
            element.dispatchEvent(new Event('click'));
            fixture.detectChanges();
            let chartElement = compiled.querySelector(`app-chart-core div#${component.dashboardId}`);
            expect(chartElement).toBeTruthy();
        }
        else {
            fail("Preview Button not found");
        }
    });
    it("Create Button should display error when noChart Title is input", () => {
        component.eligibleChartConfigs = chartSample;
        component.dashboardId = "dx0uby407xs";
        component.chartTmpls.setValue(component.eligibleChartConfigs[0].name);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        let elements = compiled.querySelectorAll("button[color='primary']"); //assuming the second button is Create button always
        if (elements && elements.length > 0) {
            elements[1].dispatchEvent(new Event('click'));
            fixture.detectChanges();
            expect(chartToDashboardSpy).not.toHaveBeenCalled();

        }
        else {
            fail("Preview Button not found");
        }
    });
    it("Create Button should invoke addchart method when valid inputs are passed", () => {
        
        //console.log(fakeChartData);
        component.eligibleChartConfigs = chartSample;
        component.chartTmpls.setValue(chartSample[0].name);
        component.chartName.setValue("Chart 1");
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        let element = compiled.querySelector("button[color='primary']:last-child");
        if (element) {
            element.dispatchEvent(new Event('click'));
            fixture.detectChanges();
            //expect(spyOn(service,'addChartToDashboardDummy')).toHaveBeenCalled();

            expect(chartToDashboardSpy).toHaveBeenCalled();
        }
        else {
            fail("Create Button not found...Skipping other tests");
        }
    });

    it("Check if the Dialog works as expected", () => {
        component.openDialog({statusMessage:"Test Dialog"});
        eventStream.next({dialogData:"Test dialog is closed"});
        expect(dialogSpy).toHaveBeenCalled();        
    });

    it("Check if Edit Button is disabled for unchanged input",()=>{
        let fakeChartData: any = { name: "Chart 1", chartType: "SplineChart", chartConfig: chartSample[0] };
        let fakeDashboardId: (string | undefined) = "dx0uby407xs";
        component.dashboardId=fakeDashboardId;
        component.userChart=fakeChartData;
        component.isEditMode=true;
        component.ngOnInit();
        component.chartName.setValue("Chart 1");
         component.chartTmpls.setValue("SplineChart");
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        let element = compiled.querySelector("button[color='primary']:last-child");
        expect(element?.getAttribute("disabled")).toEqual("true");
    });
    it("Check if Edit Button is enabled for changed input",()=>{
        let fakeChartData: any = { name: "Chart 1", chartType: "SplineChart", chartConfig: chartSample[0] };
        let fakeDashboardId: (string | undefined) = "dx0uby407xs";
        component.isEditMode=true;
        component.dashboardId=fakeDashboardId;
        component.userChart=fakeChartData;
        component.ngOnInit();
        component.chartName.setValue("Chart 1");
        component.chartTmpls.setValue("PieChart");
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        let element = compiled.querySelector("button[color='primary']:last-child");
        expect(element?.getAttribute("disabled")).toBeNull();
    });
   it("Check if 'updateChartItemForDashboard' Service is invoked for Valid Input",()=>{
        let fakeChartData: any = { name: "Chart 1", chartType: "SplineChart", chartConfig: chartSample[0] };
        let fakeDashboardId: (string | undefined) = "dx0uby407xs";
        component.isEditMode=true;
        component.dashboardId=fakeDashboardId;
        component.userChart=fakeChartData;
        component.ngOnInit();
        component.chartName.setValue("Chart 2");
        component.chartTmpls.setValue("SplineChart");
        component.targetChartConfig=chartSample[0].config;
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        let element = compiled.querySelector("button[color='primary']:last-child");
        if(element){
            element.dispatchEvent(new Event('click'));
            expect(editChartSpy).toHaveBeenCalled();
        }
        else{
            fail("Edit Button not found..hence skipping");
        }
   });
})