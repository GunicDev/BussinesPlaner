import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addTaskToDay,
  filteredDay,
  getAllDays,
  updateDay,
  updateFilteredDayTask,
  updateTasks,
} from "../../store/days";
import { fbDays } from "../../API/api";
import Button from "../UI/Button/Button";

import Input from "../UI/Input/Input";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { addNewTask, deleteTask, doneTask } from "../../store/tasks";
import DeleteDialog from "../UI/Dilog/DeleteDialog";
import SendTasksToNextDay from "../UI/Dilog/SendTasksToNextDay";

export default function DayDetail() {
  const { dayId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredDayDetail = useSelector((state) => state.days.filteredDay);
  const days = useSelector((state) => state.days.days);
  const isLoading = useSelector((state) => state.days.isLoading);

  const [inputValue, setInputValue] = useState("");
  const [dialog, setDialog] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [sendDialog, setSendDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (days.length === 0) {
        await dispatch(getAllDays(fbDays));
      }
      dispatch(filteredDay(dayId));
    };

    fetchData();
  }, [dayId, dispatch, days.length]);

  if (isLoading || filteredDayDetail === null) {
    return <p>Loading...</p>;
  }

  const backHandler = () => {
    navigate(-1);
  };

  const taskHandler = (event) => {
    setInputValue(event);
  };

  const sendHandler = async () => {
    if (inputValue.trim() !== "") {
      const key = await dispatch(addNewTask(fbDays, dayId, inputValue));

      dispatch(
        addTaskToDay({
          dayId,
          task: { id: key, task: inputValue, done: false },
        })
      );
      dispatch(filteredDay(dayId));
      setInputValue("");
    }
  };

  const doneTaskHandler = async (id, task) => {
    dispatch(doneTask(id, task, dayId, fbDays));
    dispatch(updateDay({ id, done: task }));
    dispatch(getAllDays(fbDays));
    dispatch(updateFilteredDayTask({ taskId: id, done: task }));
  };

  const openDeleteDialog = (id) => {
    setTaskId(id);
    setDialog(true);
  };

  const closeDeleteDialog = () => {
    setDialog(false);
  };

  const deleteHandler = async () => {
    dispatch(deleteTask(taskId, fbDays, dayId));
    dispatch(updateTasks({ id: taskId }));
    dispatch(filteredDay(dayId));
    setDialog(false);
  };

  const openSendDialog = () => {
    setSendDialog(true);
  };

  const closeSendDialog = () => {
    setSendDialog(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendHandler();
    }
  };

  return (
    <>
      <div className="text-center flex justify-between">
        <h1>{filteredDayDetail.name}</h1>
      </div>

      {/* Add new Task */}

      <div className="flex justify-center mt-11">
        <div className="w-2/3">
          <h4 className=" text-left">Add New Task:</h4>
          <div className="flex flex-row mt-3">
            <div className="w-full" onKeyDown={handleKeyPress}>
              <Input
                value={inputValue}
                onChange={(event) => taskHandler(event.target.value)}
              />
            </div>
            <div className="mt-2 ml-3 max-sm:hidden">
              <PlusCircleIcon className="w-7 h-7 " onClick={sendHandler} />
            </div>
          </div>
        </div>
      </div>

      {filteredDayDetail.tasks === null ||
      filteredDayDetail.tasks === "" ||
      filteredDayDetail.tasks.length === 0 ? (
        <p className="text-center mt-11">
          There are no tasks! Create a new task!
        </p>
      ) : (
        <div className="mt-7 text-center">
          <h1 className="text-xl">{filteredDayDetail.name} tasks:</h1>
          <ul className="mt-7">
            {filteredDayDetail.tasks.map((task, index) => (
              <li
                key={index}
                className="flex justify-center align-middle cursor-pointer"
              >
                <p
                  htmlFor={index}
                  className={`text-3xl ${
                    task.done ? "text-red-700 line-through" : ""
                  } `}
                  onClick={() => doneTaskHandler(task.id, !task.done)}
                >
                  {task.task}
                </p>
                {task.done ? (
                  <TrashIcon
                    className="text-red-700 w-7 h-7 mt-2 ml-3"
                    onClick={() => openDeleteDialog(task.id)}
                  />
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-11 flex justify-between">
        <Button
          type="button"
          bgColor={""}
          textColor={"text-white"}
          onClick={backHandler}
        >
          Back
        </Button>
        <Button
          type="button"
          textHover={"hover:text-white"}
          onClick={openSendDialog}
          bgColor={"bg-green-800"}
          textColor={"text-black"}
        >
          Transfer undone tasks to next day
        </Button>
      </div>
      {dialog && (
        <DeleteDialog
          dialog={dialog}
          onClick={deleteHandler}
          onClose={closeDeleteDialog}
          name={"task"}
        />
      )}
      {sendDialog && (
        <SendTasksToNextDay dialog={sendDialog} onClose={closeSendDialog} />
      )}
    </>
  );
}
