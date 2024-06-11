import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { sendUndoneTasks } from "../../../store/tasks";
import { fbDays } from "../../../API/api";
import { useNavigate } from "react-router-dom";
import { getAllDays } from "../../../store/days";

export default function SendTasksToNextDay({ dialog, onClose }) {
  const [open, setOpen] = useState(dialog);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filteredDayDetail = useSelector((state) => state.days.filteredDay);
  const days = useSelector((state) => state.days.days);

  const [invalidDay, setInvalidDay] = useState(false);

  const [selectedDay, setSelectedDay] = useState("");
  const undoneTasks = filteredDayDetail.tasks.filter(
    (undone) => undone.done === false
  );

  useEffect(() => {
    setOpen(dialog);
  }, [dialog]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const chooseDayHandler = (event) => {
    setSelectedDay(event);
    if (event !== "") {
      setInvalidDay(false);
    }
  };

  const sendUndoneTasksHandler = async () => {
    if (selectedDay.length === 0 || selectedDay.trim() === "") {
      setInvalidDay(true);
      return;
    }
    await dispatch(sendUndoneTasks(fbDays, selectedDay, undoneTasks));
    await dispatch(getAllDays(fbDays));
    navigate("/home");
  };

  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={handleClose}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Send Undone Tasks
                    </DialogTitle>

                    <div className="mt-3">
                      <div className="flex flex-row">
                        <div className="w-2/4">
                          <select
                            className="bg-white text-black p-1 border border-gray-700 rounded-lg"
                            onClick={(event) =>
                              chooseDayHandler(event.target.value)
                            }
                          >
                            <option value="">Choose day...</option>
                            {days.map((day) =>
                              day.id !== filteredDayDetail.id ? (
                                <option
                                  className="p-3"
                                  key={day.id}
                                  id={day.id}
                                  value={day.id}
                                >
                                  {day.name}
                                </option>
                              ) : (
                                ""
                              )
                            )}
                          </select>
                          {invalidDay && (
                            <p className="text-red-500">Invalid day</p>
                          )}
                        </div>
                        <div className="w-2/4">
                          <p className="text-black mt-2">Undone tasks:</p>
                          <ul className="m-2">
                            {filteredDayDetail.tasks.map((undone) =>
                              undone.done === false ? (
                                <li
                                  className="text-gray-500"
                                  key={undone.id}
                                  id={undone.id}
                                >
                                  {undone.task}
                                </li>
                              ) : (
                                ""
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-5">
                        Choose the day where you want to send undone tasks. When
                        you have chosen, press 'Send' to move the undone tasks
                        to your selected day.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={sendUndoneTasksHandler}
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={handleClose}
                    data-autofocus
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
