import { Draggable } from "react-beautiful-dnd";

interface Props {
   content: String;
   taskId: string;
   index: number;
}

const Task = ({ content, taskId, index }: Props) => {
   return (
      <Draggable draggableId={taskId} index={index}>
         {(provided, snapshot) => (
            <div
               className={`${
                  snapshot.isDragging ? "bg-slate-800 cursor-grabbing" : "bg-slate-600 cursor-grab"
               } text-gray-50 font-bold p-2 shadow-sm  active:cursor-grabbing select-none border border-gray-800 my-1 transition-all`}
               {...provided.draggableProps}
               {...provided.dragHandleProps}
               ref={provided.innerRef}
            >
               <p className="text-center">{content}</p>
            </div>
         )}
      </Draggable>
   );
};

export default Task;
