import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { BarSeries, OHLCSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateY,
  MouseCoordinateX,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { change } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class OHLCChartWithElderRayIndicator extends React.Component {
  render() {
    const changeCalculator = change();

    const { data: initialData, width, ratio } = this.props;

    const calculatedData = changeCalculator(initialData);
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      (d) => {
        if (d.timestamp) {
          const a = d.timestamp;
          const str_a = a.toString();
          const result = Number(str_a.slice(0, 10));
          return new Date(result * 1000);
        }
      }
    );
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      calculatedData
    );

    const start = xAccessor(last(data));
    console.log(start);
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    console.log(xScale);
    const xExtents = [start, end];
    console.log(width);
    return (
      <ChartCanvas
        height={400}
        width={width}
        ratio={ratio}
        margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
        seriesName="MSFT"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >
        <Chart
          id={1}
          height={350}
          yExtents={(d) => {
            return [d.high, d.low];
          }}
          padding={{ top: 10, right: 0, bottom: 20, left: 0 }}
        >
          <YAxis axisAt="right" orient="right" ticks={10} />
          <XAxis axisAt="bottom" orient="bottom" />

          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")}
          />

          <OHLCSeries />
          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={(d) => d.close}
            fill={(d) => (d.close > d.open ? "#6BA583" : "#FF0000")}
          />

          <OHLCTooltip origin={[-40, -10]} />
        </Chart>
        <Chart
          id={2}
          height={150}
          yExtents={(d) => d.volume}
          origin={(w, h) => [0, h - 150]}
        >
          <YAxis
            axisAt="left"
            orient="left"
            ticks={5}
            tickFormat={format(".2s")}
          />
          <MouseCoordinateY
            at="left"
            orient="left"
            displayFormat={format(".4s")}
          />

          <BarSeries
            yAccessor={(d) => d.volume}
            fill={(d) => (d.close > d.open ? "#6BA583" : "#FF0000")}
            opacity={0.4}
          />
        </Chart>

        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}

OHLCChartWithElderRayIndicator.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

OHLCChartWithElderRayIndicator.defaultProps = {
  type: "svg",
};
OHLCChartWithElderRayIndicator = fitWidth(OHLCChartWithElderRayIndicator);

export default OHLCChartWithElderRayIndicator;
