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
    latestasofdate,
    updateTimesliderstate,
    updateAsofdate,
    updateLatestasofdate,
    updateDateforhandedover,
    updateHandedoverDatefield,
    updateHandedoverAreafield,
    updateAffectedAreafield,
  } = use(MyContext);
  const arcgisScene = document.querySelector("arcgis-scene");
  // const timeSlider = document.querySelector("arcgis-time-slider");

  arcgisScene?.viewOnReady(() => {
    // arcgisScene?.whenLayerView(lotLayer).then((layerView) => {
    const timeSlider = document.querySelector("arcgis-time-slider");

    console.log(datefields);

    const dateCollect = [];
    datefields.map((date, index) => {
      const yyyy = Number(date.slice(1, 5));
      const desired_mm = Number(date.slice(5, 7));
      const dd = Number(date.slice(7, 9));
      const mm = desired_mm - 1;
      const final = new Date(yyyy, mm, dd);
      dateCollect.push(final);
    });

    const updatedDateCollect = [...dateCollect.slice(0, -1), latestasofdate];

    timeSlider.fullTimeExtent = {
      start: dateCollect[0],
      // end: dateCollect[dateCollect.length - 1].push(latestasofdate),
      end: latestasofdate,
    };

    // timeSlider.stops = {
    //   interval: {
    //     value: 1,
    //     unit: "months",
    //   },
    // };

    console.log(updatedDateCollect);
    timeSlider.stops = {
      dates: updatedDateCollect,
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

          const yyyy0mdd = `x${year}0${month}${day}`;
          const yyyymmdd = `x${year}${month}${day}`;

          // Updating status field:
          const new_date_field = month <= 9 ? yyyy0mdd : yyyymmdd;
          console.log(new_date_field);
          updateLotSymbology(new_date_field);
          updateStatusdatefield(new_date_field);

          // Updating Handed-Over Area field:
          const new_handedoverarea_field =
            month <= 9 ? `${yyyy0mdd}_HOA` : `${yyyymmdd}_HOA`;
          updateHandedoverAreafield(new_handedoverarea_field);

          // Updating Affected-Area field:
          const new_affectedarea_field =
            month <= 9 ? `${yyyy0mdd}_TAA` : `${yyyymmdd}_TAA`;
          updateAffectedAreafield(new_affectedarea_field);
        }
      },
    );
    // });
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
