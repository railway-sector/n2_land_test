import { createContext } from "react";

type MyDropdownContextType = {
  municipals: any;
  barangays: any;
  statusdatefield: any;
  superurgenttype: any;
  datefields: any;
  timesliderstate: any;
  updateMunicipals: any;
  updateBarangays: any;
  updateStatusdatefield: any;
  updateSuperurgenttype: any;
  updateDatefields: any;
  updateTimesliderstate: any;
};

const initialState = {
  municipals: undefined,
  barangays: undefined,
  statusdatefield: undefined,
  superurgenttype: undefined,
  datefields: undefined,
  timesliderstate: undefined,
  updateMunicipals: undefined,
  updateBarangays: undefined,
  updateStatusdatefield: undefined,
  updateSuperurgenttype: undefined,
  updateDatefields: undefined,
  updateTimesliderstate: undefined,
};

export const MyContext = createContext<MyDropdownContextType>({
  ...initialState,
});
