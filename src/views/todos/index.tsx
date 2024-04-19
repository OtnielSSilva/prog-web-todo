import { useState } from "react";
import { BsTrash } from "react-icons/bs";

interface Todo {
  todo: string;
}

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem("todos") || "[]"),
  );
  const [form, setForm] = useState<Todo>({ todo: "" });

  const handleInputChange = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (form.todo) {
      setTodos([form, ...todos]);
      localStorage.setItem("todos", JSON.stringify([form, ...todos]));
      setForm({ todo: "" });
    }
  };

  const handleRemoveTodo = (index: number) => {
    const newTodos = todos.filter((_, idx) => idx !== index);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };
  return (
    <div
      className="min-h-72
			w-auto max-w-md rounded-lg bg-gray-900 p-4 text-white"
    >
      <h3 className="mb-4 text-xl font-semibold">Todos de Prog Web</h3>
      <form
        onSubmit={handleSubmit}
        className="mb-4 flex text-base font-semibold"
      >
        <input
          type="text"
          name="todo"
          className="mr-2 h-10 w-full rounded-lg border border-gray-300 bg-gray-800 px-3 text-white focus:outline-none"
          value={form.todo}
          placeholder="Insira uma tarefa"
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
        >
          Adicionar
        </button>
      </form>
      <div className="scrollbar-thumb-gray-700 scrollbar-track-gray-100 mt-4 h-56 space-y-2 overflow-scroll ">
        {todos.length > 0 ? (
          todos.map((tarefa, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 "
            >
              <span>{tarefa.todo}</span>
              <button
                onClick={() => handleRemoveTodo(index)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                <BsTrash />
              </button>
            </div>
          ))
        ) : (
          <div>
            <span className="text-gray-500">
              Não há tarefas a serem exibidas
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todos;
