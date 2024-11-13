import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const FunnelChart = () => {
    useEffect(() => {
        const root = am5.Root.new("chartdiv");
        root.setThemes([am5themes_Animated.new(root)]);
        const chart = root.container.children.push(
            am5percent.SlicedChart.new(root, {
                layout: root.verticalLayout
            })
        );
        const series = chart.series.push(
            am5percent.FunnelSeries.new(root, {
                alignLabels: true,
                orientation: "horizontal",
                valueField: "value",
                categoryField: "category",
                bottomRatio: 0.5
            })
        );

        series.data.setAll([
            { value: 250, category: "Awareness" },
            { value: 180, category: "Interest" },
            { value: 130, category: "Consideration" },
            { value: 90, category: "Intent" },
            { value: 60, category: "Evaluation" },
            { value: 40, category: "Decision" }
        ]);


        series.slices.template.setAll({
            fillOpacity: 0.8,
            width: am5.percent(85)
        });


        const legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50,
                marginTop: 20,
                marginBottom: 20,
                useDefaultMarker: true
            })
        );

        legend.data.setAll(series.dataItems);
        chart.appear(1500, 200);
        return () => {
            root.dispose();
        };
    }, []);

    return (
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <div
                id="chartdiv"
                style={{ width: "50%", maxWidth: "400px", height: "500px" }}
            ></div>
        </div>
    );
};

export default FunnelChart;
