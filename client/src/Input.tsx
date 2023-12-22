import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { TTodoRestItem } from "./App";

type TProps = {
  todolist: TTodoRestItem[];
  setTodolist: (todolist: TTodoRestItem[]) => void;
};

export default function Input(props: TProps) {
  const { todolist, setTodolist } = props;
  const [textInput, setTextInput] = useState("");
  const [dateInput, setDateInput] = useState("");

  useEffect(() => {
    console.log(textInput);
    console.log(dateInput);
  }, [dateInput, textInput]);

  const ref = useRef<HTMLLIElement>(null);
  const onKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const newTodolist = [
        {
          id: -1,
          text: textInput,
          date: dateInput,
          ref,
        },
        ...todolist,
      ];
      setTodolist(newTodolist);

      const request = await fetch("http://localhost:3000/item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textInput, date: dateInput }),
      });
      const response = await request.json();

      if (ref.current) {
        ref.current.dataset.id = response.lastID;
        ref.current.className = "synced";
      }
    }
  };

  return (
    <>
      <input
        className="input is-rounded"
        type="text"
        placeholder="o que você fará depois?"
        onChange={(event) => setTextInput(event.target.value)}
        onKeyDown={onKeyDown}
      />
      <input
        style={{ marginTop: "10px" }}
        className="input is-rounded"
        type="date"
        onChange={(event) => setDateInput(event.target.value)}
        onKeyDown={onKeyDown}
      />
    </>
  );
}
