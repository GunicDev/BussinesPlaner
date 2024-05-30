import { useState } from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { useDispatch } from "react-redux";
import { newDay } from "../../store/days";
import { fbDays } from "../../API/api";
import { useNavigate } from "react-router-dom";

export default function NewDay() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");

  const newDayHandler = (event) => {
    setInputValue(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(newDay(fbDays, inputValue));

    navigate("/home");
  };

  return (
    <>
      <form className="lg:w-2/3" onSubmit={submitHandler}>
        <div className="p-3 m-2">
          <Input label={"Name"} onChange={(event) => newDayHandler(event)} />
        </div>

        <div className="p-3 m-2">
          <Button type={"submit"}>Add Day</Button>
        </div>
      </form>
    </>
  );
}
