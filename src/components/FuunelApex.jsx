import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = () => {
    const [state] = useState({
        series: [
            {
                name: "Funnel Series",
                data: [1380, 1100, 990, 880, 740, 548, 330, 200],  // Candidate data
            },
        ],
        options: {
            chart: {
                type: "bar",
                height: 350,
            },
            plotOptions: {
                bar: {
                    borderRadius: 0,
                    horizontal: true,
                    barHeight: "80%",
                    isFunnel: true,

                    barWidth: '100%',
                    distributed: true,
                },
            },
            dataLabels: {
                enabled: true,
                formatter: function (val, opt) {
                    return opt.w.globals.labels[opt.dataPointIndex] + ": " + val;
                },
                dropShadow: {
                    enabled: true,
                },
            },
            title: {
                text: "Recruitment Funnel",
                align: "middle",
            },
            xaxis: {
                categories: [
                    "Sourced",
                    "Screened",
                    "Assessed",
                    "HR Interview",
                    "Technical",
                    "Verify",
                    "Offered",
                    "Hired",
                ],
            },
            yaxis: {
                labels: {
                    show: true,
                },
                title: {
                    text: "Number of Candidates",
                },
            },
            legend: {
                show: false,
            },
        },
    });

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="bar"
                    height={350}
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default ApexChart;
