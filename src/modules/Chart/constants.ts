export const getOptions = (ohlc: any, volume: any): Highcharts.Options => {
  console.log(ohlc, volume);

  return {
    rangeSelector: {
      selected: 2,
      buttons: [
        { type: "month", count: 1, text: "1m" },
        { type: "month", count: 3, text: "3m" },
        { type: "all", text: "All" },
      ],
    },
    title: { text: "Demo Candlestick with Volume" },
    // time: { useUTC: false },
    yAxis: [
      {
        height: "70%",
        labels: { align: "right", x: -4 },
        title: { text: "Price" },
        lineWidth: 1,
      },
      {
        top: "72%",
        height: "28%",
        offset: 0,
        labels: { align: "right", x: -4 },
        title: { text: "Volume" },
        lineWidth: 1,
      },
    ],
    tooltip: { split: true },
    series: [
      {
        type: "candlestick",
        data: ohlc,
        dataGrouping: {
          units: [
            ["week", [1]],
            ["hour", [1, 4]],
            ["day", [1]],
            ["minute", [1, 15, 30]],
          ],
        },
      },
      {
        type: "column",
        name: "Volume",
        data: volume,
        yAxis: 1,
        pointPadding: 0,
        groupPadding: 0,
        dataGrouping: { enabled: true },
      },
    ],
    credits: { enabled: false },
    exporting: { enabled: true },
    navigator: { enabled: true },
    scrollbar: { enabled: true },
  };
};
