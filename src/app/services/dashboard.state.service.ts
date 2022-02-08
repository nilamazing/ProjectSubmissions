import { Injectable } from "@angular/core";
import { PredictXChartConfig } from "../Entities/predictXChartConfig";
import { DashboardConfig } from "../Entities/dashboard";
import { DashboardDataConfig } from "../Entities/dashboardDataConfig";
import { UserDashboard } from "../Entities/userDashboard";
import { BehaviorSubject, Observable, Observer, Subject, throwError } from "rxjs";
import { LayoutInfo } from "../Entities/layoutInfo";
import { UserChart } from "../Entities/chartUser";

@Injectable()

export class DashboardService {
    layoutColl: LayoutInfo[] = [];
    dashboardDataAll: DashboardDataConfig[] = [];
    userDashBoards: UserDashboard[] = [];
    // required the last emitted value so used BehaviorSubject instead of Subject
    userDashBoards$: BehaviorSubject<UserDashboard[]> = new BehaviorSubject<UserDashboard[]>([]);
    dashboardTypes: string[] = [];
    constructor() {

    }

    restructureDashBoardConfigData(dashboards: DashboardConfig[], chartElements: PredictXChartConfig[]) {
        let dashboardData: DashboardDataConfig;
        let targetElements = null;
        if (dashboards && dashboards.length > 0) {
            this.dashboardTypes = [];
            dashboards.forEach(dashboard => {
                dashboardData = { dashboard: dashboard, chartElements: [] };
                this.dashboardTypes.push(dashboard.type);
                if (dashboard.elements && dashboard.elements.length > 0) {
                    dashboard.elements.forEach(el => {
                        targetElements = chartElements.filter(cel => cel.name === el);
                        if (targetElements && targetElements.length > 0) {
                            dashboardData.chartElements.push(targetElements[0]);
                        }
                    })
                    if (dashboardData) {
                        this.dashboardDataAll.push(dashboardData);
                    }
                }
            });

        }

    }

    subscribeToUserDashBoardStream(): Subject<UserDashboard[]> {
        return this.userDashBoards$;
    }
    getDashBoardDataConfig() {
        return [...this.dashboardDataAll];
    }
    getDashboardTypes() {
        return [...this.dashboardTypes];
    }
    createDashBoard(userDashBoard: UserDashboard): boolean {
        let createStatus = false;
        try {
            if (userDashBoard) {
                userDashBoard.id = 'd' + Math.random().toString(36).substring(2)
                this.userDashBoards.push(userDashBoard);
                this.userDashBoards$.next([...this.userDashBoards]);
                createStatus = true;
            }
        }
        catch (err) {
            console.log("Error encountered in creating dashboard");
            console.error(err);
        }
        return createStatus;
    }
    deleteDashBoard(userDashBoardId: string): boolean {
        let isDashboardDelSuccess = false;
        try {
            this.userDashBoards = this.userDashBoards.filter(ud => ud.id !== userDashBoardId);
            this.userDashBoards$.next([...this.userDashBoards]);
            isDashboardDelSuccess = true;
            // console.log("In deleteDashBoard");
            // console.log(this.userDashBoards);
        }
        catch (err) {
            console.log("Error in deleting dashboard");
            console.log(err);
        }
        return isDashboardDelSuccess;
    }
    editDashBoardItem(dashBoardItem: { id: string, name: string, description: string, dashboardType: string }): Observable<boolean> {
        let editStatus=false;
        try {
            let dashBoardItems = this.userDashBoards.filter(ud => ud.id === dashBoardItem.id);
            if (dashBoardItems && dashBoardItems.length > 0) {

                // This returns a new Object..the old object reference is lost..suspending it
                // dashBoardItems[0] = {
                //     ...dashBoardItems[0],
                //     ...dashBoardItem
                // }
                dashBoardItems[0].name = dashBoardItem.name;
                dashBoardItems[0].description = dashBoardItem.description;
                dashBoardItems[0].dashboardType = dashBoardItem.dashboardType;
                //console.log(this.userDashBoards);
                editStatus=true;
            }
            this.userDashBoards$.next([...this.userDashBoards]);
         }
        catch (err: any) {
            return throwError(() => err);
        }
        return new Observable((observer: Observer<boolean>) => {
            observer.next(editStatus);
            observer.complete();
        });
    }
    getDashboardItem(dashBoardId: string): (UserDashboard | null) {
        let dashboardItems = this.userDashBoards.filter(ud => ud.id === dashBoardId);
        return (dashboardItems && dashboardItems.length > 0) ? dashboardItems[0] : null;
    }
    retrieveChartElementsForDashBoard(dashBoardId: string): PredictXChartConfig[] {
        let dashboardConfigs = null;
        let targetDashBoardConfig = null;
        let dashboardItem = this.userDashBoards.find(ud => ud.id === dashBoardId);
        if (dashboardItem) {
            dashboardConfigs = this.getDashBoardDataConfig();
            if (dashboardConfigs && dashboardConfigs.length > 0) {
                targetDashBoardConfig = dashboardConfigs.find(dashBoardConfig => {
                    return dashBoardConfig.dashboard.type === dashboardItem?.dashboardType
                });
            }
        }
        return targetDashBoardConfig ? targetDashBoardConfig.chartElements : [];
    }

