import { PredictXChartConfig } from "./predictXChartConfig";
import { DashboardConfig } from "./dashboard";

export interface DashboardDataConfig{
    dashboard: DashboardConfig,
    chartElements: PredictXChartConfig[]
}