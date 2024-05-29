import { useState } from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { useDispatch } from "react-redux";
import { newDay } from "../../store/days";
import { fbDays } from "../../API/api";

export default function NewDay() {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");

  const newDayHandler = (event) => {
    setInputValue(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(newDay(fbDays, inputValue));
    console.log(inputValue);
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
