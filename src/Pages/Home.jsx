import { useDispatch } from "react-redux";
import DaysList from "../components/Days/DaysList";
import { useEffect } from "react";
import { getAllDays } from "../store/days";
import { fbDays } from "../API/api";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDays(fbDays));
  }, [dispatch]);
  return <DaysList />;
}
