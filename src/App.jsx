import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [updateStates, setUpdateStates] = useState(
    Array(list.length).fill(false)
  );

  useEffect(() => {
    if (localStorage.getItem("todolist")) {
      const storedList = localStorage.getItem("todolist");
      setList(JSON.parse(storedList));
    }

    if (localStorage.getItem("checklist")) {
      const storedCheck = localStorage.getItem("checklist");
      setCheckedItems(JSON.parse(storedCheck));
    }
  }, []);

  const submitHandle = (e) => {
    e.preventDefault();
    if (input.length > 0) {
      const updatedList = [...list, input];
      setList(updatedList);
      setInput("");
      localStorage.setItem("todolist", JSON.stringify(updatedList));
    }
  };

  const handleDelete = (index) => {
    const updatedList = [...list];
    updatedList.splice(index, 1);

    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems.splice(index, 1);

    setList(updatedList);
    setCheckedItems(updatedCheckedItems);

    localStorage.setItem("todolist", JSON.stringify(updatedList));
    localStorage.setItem("checklist", JSON.stringify(updatedCheckedItems));
  };

  const handleUpdate = (index, newValue) => {
    const updatedList = [...list];
    updatedList[index] = newValue;

    setList(updatedList);
    localStorage.setItem("todolist", JSON.stringify(updatedList));
  };

  const toggleUpdateState = (index) => {
    const updatedStates = [...updateStates];
    updatedStates[index] = !updatedStates[index];
    setUpdateStates(updatedStates);
  };

  function handleCheckboxChange(index) {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
    localStorage.setItem("checklist", JSON.stringify(updatedCheckedItems));
  }

  function handleClear() {
    const clear = [];
    setCheckedItems(clear);
    setList(clear);
    localStorage.removeItem("checklist");
    localStorage.removeItem("todolist");
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        <div className="flex-col items-center w-[600px] bg-white rounded-lg p-[20px] m-[50px] border border-black-900 mx-[50px]">
          <div className="text-[2rem]  text-center">To-do list 📝</div>
          <form
            className="flex justify-center py-[10px]"
            onSubmit={submitHandle}>
            <div style={{ position: "relative", width: "400px" }}>
              <div className=" bg-[#ebeaea] rounded-full w-full">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="add your task"
                  className="flex flex-wrap p-[10px] bg-[#ebeaea] rounded-full w-[300px] pr-30 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-[#f98242] active:bg-[#f99b57] hover:bg-[#f4b678] text-[#fff] p-[10px] rounded-full w-[100px] absolute right-0 top-0 h-full ">
                Add
              </button>
            </div>
          </form>
          <div className="p-[10px]">
            {list.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-[16px] ">
                <input
                  type="checkbox"
                  checked={checkedItems[index] || false}
                  onChange={() => handleCheckboxChange(index)}
                  className="w-[24px] h-[24px] cursor-pointer border bg-[#ebeaea] appearance-none rounded-full checked:bg-[#f98242] relative text-[100px]"
                />
                <div
                  className={
                    checkedItems[index]
                      ? "w-[450px] p-[10px] line-through"
                      : "w-[450px] p-[10px]"
                  }>
                  {updateStates[index] ? (
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleUpdate(index, e.target.value)}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          handleUpdate(index, e.target.value);
                          toggleUpdateState(index);
                        }
                      }}
                      className="w-[100%] ring-2 ring-[#f98242] ring-rounded-full ring-inset focus:outline-none"
                    />
                  ) : (
                    item
                  )}
                </div>
                <div className="flex justify-between gap-2">
                  <button onClick={() => toggleUpdateState(index)}>
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#000000">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fill="#f98242"
                          d="M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640V512z"></path>
                        <path
                          fill="#f98242"
                          d="m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"></path>
                      </g>
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(index)}>
                    <svg
                      width="28px"
                      height="28px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#000000">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M11 10L15 14M11 14L15 10M2.7716 13.5185L7.43827 17.5185C7.80075 17.8292 8.26243 18 8.73985 18H18C19.1046 18 20 17.1046 20 16V8C20 6.89543 19.1046 6 18 6H8.73985C8.26243 6 7.80075 6.17078 7.43827 6.48149L2.7716 10.4815C1.84038 11.2797 1.84038 12.7203 2.7716 13.5185Z"
                          stroke="#f98242"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"></path>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {list.length > 5 && (
            <div className="flex justify-center items-center">
              <button
                onClick={() => handleClear()}
                className="content-center bg-[#f98242] active:bg-[#f99b57] hover:bg-[#f4b678] text-[#fff] p-[10px] rounded-full w-[200px] ">
                clear
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
