import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { filteredDay } from "../../store/days";

export default function DayDetail() {
  const { dayId } = useParams();
  const dispatch = useDispatch();
  const filteredDayDetail = useSelector((state) => state.days.filteredDay);

  useEffect(() => {
    dispatch(filteredDay(dayId));
  }, [dayId, dispatch]);

  console.log(filteredDayDetail, dayId);

  if (filteredDayDetail === null || filteredDayDetail === undefined) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <div className="text-white">
      <h1>{filteredDayDetail.name}</h1>
    </div>
  );
}
