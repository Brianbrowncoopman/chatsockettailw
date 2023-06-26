import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("/");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(message);
    const newMessage = {
      body: message,
      from: "yo",
    };

    setMessages([...messages, newMessage]);
    socket.emit("message", message);
  };

  useEffect(() => {
    socket.on(
      "message",
      receiveMessage
      //console.log(message);
    );
    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (message) =>
    setMessages((state) => [...state, message]);

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <h1 className="text-2xl font-bold my-2">ChatReact</h1>
        <input
          type="text"
          placeholder="escribe tu mensaje"
          className="border-2 border-zinc-500 p-2 w-full text-black"
          onChange={(e) => setMessage(e.target.value)}
        />
        <ul>
          {messages.map((message, i) => (
            <li
              key={i}
              className={`my-2 p-2 table  rounded-md ${
                message.from === "yo" ? "bg-lime-600 ml-auto" : "bg-orange-500"
              }`}
            >
              <span className="text-xs text-slate-300 block">
                {message.from}
              </span>
              <span className="text-md">{message.body}</span>
            </li>
          ))}
        </ul>
        <button className="bg-sky-800 rounded  text-center w-full my-2">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default App;
