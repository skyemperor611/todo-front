import { useState } from "react"
import { postAdd } from "../../api/todoApi"
import ResultModal from "../common/ResultModal"

const initState = {
  title: "",
  writer: "",
  dueDate: "",
}

const AddComponent = () => {
  const [todo, setTodo] = useState({ ...initState })

  const [result, setResult] = useState(null)

  const handleChangeTodo = (e) => {
    todo[e.target.name] = e.target.value

    setTodo({ ...todo })
  }

  const handleClickAdd = () => {
    console.log(todo)

    postAdd(todo)
      .then((result) => {
        console.log(result)

        setResult(result.TNO)
        setTodo({ ...initState })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const closeModal = () => {
    setResult(null)
  }

  return (
    <div className="p-4 m-2 mt-10 border-2 border-sky-200">
      {result ? (
        <ResultModal
          title={"Add Result"}
          content={`New ${result} Added`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <div className="flex flex-col items-start">
        <div className="flex w-full mb-4">
          <div className="w-1/5 p-2 font-bold text-left">TITLE</div>
          <input
            className="w-4/5 p-2 border border-solid rounded shadow-md border-neutral-500"
            name="title"
            type="text"
            value={todo.title}
            onChange={handleChangeTodo}
          />
        </div>
        <div className="flex w-full mb-4">
          <div className="w-1/5 p-2 font-bold text-left">WRITER</div>
          <input
            className="w-4/5 p-2 border border-solid rounded shadow-md border-neutral-500"
            name="writer"
            type="text"
            value={todo.writer}
            onChange={handleChangeTodo}
          />
        </div>
        <div className="flex w-full mb-4">
          <div className="w-1/5 p-2 font-bold text-left">DUE DATE</div>
          <input
            className="w-4/5 p-2 border border-solid rounded shadow-md border-neutral-500"
            name="dueDate"
            type="date"
            value={todo.dueDate}
            onChange={handleChangeTodo}
          />
        </div>
        <div className="flex justify-end w-full">
          <button
            type="button"
            className="p-2 text-xl text-white bg-blue-500 rounded w-36"
            onClick={handleClickAdd}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddComponent
