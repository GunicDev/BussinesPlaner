import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllDays } from "../../store/days";
import { useEffect } from "react";
import { fbDays } from "../../API/api";

export default function DaysList() {
  const days = useSelector((state) => state.days.days);
  const nagivate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDays(fbDays));
  }, [dispatch]);

  const editHandler = (id) => {
    nagivate(`/${id}`);
  };

  if (days === undefined || days === null) {
    return <h1>There is no days created!</h1>;
  }

  return (
    <div className="m-0 p-0">
      <div className="mx-auto max-w-7xl">
        <div className=" py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 cursor-default">
                  Days
                </h1>
                <p className="mt-2 text-sm text-gray-300 cursor-default">
                  A list of all the days in your account.
                </p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <Link
                  to={"/create"}
                  className="block w-1/3 rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  New Day
                </Link>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr className="cursor-default">
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold  sm:pl-0"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-center text-sm font-semibold "
                        >
                          Tasks
                        </th>

                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                        >
                          <span className="sr-only">Delete</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {days.map((item) => (
                        <tr
                          key={item.id}
                          onClick={() => editHandler(item.id)}
                          className="hover:bg-blue-900 cursor-pointer"
                        >
                          <td className="whitespace-nowrap text-center py-4 pl-4 pr-3 text-sm font-medium  sm:pl-0">
                            {item.name}
                          </td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-300">
                            {/* {add lenght of the list items inside object} */}
                            {item.tasks.length}
                          </td>
                          <td className="relative whitespace-nowrap  py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <Link
                              to="#"
                              className="text-red-400 hover:text-indigo-300 p-3"
                            >
                              Delete
                              <span className="sr-only">, {item.name}</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
