import { QueryArgs } from "@wundergraph/nextjs";
import { FC, SetStateAction } from "react";

import {
  MdOutlineDoneOutline,
  MdOutlineDelete,
  MdTimelapse,
  MdAddTask,
} from "react-icons/md";
import { useMutation } from "../generated/nextjs";

interface ITask {
  tasks: {
    id: number;
    title: string;
    content?: string;
    status?: string;
    createdAt: string;
    updatedAt: string;
  }[];
  status: string;
  openFormForUpdate: (data: any) => void;
  refetch: (args?: QueryArgs) => void;
}

interface IMiniTask {
  task: {
    id: number;
    title: string;
    content?: string;
    status?: string;
    createdAt: string;
    updatedAt: string;
  };
  openFormForUpdate: (data: any) => void;
  refetch: (args?: QueryArgs) => void;
}

const MiniCard: FC<IMiniTask> = ({ task, openFormForUpdate, refetch }) => {
  const { mutate: deleteTask, result: returnId } = useMutation.DeleteTask();
  const { mutate: updateTask, result: resultId } = useMutation.UpdateTask();

  function changeTaskStatus(status: string) {
    updateTask({
      input: {
        id: task.id,
        title: { set: task.title },
        content: { set: task.content },
        status: { set: status },
      },
    });
    refetch();
  }

  return (
    <div className="bg-sky-600 m-2 p-2 rounded-lg">
      <div className="grid grid-rows-1 grid-flow-col justify-between">
        <div
          className="text-lg font-bold text-sky-200 w-full"
          onClick={() => openFormForUpdate(task)}
        >
          {task.title}
        </div>

        <div className="grid grid-rows-1 grid-flow-col gap-1">
          {task.status != "TODO" ? (
            <MdAddTask
              color="orange"
              size={20}
              onClick={() => {
                changeTaskStatus("TODO");
              }}
              title="Set TODO"
            />
          ) : (
            <div />
          )}

          {task.status != "DOING" ? (
            <MdTimelapse
              color="yellow"
              size={20}
              onClick={() => {
                changeTaskStatus("DOING");
              }}
              title="Set DOING"
            />
          ) : (
            <div />
          )}
          {task.status != "DONE" ? (
            <MdOutlineDoneOutline
              color="white"
              size={20}
              onClick={() => {
                changeTaskStatus("DONE");
              }}
              title="Set DONE"
            />
          ) : (
            <div />
          )}
          <MdOutlineDelete
            color="red"
            size={20}
            onClick={() => {
              deleteTask({ input: { id: task.id } });
              refetch();
            }}
            title="Delete task"
          />
        </div>
      </div>
      <div className="text-white" onClick={() => openFormForUpdate(task)}>
        {task.content}
      </div>
    </div>
  );
};

const Card: FC<ITask> = ({ tasks, status, openFormForUpdate, refetch }) => {

  return (
    <div className="container bg-sky-800 w-96 md:w-80 xl:w-96 rounded-lg ">
      <div className="text-sky-100 font-bold text-center m-2 p-2">{status}</div>
      <div className="max-h-96 overflow-y-scroll">
        {tasks.map((e) => {
        return (
          <MiniCard
            key={e.id}
            task={e}
            openFormForUpdate={openFormForUpdate}
            refetch={refetch}
          />
        );
      })}
      </div>
      
    </div>
  );
};

export default Card;
