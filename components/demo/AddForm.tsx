import { QueryArgs } from "@wundergraph/nextjs";
import { FC, SetStateAction, useEffect, useState } from "react";
import { useMutation, withWunderGraph } from "../../components/generated/nextjs";
import { db_StringFieldUpdateOperationsInput } from "../generated/models";

interface IToggleForm {
    open: Boolean,
    toggleForm: (value: SetStateAction<boolean>) => void
    refetch: (args?: QueryArgs) => void
    data: {
        id: number;
        title: string;
        content?: string;
        status?: string;
        createdAt: string;
        updatedAt: string;
      };
}

const AddForm: FC<IToggleForm> = ({open, toggleForm, data, refetch}) => {
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [status, setStatus] = useState(data.status);

  const {mutate, result} = useMutation.CreateTask();
  const {mutate: update, result: output} = useMutation.UpdateTask();

  useEffect(()=> {
    setTitle(data.title);
    setContent(data.content);
    setStatus(data.status);
  }, [data])
  

  function handleSubmit(event){
    event.preventDefault();
    if(title.length == 0 || content.length == 0)
        alert("Please provide required fields");
    if(data.id == 0){
        mutate({input: {
            title:title,
            content: content,
            status:status
        }});
    }
    else{
        update({
            input:{
                id: data.id,
                title: {set: title},
                content: {set: content},
                status: {set: status}
            }
        })
    }
        
    setTitle("");
    setContent("");
    toggleForm(false);
    refetch();
  }

  return (
    <div
      aria-hidden="true"
      className={"flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full" + (open ? "" : " hidden")}
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={()=> toggleForm(false)}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              {data.id == 0 ? "Add Task" : "Update task"}
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Task title
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e)=> {setTitle(e.target.value)}}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Task details
                </label>
                <input
                  type="text"
                  name="content"
                  value={content}
                  onChange={(e)=> {setContent(e.target.value)}}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Task status
                </label>
                <select id="countries"
                    name="status"
                    value={status}
                    onChange={(e)=> {setStatus(e.target.value)}}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="DONE">TODO</option>
                    <option value="DOING">DOING</option>
                    <option value="DONE">DONE</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {data.id == 0 ? "Add Task" : "Update task"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