    addChartToDashboard(chartData: { name: string, chartType: string, chartConfig: PredictXChartConfig }, usrDashboardId?: string): boolean {
        let usrDashboard: (UserDashboard | undefined);
        let chartAddStatus = false;
        let currChartCount = 0;
        try {
            if (usrDashboardId) {
                //usrDashboard.elements.push(chart);
                usrDashboard = this.userDashBoards.find(dashboard => { return dashboard.id === usrDashboardId });
                if (usrDashboard) {
                    currChartCount = usrDashboard.elements ? usrDashboard.elements.length : 0;
                    usrDashboard.elements.push({ id: `${usrDashboard.id}-chart${currChartCount}`, ...chartData });
                    chartAddStatus = true;
                    // console.log("Logging Modified User Dashboard");
                    // console.log(this.userDashBoards);
                }
            }
        }
        catch (err) {
            console.log("Error in adding Chart to dashboard");
            console.log(err);
        }
        return chartAddStatus;
    }
    // addChartToDashboardDummy():boolean{
    //     return (new Date().getFullYear()===2022)?true:false;
    // }
    deleteChartFromDashboard(userChartId: string, userDashBoard: (UserDashboard | undefined)): boolean {
        //userDashBoard?.elements=userDashBoard?.elements.filter(el=>el.id!==userChartId);
        let isDelSuccess = false;
        let targetUserDashboards: UserDashboard[];
        try {
            if (userDashBoard) {
                userDashBoard.elements = userDashBoard.elements.filter(el => el.id !== userChartId);
                targetUserDashboards = this.userDashBoards.filter(ud => ud.id === userDashBoard.id);
                if (targetUserDashboards && targetUserDashboards.length > 0) {
                    targetUserDashboards[0] = userDashBoard;
                    this.userDashBoards$.next(this.userDashBoards);
                    isDelSuccess = true;
                }
            }
        }
        catch (err) {
            console.log("Error in deleting Chart from dashboard");
            console.log(err);
        }
        return isDelSuccess;
    }
    getAllLayouts(): LayoutInfo[] {
        return [...this.layoutColl];
    }
    setLayouts(layouts: LayoutInfo[]) {
        this.layoutColl = layouts;
    }
    getChartItem(dashBoardId: string, chartId: string): (UserChart | null) {
        let userDashboard = this.getDashboardItem(dashBoardId);
        let userChartItems: UserChart[];
        if (userDashboard) {
            userChartItems = userDashboard.elements.filter(chart => chart.id === chartId);
            if (userChartItems && userChartItems.length) {
                return userChartItems[0];
            }
        }
        return null;
    }
    updateChartItemForDashboard(dashBoardId: string, userChart: (UserChart | null)): Observable<boolean> {
        let editStatus=false;
        try {
            let userDashboard = this.getDashboardItem(dashBoardId);
            let targetUserCharts;
            
            if (userDashboard) {
                targetUserCharts = userDashboard.elements.filter(uc => uc.id === userChart?.id);
                if (targetUserCharts && targetUserCharts.length > 0) {

                    // These extra logics are only for strict typescript compile time checks
                    if(userChart){
                        targetUserCharts[0]=userChart;
                        this.userDashBoards$.next([...this.userDashBoards]);
                        editStatus=true;
                    }
                }
            }
        }
        catch (err) {
            throwError(() => err);
        }
        return new Observable((observer: Observer<boolean>) => {
            observer.next(editStatus);
            observer.complete();
        });
    }

}