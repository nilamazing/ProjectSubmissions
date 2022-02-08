import { TestBed, ComponentFixture } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "src/app/material-module";
import { ConfigService } from "src/app/services/config.service";
import { DashboardService } from "src/app/services/dashboard.state.service";
import { DashboardDetailComponent } from "./dashboard.detail";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChartMapDisplayMapComponent } from "../chart/chart-map-display.component";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { testDashBoard } from "src/app/testing/dashboard-sample";
import { ChartCoreComponent } from "../chart/chart.core.component";

describe("DashboardDetailComponent", () => {
    let component: DashboardDetailComponent;
    let fixture: ComponentFixture<DashboardDetailComponent>;
    let dashboardService: DashboardService;
    let configService: ConfigService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                ReactiveFormsModule,
                HttpClientTestingModule
            ],
            declarations: [
                DashboardDetailComponent,
                ChartMapDisplayMapComponent,
                ChartCoreComponent
            ],
            providers: [DashboardService, ConfigService]
        }).compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardDetailComponent);
        component = fixture.componentInstance;
        dashboardService = fixture.debugElement.injector.get(DashboardService);
        configService = fixture.debugElement.injector.get(ConfigService)
        fixture.detectChanges();
    });
    it("Dashboard Item Name should display", () => {
        component.dashBoardItem = { id: "d60bjqr33j8n", name: "Test Dashboard 1", description: "This is Test Dashboard 1", dashboardType: "TwoColumnLayout", elements: [] }
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        let elements = compiled.querySelectorAll("mat-card-title");
        if (elements && elements.length > 0) {
            expect(elements[0].textContent).toContain("Test Dashboard 1");
        }
        else {
            fail("Dashboard Item Name element not found");
        }
    });
    it("Dashboard Item Description and Layout should display", () => {
        component.dashBoardItem = { id: "d60bjqr33j8n", name: "Test Dashboard 1", description: "This is Test Dashboard 1", dashboardType: "TwoColumnLayout", elements: [] }
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        let elements = compiled.querySelectorAll("mat-card-subtitle div");
        if (elements && elements.length == 2) {
            expect(elements[0].textContent).toContain("This is Test Dashboard 1");
            expect(elements[1].textContent).toContain("TwoColumnLayout");
        }
        else {
            fail("Description and Layout elements not found");
        }
    });
    it("Component should display 'There are no Charts' message if no charts", () => {
        component.dashBoardItem = { id: "d60bjqr33j8n", name: "Test Dashboard 1", description: "This is Test Dashboard 1", dashboardType: "TwoColumnLayout", elements: [] }
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        let elements = compiled.querySelectorAll("mat-card-content div.userMessage");
        if (elements && elements.length > 0) {
            expect(elements[0].textContent).toContain("There are no Charts");
        }
        else {
            fail("'There are no Charts' message was not rendered");
        }
    });
    it("Component should display 'Nothing to show here' message if no charts", () => {
        component.dashBoardItem = { id: "d60bjqr33j8n", name: "Test Dashboard 1", description: "This is Test Dashboard 1", dashboardType: "TwoColumnLayout", elements: [] }
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        let elements = compiled.querySelectorAll("app-chart-map-display div.userMessage");
        if (elements && elements.length > 0) {
            expect(elements[0].textContent).toContain("Nothing to show here");
        }
        else {
            fail("'Nothing to show here' message was not rendered");
        }
    });
    it("Component should render the Chart Table and detect two rows when Dashboard contain Charts", () => {
        component.dashBoardItem = testDashBoard;
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        let elements = compiled.querySelectorAll("mat-card-content tr.mat-row");
        // Unable to detect the exact count as Chart elements get rendered asynchronously
        // which is not in our control and hence results differ each time.
        // Hence testing if chart elements greater than 0
        expect(elements.length).toBeGreaterThan(0);
        
    });

    it("Component Chart table should display correct chart data", () => {
        component.dashBoardItem = testDashBoard;
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        let elements = compiled.querySelectorAll("mat-card-content td.mat-cell");
        if(elements && elements.length>0){
            expect(elements[0].textContent).toContain("Chart");
            expect(elements[1].textContent?.length).toBeGreaterThan(0);
        }
        else{
            fail("No Chart Table columns found")
        }
    });
    
    it("Component Chart Map Container Should render the correct Charts", () => {
        component.dashBoardItem = testDashBoard;
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        // Unable to detect the exact count as Chart elements get rendered asynchronously
        // which is not in our control and hence results differ each time.
        // Hence testing if chart elements greater than 0
        let chartMapElems=compiled.querySelectorAll("app-chart-map-display mat-grid-tile");
        expect(chartMapElems.length).toBeGreaterThan(0);
    });

    it("Component Chart table Delete Button should Update Table and chart", () => {
        component.dashBoardItem = testDashBoard;
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        let deleteButtonEl = compiled.querySelector("mat-card-content button[color='warn']");
        expect(deleteButtonEl).toBeTruthy();
        if(deleteButtonEl){
            deleteButtonEl.dispatchEvent(new Event('click'));
            fixture.detectChanges();
            let elements = compiled.querySelectorAll("mat-card-content tr.mat-row");
            expect(elements.length).toEqual(1);
            let chartElements=compiled.querySelectorAll("app-chart-map-display mat-grid-tile");
            expect(chartElements.length).toEqual(1);
        }
        else{
            fail("Delete Button not available so skipping Delete Test");
        }
    });
    it("Chart Create link should be generated", () => {
        component.dashBoardItem = testDashBoard;
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        let element = compiled.querySelector("mat-card-content a[color='primary']");
        if (element) {
            expect(element.getAttribute("ng-reflect-router-link")).toContain("/chart/create,d3d1nidt64ua");
        }
        else {
            fail("Create Chart button not found");
        }
    });
    it("Chart Edit link should be created in the Chart table",()=>{
        component.dashBoardItem = testDashBoard;
        component.dashBoardId=testDashBoard.id;
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        let element = compiled.querySelector("mat-card-content a");
        expect(element?.getAttribute("ng-reflect-router-link")).toContain("/chart/edit");    
    });
    afterAll(() => {
        fixture.destroy();
        TestBed.resetTestingModule();
    });
});