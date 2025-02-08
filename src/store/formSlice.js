import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  facilityDetails: {
    facilityType: '',
    facilityName: '',
    address: '',
    buildUpArea: '',
    utility: '',
    consumerNumber: '',
    connectedLoad: ''
  },
  basicEnergy: {
    connectionType: '',
    connectedLoadKW: '',
    contractDemandKVA: '',
    billingType: '',
    solarCapacity: ''
  },
  basicBuilding: {
    numberOfBuildings: '',
    buildings: []
  },
  addDetails: {
    building: '',
    floorNumber: '',
    roomName: ''
  },
  buildings: []
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFacilityDetails: (state, action) => {
      state.facilityDetails = { ...state.facilityDetails, ...action.payload };
    },
    updateBasicEnergy: (state, action) => {
      state.basicEnergy = { ...state.basicEnergy, ...action.payload };
    },
    updateBasicBuilding: (state, action) => {
      state.basicBuilding = { ...state.basicBuilding, ...action.payload };
    },
    updateAddDetails: (state, action) => {
      state.addDetails = { ...state.addDetails, ...action.payload };
    },
    addLoad: (state, action) => {
      const { buildingName, floorNumber, roomName, loadType, loadData } = action.payload;
      let building = state.buildings.find(b => b.name === buildingName);
      if (!building) {
        building = { name: buildingName, floors: [] };
        state.buildings.push(building);
      }
      let floor = building.floors.find(f => f.floorNumber === floorNumber);
      if (!floor) {
        floor = { floorNumber, rooms: [] };
        building.floors.push(floor);
      }
      let room = floor.rooms.find(r => r.roomName === roomName);
      if (!room) {
        room = { roomName, loads: { light: [], ventilation: [], system: [], pump: [], airConditioner: [] } };
        floor.rooms.push(room);
      }
      if (room.loads[loadType]) {
        room.loads[loadType]=[(loadData)];
      }
    },
    resetForm: () => initialState
  }
});

export const {
  updateFacilityDetails,
  updateBasicEnergy,
  updateBasicBuilding,
  updateAddDetails,
  addLoad,
  updateLoad,
  resetForm
} = formSlice.actions;

export default formSlice.reducer;
