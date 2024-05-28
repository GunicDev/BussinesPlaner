import { useState } from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

export default function NewDay() {
  const [inputValue, setInputValue] = useState("");

  const newDayHandler = (event) => {
    setInputValue(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

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
