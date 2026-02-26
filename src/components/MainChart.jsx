import "@esri/calcite-components/dist/components/calcite-tabs";
import "@esri/calcite-components/dist/components/calcite-tab";
import "@esri/calcite-components/dist/components/calcite-tab-nav";
import "@esri/calcite-components/dist/components/calcite-tab-title";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/calcite/calcite.css";
import {
  CalciteTab,
  CalciteTabs,
  CalciteTabNav,
  CalciteTabTitle,
  CalcitePanel,
  CalciteShellPanel,
} from "@esri/calcite-components-react";
import "@arcgis/map-components/dist/components/arcgis-scene";
import "@arcgis/map-components/components/arcgis-scene";
import LotChart from "./LotChart";
import "../index.css";
import "../App.css";
import StructureChart from "./StructureChart";
import NloChart from "./NloChart";
import ExpropriationList from "./ExpropriationList";
import { primaryLabelColor } from "../uniqueValues";

function MainChart() {
  return (
    <>
      <CalciteShellPanel
        width="1"
        slot="panel-end"
        // position="end"
        id="right-shell-panel"
        displayMode="dock"
      >
        <CalcitePanel
          scale="s"
          collapsible
          heading="Progress Summary"
          headingLevel="h3"
          style={{
            "--calcite-panel-heading-text-color": primaryLabelColor,
            borderStyle: "solid",
            borderRightWidth: 5,
            borderLeftWidth: 5,
            borderBottomWidth: 5,
            // borderTopWidth: 5,
            borderColor: "#555555",
          }}
        >
          <CalciteTabs
            style={{
              borderStyle: "solid",
              borderRightWidth: 1,
              borderLeftWidth: 1,
              borderBottomWidth: 1,
              // borderTopWidth: 5,
              borderColor: "#555555",
            }}
            layout="center"
            scale="m"
          >
            <CalciteTabNav slot="title-group" id="thetabs">
              <CalciteTabTitle class="Land">Land</CalciteTabTitle>
              <CalciteTabTitle class="Structure">Structure</CalciteTabTitle>
              <CalciteTabTitle class="Households">Households</CalciteTabTitle>
              <CalciteTabTitle class="ExproList">ExproList</CalciteTabTitle>
            </CalciteTabNav>

            {/* CalciteTab: Lot */}
            <CalciteTab>
              <LotChart />
            </CalciteTab>

            {/* CalciteTab: Structure */}
            <CalciteTab>
              <StructureChart />
            </CalciteTab>

            {/* CalciteTab: Non-Land Owner */}
            <CalciteTab>
              <NloChart />
            </CalciteTab>

            {/* CalciteTab: List of Lots under Expropriation */}
            <CalciteTab>
              <ExpropriationList />
            </CalciteTab>
          </CalciteTabs>
        </CalcitePanel>
      </CalciteShellPanel>
    </>
  );
}

export default MainChart;
