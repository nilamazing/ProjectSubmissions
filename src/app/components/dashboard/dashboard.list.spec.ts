import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material-module';
import { DashboardService } from 'src/app/services/dashboard.state.service';
import { TestComponent } from './dashboard.create.spec';
import { DashboardList } from "./dashboard.list"

describe("DashboardList", () => {
    let component: DashboardList;
    let fixture: ComponentFixture<DashboardList>;
    let service: DashboardService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: TestComponent }
                ]),
                BrowserAnimationsModule
            ],
            declarations: [
                DashboardList,
                TestComponent
            ],
            providers: [DashboardService]
        }).compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardList);
        component=fixture.componentInstance;
        service=fixture.debugElement.injector.get(DashboardService);
        fixture.detectChanges();
    });
    it("Should display message 'There are no Dashboards' when no dashboard is available",()=>{
        const compiled = fixture.nativeElement as HTMLElement;
        let element = compiled.querySelector("div.userMessage span");
        expect(element?.textContent).toEqual('There are no Dashboards');
        
    });
    it("Mat expansion panel should bind the dashboard data as expected",()=>{
        component.userDashboards=[{id:"dabcdxyz1",name:"Test Dashboard 1",description:"This is Test Dashboard 1",dashboardType:"TwoColumnLayout",elements:[]},
                                  {id:"dabcyzs1",name:"Test Dashboard 2",description:"This is Test Dashboard 2",dashboardType:"ThreeColumnLayout",elements:[]}
                                ];
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        let elements = compiled.querySelectorAll("mat-expansion-panel");
        expect(elements.length).toBeGreaterThanOrEqual(2);
    });
    it("The Subscription for the Component should be working as expected",()=>{
        service.createDashBoard({id:"dabcdxyz1",name:"Test Dashboard 1",description:"This is Test Dashboard 1",dashboardType:"TwoColumnLayout",elements:[]});
         expect(component.userDashboards.length).toBeGreaterThanOrEqual(1);
    });
    it("Dashboard detail link should be generated",()=>{
        component.userDashboards=[{id:"dabcdxyz1",name:"Test Dashboard 1",description:"This is Test Dashboard 1",dashboardType:"TwoColumnLayout",elements:[]}];
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        let elements=compiled.querySelectorAll("mat-action-row a[color='primary']");
        expect(elements[0].getAttribute("ng-reflect-router-link")).toContain("/dashboard/detail,dabcdxyz1");
    });
    it("Dashboard edit link should be generated",()=>{
        component.userDashboards=[{id:"dabcdxyz1",name:"Test Dashboard 1",description:"This is Test Dashboard 1",dashboardType:"TwoColumnLayout",elements:[]}];
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        let elements=compiled.querySelectorAll("mat-action-row a[color='accent']");
        expect(elements[0].getAttribute("ng-reflect-router-link")).toContain("/dashboard/edit,dabcdxyz1");
    });
    it("Delete dashboard should work as expected",()=>{
        component.userDashboards=[{id:"dabcdxyz1",name:"Test Dashboard 1",description:"This is Test Dashboard 1",dashboardType:"TwoColumnLayout",elements:[]}];
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        let element=compiled.querySelector("mat-action-row button[color='warn']");
        if(element){
            element.dispatchEvent(new Event('click'));
            fixture.detectChanges();
            expect(component.userDashboards).toBeLessThanOrEqual(0);
        }
    });
    afterAll(()=>{
        fixture.destroy();
        TestBed.resetTestingModule();
    });
});