import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HighchartsChartModule } from 'highcharts-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import {HttpClientModule} from '@angular/common/http';
import { ConfigService } from './services/config.service';
import { DashboardConfig } from './Entities/dashboard';
import { PredictXChartConfig } from './Entities/predictXChartConfig';
import { DashboardService } from './services/dashboard.state.service';
import { DashboardList } from './components/dashboard/dashboard.list';
import { HeaderComponent } from './components/header/header.component';
import { DashboardCreate } from './components/dashboard/dashboard.create';
import { DashboardDetailComponent } from './components/dashboard/dashboard.detail';
import { AppStatusDialog } from './components/dialog/dialog.component';
import { ChartMapDisplayMapComponent } from './components/chart/chart-map-display.component';
import { ChartCoreComponent } from './components/chart/chart.core.component';

// This data ideally comes from the Service so we can cache the data in backend for enhanced performance

const appInitializerFn=(configService:ConfigService,dashboardService:DashboardService)=>{
  return ()=>{
    return configService.loadConfigs("../assets/configs/dashboard-layout.json").subscribe({
      next:(dashBoardData:DashboardConfig[])=>{
        //console.log("Got Dashboard Data from AppInit");
        // console.log(dashBoardData);
         configService.loadConfigs("../assets/configs/elements-coll.json").subscribe({
           next:(chartElementData:PredictXChartConfig[])=>{
            //console.log("Fetched Chart Elements");
            //console.log(chartElementData);
            dashboardService.restructureDashBoardConfigData(dashBoardData,chartElementData);
           },
           error:(chartElErr)=>{
            console.log("Encountered error from AppInit while fetching Chart Element");
            console.error(chartElErr);
           }
         })
      },
      error:(err)=>{
        console.log("Encountered error from AppInit");
        console.error(err);
      }
    })
  }
}
@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    DashboardList,
    HeaderComponent,
    DashboardCreate,
    DashboardDetailComponent,
    AppStatusDialog,
    ChartMapDisplayMapComponent,
    ChartCoreComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HighchartsChartModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
    
  ],
  providers: [
    ConfigService,
    DashboardService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      deps:[ConfigService,DashboardService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
