import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, Observer } from 'rxjs';
import { MaterialModule } from 'src/app/material-module';
import { DashboardService } from 'src/app/services/dashboard.state.service';
import { AppStatusDialog } from '../dialog/dialog.component';
import { DashboardCreate } from "./dashboard.create"

describe("DashboardCreate",()=>{
    let component: DashboardCreate;
    let fixture: ComponentFixture<DashboardCreate>;
    let service: DashboardService;
    let createDashboardSpy:any;
    let editDashboardSpy:any;
    beforeEach(async()=>{
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                RouterTestingModule.withRoutes([
                    {path:'',component:TestComponent}
                ]),
                BrowserAnimationsModule,
                ReactiveFormsModule
            ],
            declarations: [
                DashboardCreate,
                TestComponent,
                AppStatusDialog
            ],
            providers:[DashboardService]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardCreate);
        component=fixture.componentInstance;
        service=fixture.debugElement.injector.get(DashboardService);
        createDashboardSpy=spyOn(service,'createDashBoard').and.callFake(()=>{
            // console.log("I am in fake");
            return true;
        });
        editDashboardSpy=spyOn(service,'editDashBoardItem').and.callFake(():Observable<boolean>=>{
           return new Observable((observer:Observer<boolean>)=>{
                observer.next(true);
                observer.complete();
            })
        })
        fixture.detectChanges();
    });

    it("Check Dashboard Form Fields exist",()=>{
        expect(component.dashBoardFormGroup.controls["name"]).not.toBeNull();
        expect(component.dashBoardFormGroup.controls["description"]).not.toBeNull();
        expect(component.dashBoardFormGroup.controls["layout"]).not.toBeNull();
    });
    it("Check Dashboard Form Fields are Required",()=>{
        expect(component.dashBoardFormGroup.controls["name"].hasError("required")).toBeTruthy();
        expect(component.dashBoardFormGroup.controls["description"].hasError("required")).toBeTruthy();
        expect(component.dashBoardFormGroup.controls["layout"].hasError("required")).toBeTruthy();
    });
    it("Check if Dashboard Create Button is disabled for Bad Input",()=>{
        const compiled = fixture.nativeElement as HTMLElement;
        let elements = compiled.querySelectorAll("button[type='submit']");
        if(elements && elements.length>0){
            expect(elements[0].getAttribute("disabled")).toEqual('true');
            //expect(elements[1].getAttribute("routerlink")).toEqual('/dashboard/create');
        }
        else{
            fail("Disabled property not found for Create button");
        }
    });
    it("Check if Dashboard Create Button is enabled for Valid Input",()=>{
        component.dashBoardFormGroup.controls["name"].setValue("TestDashboard");
        component.dashBoardFormGroup.controls["description"].setValue("This is Test Dashboard");
        component.dashBoardFormGroup.controls["layout"].setValue("TwoColumnLayout");
        fixture.detectChanges();
        //console.log(component.dashBoardFormGroup.value);
        const compiled = fixture.nativeElement as HTMLElement;
        let element = compiled.querySelector("button[type='submit']");
        expect(element?.getAttribute("disabled")).toBeNull();

    });
    it("Check if the Create Button click invokes Create Dashboard Service",()=>{
        component.dashBoardFormGroup.controls["name"].setValue("TestDashboard");
        component.dashBoardFormGroup.controls["description"].setValue("This is Test Dashboard");
        component.dashBoardFormGroup.controls["layout"].setValue("TwoColumnLayout");
        const compiled = fixture.nativeElement as HTMLElement;
        //let element = compiled.querySelector("button[type='submit']");
        let formElement = compiled.querySelector("form");
        formElement?.dispatchEvent(new Event('submit'));
        fixture.detectChanges();
        
        fixture.detectChanges();
        expect(createDashboardSpy).toHaveBeenCalled();
        
    });
    it("Check if the Edit Button is disabled",()=>{
        const compiled = fixture.nativeElement as HTMLElement;
        component.isEditMode=true;
        component.dashBoardItem={id:"dabcdxyz1",name:"Test Dashboard 1",description:"This is Test Dashboard 1",dashboardType:"TwoColumnLayout",elements:[]}
        component.dashboardId="dabcdxyz1";
        component.ngOnInit();
        component.dashBoardFormGroup.controls["name"].setValue("Test Dashboard 1");
        component.dashBoardFormGroup.controls["description"].setValue("This is Test Dashboard 1");
        component.dashBoardFormGroup.controls["layout"].setValue("TwoColumnLayout");
        fixture.detectChanges();
        let element = compiled.querySelector("button[type='submit']");
        expect(element?.getAttribute("disabled")).toEqual("true");
    });
    it("Check if the Edit Button is enabled with proper input",()=>{
        const compiled = fixture.nativeElement as HTMLElement;
        component.isEditMode=true;
        component.ngOnInit();
        component.dashBoardFormGroup.controls["name"].setValue("Test Dashboard 2");
        component.dashBoardFormGroup.controls["description"].setValue("This is Test Dashboard 1");
        component.dashBoardFormGroup.controls["layout"].setValue("TwoColumnLayout");
        fixture.detectChanges();
        let element = compiled.querySelector("button[type='submit']");
        expect(element?.getAttribute("disabled")).toBeNull();
        
    });
    it("Check if Edit button click triggers editDashBoardItem method invocation",()=>{
        const compiled = fixture.nativeElement as HTMLElement;
        component.isEditMode=true;
        component.ngOnInit();
        component.dashBoardFormGroup.controls["name"].setValue("Test Dashboard 2");
        component.dashBoardFormGroup.controls["description"].setValue("This is Test Dashboard 1");
        component.dashBoardFormGroup.controls["layout"].setValue("TwoColumnLayout");
        fixture.detectChanges();
        let formElement=compiled.querySelector("form");
        if(formElement){
            formElement.dispatchEvent(new Event('submit'));
            expect(editDashboardSpy).toHaveBeenCalled();
        }

    });
    afterAll(()=>{
        fixture.destroy();
        TestBed.resetTestingModule();
    });

});

@Component({
    selector: 'test-component',
    template: ''
})

export class TestComponent{}