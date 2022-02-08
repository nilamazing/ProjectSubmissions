Technical Components
---------------------
Angular CLI: 13.1.4
Node: 14.17.5
Package Manager: npm 6.14.14
Angular material: 13
Highcharts: 9
Highcharts-Angular: 3

Application Summary
---------------------

This is the Configurable Dashboard Application with Configurable Charts and Layouts

Below are the major components :-

Major Components
----------------

1. Header Component
   ----------------
   This consists of the Application Name and a link to "My Dashboards" and "Create Dashboard" components. 
   
2. Home Component/Dashboard List Component
   ---------------------------------------
   Contains the List of Dashboards the user has created. This is List so please click to expand to see the details. Each contains the summary of the Dashboard with a 
	  Detail,Edit and Delete Link.

3. Dashboard Detail Component
   --------------------------
	a. Contains Dashboard Detail which displays the Chart Elements in a Table with each row consisting of Link to individual Chart Element and delete button.
	b. This contains a display plane to display all the added chart elements based on the Dashboard Layout selected.
	
4. Dashboard Create Component
   ---------------------------
   This provides the option to Create a dashboard by enabling user to input name,description and Layout Option (which is the type of Dashboard as per the configuration).
   
5. Dashboard Edit Component
   --------------------------
   This provides the option to edit an existing dashboard by enabling user to change name,description and Layout Option.(This used the Dashboard Create Component)

6. Chart Create Element
   -------------------------
   a. This provides the option to Create a chart by enabling user to input name and type of chart allowed by the dashboard.
   b. This contains button to Preview the chart
   
7. Chart Edit Element (uses the Chart Create Element)
   ----------------------
   a. This provides the option to Edit a chart by enabling user to change name and type of chart allowed by the dashboard.
   b. This contains button to Preview the chart 
   
Misc Features
-------------
1. Major Angular Features are used as much possible.
2. Material theme and components is used as much possible.
3. Angular Highcharts package is used.
4. Jasmine Karma Test cases are added (Tried to cover the major functional flows).
5. Although this does not use any backend code to interact with the Application Data, Observables are used in some cases.

Assumptions
-----------
1. Configurations used for Dashboard.
2. Static Configurations used for Chart Elements (BasicAreaChart,SplineChart,InvertedSplineChart,BasicColumnChart and PieChart).
3. Configurations used for Layout (TwoColumnLayout,ThreeColumnLayout).

Drawbacks
----------
1. With ThreeColumnLayout some visual drawback is there for the Chart Elements in Dashboard Detail Component due to space constraint. With TwoColumnLayout this is not an issue.
2. The styling aspect of the application is not up to the mark.
   
 