import { UserChart } from "./chartUser";
import { DashboardConfig } from "./dashboard";
import { PredictXChartConfig } from "./predictXChartConfig";

export interface UserDashboard{
    id:string;
    name: string;
    description: string;
    dashboardType:string;
    //elements: PredictXChartConfig[];
    elements: UserChart[];
}