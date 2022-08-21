import { NextPage } from "next";
import { useState } from "react";
import AddForm from "../components/demo/AddForm";
import Card from "../components/demo/Card";
import { useQuery, withWunderGraph } from "../components/generated/nextjs";


const Home: NextPage = () => {
  var tmp = {
    id: 0,
    title: "Title",
    content: "Content",
    status: "TODO",
    createdAt: "",
    updatedAt: "",
  };

  const {result: tasks, refetch} = useQuery.GetTasks({ refetchOnWindowFocus: true });
  const [open, toggleAddForm] = useState(false);
  const [data, setData] = useState(tmp);

  
  function openFormForUpdate(info){
    setData(info);
    toggleAddForm(true);
  }

  return (
    <div className="column h-full w-full ">
      <AddForm open={open} toggleForm={toggleAddForm} data={data} refetch={refetch}/>
      <div className={open ? "blur-sm": ""}>
      <div className="my-20 text-center text-sky-400 text-2xl">
        My TODO list
      </div>
      <div className="grid grid-rows-1 md:grid-flow-col justify-items-center mx-2 gap-2 lg:mx-10 xl:mx-28">
        {tasks.status == "ok" ? (
          <Card
            status={"TODO"}
            tasks={tasks.data.db_findManyTask.filter(
              (e) => e.status === "TODO"
            )}
            openFormForUpdate={openFormForUpdate}
            refetch={refetch}
          ></Card>
        ) : (
          <div>There is no data yet</div>
        )}

        {tasks.status == "ok" ? (
          <Card
            status={"DOING"}
            tasks={tasks.data.db_findManyTask.filter(
              (e) => e.status === "DOING"
            )}
            openFormForUpdate={openFormForUpdate}
            refetch={refetch}
          ></Card>
        ) : (
          <div>There is no data yet</div>
        )}

        {tasks.status == "ok" ? (
          <Card
            status={"DONE"}
            tasks={tasks.data.db_findManyTask.filter(
              (e) => e.status === "DONE"
            )}
            openFormForUpdate={openFormForUpdate}
            refetch={refetch}
          ></Card>
        ) : (
          <div>There is no data yet</div>
        )}
      </div>
      <div className="flex items-center justify-center my-6">
        <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 mx-2 rounded" onClick={()=> refetch()}> 
          Refresh
        </button>
        <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 mx-2 rounded" onClick={()=> openFormForUpdate(tmp)}> 
        Add a new task
        </button>
      </div>
      </div>
    </div>
  );
};

export default withWunderGraph(Home);
