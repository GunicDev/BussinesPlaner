import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

export default function NewDay() {
  return (
    <>
      <form className="lg:w-2/3">
        <div className="p-3 m-2">
          <Input label={"Name"} />
        </div>

        <div className="p-3 m-2">
          <Button>Add Day</Button>
        </div>
      </form>
    </>
  );
}
