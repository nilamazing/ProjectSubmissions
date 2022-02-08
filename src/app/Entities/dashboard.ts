import { UserChart } from "./chartUser";
import { PredictXChartConfig } from "./predictXChartConfig";

export interface DashboardConfig{
    type: string;
    desc:string; 
    columns: number;
    elements:string[];
}