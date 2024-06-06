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

export default function DayDetail() {
  const { dayId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredDayDetail = useSelector((state) => state.days.filteredDay);
  const days = useSelector((state) => state.days.days);
  const isLoading = useSelector((state) => state.days.isLoading);

  const [showAddTasks, setShowAddTasks] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [dialog, setDialog] = useState(false);
  const [taskId, setTaskId] = useState("");

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

  const showAddTaskHandler = () => {
    setShowAddTasks(!showAddTasks);
  };

  const sendUndoneTasksHandler = () => {
    console.log("clicked send button");
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
            <div className="flex flex-row mt-3">
              <div className="w-full">
                <Input onChange={(event) => taskHandler(event.target.value)} />
              </div>
              <div className="mt-2 ml-3">
                <PlusCircleIcon className=" w-7 h-7" onClick={sendHandler} />
              </div>
            </div>
          </div>
        </div>
      )}
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
              <li key={index} className="flex justify-center align-middle">
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
          onClick={sendUndoneTasksHandler}
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
        />
      )}
    </>
  );
}
