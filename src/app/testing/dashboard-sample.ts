import { UserDashboard } from "../Entities/userDashboard";

export const testDashBoard:UserDashboard={
    id: "d3d1nidt64ua",
    name: "Dashboard 1",
    description: "This is Dashboard 1",
    dashboardType: "TwoColumnLayout",
    elements:[{
        id: "d3d1nidt64ua-chart0",
        name: "Chart 1",
        chartType: "SplineChart",
        chartConfig:{
            "name": "SplineChart",
            "config": {
                "chart": {
                    "type": "spline"
                },
                "title": {
                    "text": "Monthly Average Temperature"
                },
                "subtitle": {
                    "text": "Source: WorldClimate.com"
                },
                "xAxis": {
                    "categories": [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec"
                    ]
                },
                "yAxis": {
                    "title": {
                        "text": "Temperature °C"
                    },
                    "lineWidth": 2
                },
                "tooltip": {
                    "crosshairs": true,
                    "shared": true
                },
                "plotOptions": {
                    "spline": {
                        "marker": {
                            "radius": 4,
                            "lineColor": "#666666",
                            "lineWidth": 1
                        }
                    }
                },
                "series": [
                    {
                        "name": "Tokyo",
                        "marker": {
                            "symbol": "square"
                        },
                        "data": [
                            7,
                            6.9,
                            9.5,
                            14.5,
                            18.2,
                            21.5,
                            25.2,
                            {
                                "y": 26.5,
                                "marker": {
                                    "symbol": "url(http://www.highcharts.com/demo/gfx/sun.png)"
                                }
                            },
                            23.3,
                            18.3,
                            13.9,
                            9.6
                        ]
                    },
                    {
                        "name": "London",
                        "marker": {
                            "symbol": "diamond"
                        },
                        "data": [
                            {
                                "y": 3.9,
                                "marker": {
                                    "symbol": "url(http://www.highcharts.com/demo/gfx/snow.png)"
                                }
                            },
                            4.2,
                            5.7,
                            8.5,
                            11.9,
                            15.2,
                            17,
                            16.6,
                            14.2,
                            10.3,
                            6.6,
                            4.8
                        ]
                    }
                ]
            }
        }
    },{
        id:"d3d1nidt64ua-chart1",
        name: "Chart 2",
        chartType:"PieChart",
        chartConfig:{
            "name": "PieChart",
            "config": {
                "chart": {
                    "plotBorderWidth": null,
                    "plotShadow": false
                },
                "title": {
                    "text": "Browser market shares at a specific website, 2014"
                },
                "tooltip": {
                    "pointFormat": "{series.name}: <b>{point.percentage:.1f}%</b>"
                },
                "plotOptions": {
                    "pie": {
                        "shadow": false,
                        "center": [
                            "50%",
                            "50%"
                        ],
                        "size": "45%",
                        "innerSize": "20%"
                    }
                },
                "series": [
                    {
                        "type": "pie",
                        "name": "Browser share",
                        "data": [
                            [
                                "Firefox",
                                45
                            ],
                            [
                                "IE",
                                26.8
                            ],
                            {
                                "name": "Chrome",
                                "y": 12.8,
                                "sliced": true,
                                "selected": true
                            },
                            [
                                "Safari",
                                8.5
                            ],
                            [
                                "Opera",
                                6.2
                            ],
                            [
                                "Others",
                                0.7
                            ]
                        ]
                    }
                ]
            }
        }
    }]
}