import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { filteredDay, getAllDays } from "../../store/days";
import { fbDays } from "../../API/api";
import Button from "../UI/Button/Button";

import Input from "../UI/Input/Input";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function DayDetail() {
  const { dayId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredDayDetail = useSelector((state) => state.days.filteredDay);
  const days = useSelector((state) => state.days.days);
  const isLoading = useSelector((state) => state.days.isLoading);
  const [showAddTasks, setShowAddTasks] = useState(false);

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
    return <p>Loading...</p>;
  }
  const backHandler = () => {
    navigate(-1);
  };

  const showAddTaskHandler = () => {
    setShowAddTasks(!showAddTasks);
  };

  return (
    <>
      <div className="text-center flex justify-between">
        <h1>{filteredDayDetail.name}</h1>

        <Button
          type="button"
          onClick={showAddTaskHandler}
          bgColor={showAddTasks ? "bg-blue-500" : "bg-blue-700"}
        >
          {showAddTasks ? "Dont show add tasks" : "Show Add tasks"}
        </Button>
      </div>

      {/* Add new Task */}
      {showAddTasks && (
        <div className="flex justify-center mt-11">
          <div className="w-2/3">
            <h4 className=" text-left">Add New Task:</h4>
            <ul className="mt-3">
              <li className="flex flex-row">
                <div className="w-full">
                  <Input />
                </div>
                <div className="mt-2 ml-3">
                  <PlusCircleIcon className=" w-7 h-7" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="mt-7 text-center">
        <h1 className="text-xl">Tasks:</h1>
        <ul className="mt-3">
          <li>laksdlkans</li>
          <li>laksdaasdasdlkans</li>
          <li>laksasdaddlkans</li>
        </ul>
      </div>
      <div className="mt-11 flex justify-between">
        <Button
          type="button"
          bgColor={""}
          textColor={"text-white"}
          onClick={backHandler}
        >
          Back
        </Button>
        <Button type="button">Transfer undone tasks to next day</Button>
      </div>
    </>
  );
}
