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
  const [showMessage, setShowMessage] = useState(false);

  const newDayHandler = (event) => {
    setInputValue(event.target.value);
    setShowMessage(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (inputValue.length === 0 || inputValue.trim() === "") {
      setShowMessage(true);
      return;
    }

    dispatch(newDay(fbDays, inputValue));
    setShowMessage(false);

    navigate("/home");
  };

  const backHandler = () => {
    navigate(-1);
  };

  return (
    <>
      <form className="lg:w-2/3" onSubmit={submitHandler}>
        <div className="p-3 m-2">
          <Input label={"Name"} onChange={(event) => newDayHandler(event)} />
          {showMessage && <p className="text-red-400 mt-1">Required field</p>}
        </div>

        <div className="p-3 m-2">
          <Button
            type={"submit"}
            bgColor={"bg-blue-400"}
            textColor={"text-white"}
            textHover={"hover:text-gray-600"}
          >
            Add Day
          </Button>
        </div>
      </form>
      <div className="text-right">
        <Button
          bgColor={"none"}
          textColor={"text-red-200"}
          onClick={backHandler}
        >
          Back
        </Button>
      </div>
    </>
  );
}
