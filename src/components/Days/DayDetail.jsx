import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { filteredDay, getAllDays } from "../../store/days";
import { fbDays } from "../../API/api";

export default function DayDetail() {
  const { dayId } = useParams();
  const dispatch = useDispatch();
  const filteredDayDetail = useSelector((state) => state.days.filteredDay);
  const days = useSelector((state) => state.days.days);
  const isLoading = useSelector((state) => state.days.isLoading);

  useEffect(() => {
    if (days.length === 0) {
      dispatch(getAllDays(fbDays)).then(() => {
        dispatch(filteredDay(dayId));
      });
    } else {
      dispatch(filteredDay(dayId));
    }
  }, [dayId, dispatch, days.length]);

  if (isLoading || filteredDayDetail === null) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <div className="text-white">
      <h1>{filteredDayDetail.name}</h1>
    </div>
  );
}
