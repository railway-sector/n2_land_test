import "@arcgis/map-components/components/arcgis-time-slider";
import { primaryLabelColor } from "../uniqueValues";
import { MyContext } from "../contexts/MyContext";
import { use } from "react";
import { generateLotData, updateLotSymbology } from "../Query";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import {
  lotDefaultSymbol,
  lotLayer,
  lotLayerRenderer,
  lotLayerRendererUniqueValueInfos,
} from "../layers";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";

export default function Timeslider() {
  const {
    municipals,
    barangays,
    updateStatusdatefield,
    datefields,
    updateTimesliderstate,
    updateAsofdate,
    updateLatestasofdate,
    updateDateforhandedover,
  } = use(MyContext);
  const arcgisScene = document.querySelector("arcgis-scene");
  // const timeSlider = document.querySelector("arcgis-time-slider");

  arcgisScene?.viewOnReady(() => {
    arcgisScene?.whenLayerView(lotLayer).then((layerView) => {
      const timeSlider = document.querySelector("arcgis-time-slider");

      const dateCollect = [];
      datefields.map((date, index) => {
        const yyyy = Number(date.slice(1, 5));
        const desired_mm = Number(date.slice(5, 7));
        const mm = desired_mm - 1;
        const dd = new Date(yyyy, desired_mm, 0).getDate();
        const final = new Date(yyyy, mm, dd);
        dateCollect.push(final);
      });

      timeSlider.fullTimeExtent = {
        start: dateCollect[0],
        end: dateCollect[dateCollect.length - 1],
      };

      // timeSlider.stops = {
      //   interval: {
      //     value: 1,
      //     unit: "months",
      //   },
      // };

      timeSlider.stops = {
        dates: dateCollect,
      };

      reactiveUtils.watch(
        () => timeSlider?.timeExtent,
        (timeExtent) => {
          if (timeExtent) {
            const year = timeExtent.end.getFullYear();
            const month = timeExtent.end.getMonth() + 1;
            const day = timeExtent.end.getDate();

            // for 'As of' date in chart panel
            const c_month = timeExtent.end.toLocaleString("en-US", {
              month: "long",
            });
            updateAsofdate(`${c_month} ${day}, ${year}`);

            // Date for filtering handed-over lots number
            updateDateforhandedover(`${year}-${month}-${day}`);

            //
            const new_date_field =
              month <= 9 ? `x${year}0${month}` : `x${year}${month}`;

            updateLotSymbology(new_date_field);
            updateStatusdatefield(new_date_field);
          }
        },
      );
    });
  });

  return (
    <>
      <span style={{ fontSize: "16px", color: "#d1d5db", margin: "auto" }}>
        Historical Progress on Land Acquisition
      </span>
      <div>
        <arcgis-time-slider
          referenceElement="arcgis-map"
          slot="bottom"
          layout="auto"
          mode="time-window"
          onarcgisPropertyChange={(event) => {
            // console.log(event.srcElement.state);
            updateTimesliderstate(true);
          }}
        ></arcgis-time-slider>
      </div>
    </>
  );
}
