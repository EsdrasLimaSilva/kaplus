import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

interface Props {
   column: { id: string; title: string; taskIds: string[] };
   tasks: {
      id: string;
      content: string;
   }[];
}

export const Column = ({ column, tasks }: Props) => {
   return (
      <div className="text-slate-700 bg-white font-bold w-64 p-2 shadow-mdh-full border border-gray-300">
         <h2 className="text-center text-xl uppercase">{column.title}</h2>

         <Droppable droppableId={column.id}>
            {(provided) => (
               <div
                  className="flex flex-col h-[95%]"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
               >
                  {tasks.map((task, index) => (
                     <Task key={task.id} content={task.content} taskId={task.id} index={index} />
                  ))}

                  {provided.placeholder}
               </div>
            )}
         </Droppable>
      </div>
   );
};

export default Column;
