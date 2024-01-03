import { nivoTheme } from "~/styles/nivo_theme";
import { ResponsiveLine } from "@nivo/line"
import { TransactionSummary } from "~/utils/db_methods/transactions"
import { NivoChartLineData } from "~/utils/genericTypes";
import styles from "./styles.module.css"


function calculateNextDate(currentDate: string) {
    let expectedXDate = new Date(currentDate);
    expectedXDate.setMonth(expectedXDate.getMonth() + 1);
    return `${expectedXDate.getFullYear()}-${(expectedXDate.getMonth() + 1).toString().padStart(2, '0')}`
}

function fillMissingValues(providerData: { x: string; y: number; }[], latestGeneralDate: string) {
    let latestProviderDate = providerData[providerData.length - 1].x
    let latestProviderAmount = providerData[providerData.length - 1].y
    // Check missing values inbetween its boundaries
    for (let index = 0; index < providerData.length; index++) {
        let nextIndex = index + 1
        if (nextIndex == providerData.length) {
            break
        }
        let expectedX = calculateNextDate(providerData[index].x)
        while (providerData[nextIndex].x != expectedX) {
            providerData.push({ x: expectedX, y: providerData[index].y });
            nextIndex = nextIndex + 1;
            expectedX = calculateNextDate(providerData[index].x);
        }
    }

    if (latestProviderDate < latestGeneralDate) {
        latestProviderDate = calculateNextDate(latestProviderDate);
        providerData.push({ x: latestProviderDate, y: latestProviderAmount });
    }
    return providerData
}

export function NetworthSummaryGraph(props: { summaryData: TransactionSummary[] }) {
    type TDynamicObject = { [key: string]: number }
    let chartData: NivoChartLineData = [];
    let totalPerMonth: TDynamicObject = {}
    let provider_indexes: TDynamicObject = {};
    let latestGeneralDate: string = "";
    const prismaData = props.summaryData

    for (let index = 0; index < prismaData.length; index++) {
        const { provider, x, y } = prismaData[index];
        if (latestGeneralDate < x) {
            latestGeneralDate = x;
        }
        // Set chartData provider index if not already seen
        provider_indexes[provider] ??= chartData.length;

        const chartDataIndex = provider_indexes[provider]
        if (chartData[chartDataIndex] == undefined) {
            chartData[chartDataIndex] = {
                id: provider,
                color: "hsl(121, 70%, 50%)",
                data: []

            };
        }
        chartData[chartDataIndex].data.push({ "x": x, "y": y });
    }
    for (let index = 0; index < chartData.length; index++) {
        chartData[index].data = fillMissingValues(chartData[index].data, latestGeneralDate)
    }

    for (let index = 0; index < chartData.length; index++) {
        const providerData = chartData[index].data
        for (let dataIndex = 0; dataIndex < providerData.length; dataIndex++) {
            totalPerMonth[providerData[dataIndex].x] = totalPerMonth[providerData[dataIndex].x] == null ? providerData[dataIndex].y : totalPerMonth[providerData[dataIndex].x] + providerData[dataIndex].y;
        }
    }
    const chartDataTotal = [];
    for (const [key, value] of Object.entries(totalPerMonth)) {
        chartDataTotal.push({ "x": key, "y": value })
    }
    chartData.push({
        id: "Total",
        color: "hsl(121, 70%, 50%)",
        data: chartDataTotal
    })


    return <ResponsiveLine
        theme={nivoTheme}
        data={chartData}
        yScale={{
            type: "linear",
            stacked: false
        }}
        yFormat=" >-$.2f"
        useMesh={true}
        enableSlices={"x"}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        curve="natural"
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Year-Month',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 115,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 20,
                itemsSpacing: 4,
                symbolSize: 20,
                symbolShape: 'circle',
                itemDirection: 'left-to-right',
                itemTextColor: '#777',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
}