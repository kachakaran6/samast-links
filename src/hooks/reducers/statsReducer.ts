import { viewsCardData } from "@/constants";

export const initiaStatsState = {
  statsLoading: true,
  selectedLinkStats: [],
  stats: [],
  viewsData: viewsCardData,
};

export const statsActionTypes = {
  SET_STATS_LOADING: "SET_STATS_LOADING",
  SET_SELECTED_LINK_STATS: "SET_SELECTED_LINK_STATS",
  SET_STATS_DATA: "SET_STATS_DATA",
  SET_VIEWS_DATA: "SET_VIEWS_DATA",
};

export const statsReducer = (state: any, action: any) => {
  switch (action.type) {
    case statsActionTypes.SET_STATS_LOADING:
      return { ...state, statsLoading: action.payload };
    case statsActionTypes.SET_SELECTED_LINK_STATS:
      return { ...state, selectedLinkStats: action.payload };
    case statsActionTypes.SET_STATS_DATA:
      return { ...state, stats: action.payload };
    case statsActionTypes.SET_VIEWS_DATA:
      return { ...state, viewsData: action.payload };
    default:
      return state;
  }
};
