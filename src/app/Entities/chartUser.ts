import { PredictXChartConfig } from "./predictXChartConfig";

export interface UserChart{
    id: string;
    name: string;
    chartType: string;
    chartConfig: PredictXChartConfig
}