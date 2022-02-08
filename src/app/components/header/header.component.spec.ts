import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/material-module';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule
            ],
            declarations: [
                HeaderComponent
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component=fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should have the header text 'Predictx Dashboard Application'", () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('mat-toolbar span')?.textContent).toContain('Predictx Dashboard Application');
    });

    it("should contain the menu items", () => {
        const compiled = fixture.nativeElement as HTMLElement;
        let elements = fixture.debugElement.queryAll(By.css('mat-button-wrapper'));
        if (elements && elements.length == 2) {
            expect(elements[0].nativeElement.innerHTML).toEqual('My Dashboards');
            expect(elements[0].nativeElement.innerHTML).toEqual('Create Dashboard');
        }
    });
    it("should contain the router links", () => {
        const compiled = fixture.nativeElement as HTMLElement;
        let elements = compiled.querySelectorAll("li a");
        if(elements && elements.length>0){
            expect(elements[0].getAttribute("routerlink")).toEqual('/');
            expect(elements[1].getAttribute("routerlink")).toEqual('/dashboard/create');
        }
    });
    afterAll(()=>{
        fixture.destroy();
        TestBed.resetTestingModule();
    });
});