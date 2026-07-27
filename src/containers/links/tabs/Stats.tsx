import ViewsCard from "@/components/link/stats/ViewsCard";
import { useLinkContext } from "@/context/LinkContext";
import { useStatsContext } from "@/context/StatsContext";
import {
  initiaStatsState,
  statsActionTypes,
  statsReducer,
} from "@/hooks/reducers/statsReducer";
import { getStatsByLinkId } from "@/lib/supabase/api";
import {
  filterElementsByDay,
  filterElementsByDays,
  showToast,
} from "@/lib/utils";
import { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import ComingSoon from "@/components/shared/ComingSoon";
// import Chart from "react-apexcharts";

const Stats = ({
  selectedLink,
  refreshStats,
  setBtnLoading,
  setIsBtnClicked,
}: any) => {
  const { link_id } = useParams();
  const navigate = useNavigate();
  const { links, linksLoading } = useLinkContext();
  const [state, dispatch] = useReducer(statsReducer, initiaStatsState);
  // const [options] = useState({
  //   chart: {
  //     id: "chart-data",
  //   },
  //   stroke: {
  //     width: 2,
  //   },
  //   xaxis: {
  //     categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  //   },
  //   colors: ["#2fbfff"],
  // });

  // const [series] = useState([
  //   {
  //     name: "series-1",
  //     type: "line",
  //     data: [30, 40, 45, 50, 49, 60, 70, 91],
  //   },
  // ]);

  const { statsLoading, selectedLinkStats } = state;
  const {
    stats,
    viewsData,
    filterUniqueElements,
    updateViews,
    updateStatsData,
  } = useStatsContext();

  useEffect(() => {
    if (link_id) {
      if (!stats.some((ele: any) => ele.link_id == link_id)) {
        getStatsData();
      } else {
        let filteredLink: any = stats.filter(
          (ele: any) => ele.link_id == link_id
        )[0];
        dispatch({
          type: statsActionTypes.SET_SELECTED_LINK_STATS,
          payload: filteredLink?.data,
        });
        dispatch({
          type: statsActionTypes.SET_STATS_LOADING,
          payload: false,
        });
      }
    } else {
      if (links?.length > 0) {
        navigate("/statistics/" + links[0]?.$id, { replace: true });
      }
    }
  }, [link_id]);

  // useEffect(() => {
  //   if (!linksLoading) {
  //     if (links?.length > 0) {
  //       let findLinkById = links.filter((ele: any) => link_id == ele.$id)[0];
  //       if (findLinkById) {
  //         dispatch({
  //           type: statsActionTypes.SET_SELECTED_LINK,
  //           payload: findLinkById,
  //         });
  //       } else {
  //         dispatch({
  //           type: statsActionTypes.SET_SELECTED_LINK,
  //           payload: links[0],
  //         });
  //       }
  //       if (!links.some((ele: any) => link_id == ele.$id)) {
  //         navigate("/statistics/" + links[0]?.$id, { replace: true });
  //       }
  //     } else {
  //       navigate("/link/create");
  //     }
  //   }
  // }, [links]);

  useEffect(() => {
    if (stats?.length > 0 && selectedLink) {
      let tempStats = stats.filter(
        (ele: any) => ele.link_id == selectedLink.$id
      )[0];
      dispatch({
        type: statsActionTypes.SET_SELECTED_LINK_STATS,
        payload: tempStats?.data,
      });
    }
  }, [stats]);

  useEffect(() => {
    if (selectedLinkStats?.length > 0) {
      handleSelectedLinkViews();
    } else {
      handleSelectedLinkViews(true);
    }
  }, [selectedLinkStats]);

  const handleSelectedLinkViews = (isNull?: any) => {
    if (isNull) {
      viewsData.forEach((ele: any) => {
        ele.data = [];
      });

      let tempViewsData = viewsData;

      updateViews([...tempViewsData]);
      return;
    }
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const viewsTotal = selectedLinkStats.reduce(
      (acc: any, obj: any) => acc + obj.total_views_by_ip,
      0
    );
    const uniqueViewers = filterUniqueElements(selectedLinkStats);
    const last7DaysElements = filterElementsByDays(selectedLinkStats, 7);
    const last30DaysElements = filterElementsByDays(selectedLinkStats, 30);
    const last90DaysElements = filterElementsByDays(selectedLinkStats, 90);
    const todayStats = filterElementsByDay(selectedLinkStats, today);
    const yesterdayStats = filterElementsByDay(selectedLinkStats, yesterday);

    let viewsObj: any = {
      total_views: Array(viewsTotal).fill(viewsTotal),
      unique_viewers: uniqueViewers,
      last_30_days: last30DaysElements,
      last_90_days: last90DaysElements,
      last_7_days: last7DaysElements,
      today: todayStats,
      yesterday: yesterdayStats,
    };

    viewsData.forEach((ele: any) => {
      ele.data = viewsObj[ele?.key];
    });

    let tempViewsData = viewsData;

    updateViews([...tempViewsData]);
  };

  const getStatsData = async () => {
    setBtnLoading(true);
    dispatch({
      type: statsActionTypes.SET_STATS_LOADING,
      payload: true,
    });
    if (link_id && link_id != "") {
      const statResponse = await getStatsByLinkId(link_id);
      if (statResponse) {
        if (!stats.some((ele: any) => ele.link_id == link_id)) {
          updateStatsData([...stats, { link_id, data: statResponse }]);
        } else {
          let filteredLink: any = stats.filter(
            (ele: any) => ele.link_id == link_id
          )[0];
          filteredLink = { link_id, data: statResponse };
          dispatch({
            type: statsActionTypes.SET_SELECTED_LINK_STATS,
            payload: filteredLink?.data,
          });
        }
      } else {
        showToast({
          msg: "Failed to load Stats Please try again sometime",
          isError: true,
        });
      }
    }
    dispatch({
      type: statsActionTypes.SET_STATS_LOADING,
      payload: false,
    });
    setIsBtnClicked(false);
    setBtnLoading(false);
  };

  useEffect(() => {
    if (refreshStats) {
      getStatsData();
    }
  }, [refreshStats]);
  return (
    <>
      <ComingSoon />
    </>
  );
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="pt-0 p-3 w-full max-w-[100vw] h-full">
          <div className="text-xl font-semibold my-2 border-b border-primary w-max">
            Views
          </div>
          {!link_id || statsLoading || linksLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-5">
              {[1, 2, 3, 4, 5, 6, 7].map((ele: any) => (
                <Skeleton
                  key={ele}
                  className="w-full h-[78px] !bg-dark-4 border border-dark-4 hover:border-gray-800"
                />
              ))}
            </div>
          ) : (
            <ViewsCard viewsData={viewsData} />
          )}
        </div>
        {/* <Chart options={options} series={series} type="bar" width="500px" /> */}
      </div>
    </>
  );
};

export default Stats;
