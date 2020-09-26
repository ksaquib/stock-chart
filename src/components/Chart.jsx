import OHLCChart from "./OHLCChart";
import updatingDataWrapper from "./updatingDataWrapper";

const OHLCChartWithUpdatingData = updatingDataWrapper(OHLCChart);

export default OHLCChartWithUpdatingData;
