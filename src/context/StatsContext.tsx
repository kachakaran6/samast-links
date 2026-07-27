import {
  initiaStatsState,
  statsActionTypes,
  statsReducer,
} from "@/hooks/reducers/statsReducer";
import { createContext, useContext, useReducer } from "react";

// Create a context
interface StatsContextProps {
  stats: any;
  viewsData: any;
  updateStatsData: (data: any) => void;
  updateViews: (data: any) => void;
  filterUniqueElements: (array: any) => any[];
}

const StatsContext = createContext<StatsContextProps>({
  ...initiaStatsState,
  updateStatsData: () => {},
  updateViews: () => {},
  filterUniqueElements: () => [],
});

// Create a provider component
export function StatsProvider({ children }: any) {
  const [state, dispatch] = useReducer(statsReducer, initiaStatsState);

  const updateStatsData = (data: any) => {
    dispatch({ type: statsActionTypes.SET_STATS_DATA, payload: data });
  };

  const filterUniqueElements = (array: any) => {
    const uniqueElementsMap = new Map();

    array.forEach((element: any) => {
      const { ip_address } = element;
      if (!uniqueElementsMap.has(ip_address)) {
        uniqueElementsMap.set(ip_address, element);
      }
    });

    return Array.from(uniqueElementsMap.values());
  };

  const updateViews = (data: any) => {
    dispatch({ type: statsActionTypes.SET_VIEWS_DATA, payload: data });
  };

  const contextValue = {
    ...state,
    updateStatsData,
    updateViews,
    filterUniqueElements,
  };

  return (
    <StatsContext.Provider value={contextValue}>
      {children}
    </StatsContext.Provider>
  );
}

// Create a custom hook to use the context
export function useStatsContext() {
  return useContext(StatsContext);
}
