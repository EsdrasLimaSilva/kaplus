import { useState } from "react";
import Column from "./components/Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const initialData = {
   tasks: {
      task1: { id: "task1", content: "Task one" },
      task2: { id: "task2", content: "Task two" },
      task3: { id: "task3", content: "Task three" },
      task4: { id: "task4", content: "Task four" },
      task5: { id: "task5", content: "Task five" },
   },

   columns: {
      column1: { id: "column1", title: "todo", taskIds: ["task1", "task2", "task3"] },
      column2: { id: "column2", title: "doing", taskIds: ["task4", "task5"] },
   },

   columnOrder: ["column1", "column2"],
};

const App = () => {
   const [data, setData] = useState(initialData);

   const onDragEnd = (result: DropResult) => {
      const { destination, source, draggableId } = result;

      if (!destination) return;

      if (destination.droppableId === source.droppableId && destination.index === source.index)
         return;

      const startColumn = data.columns[source.droppableId as keyof typeof data.columns];
      const endColumn = data.columns[destination.droppableId as keyof typeof data.columns];

      if (startColumn === endColumn) {
         const newTaskIds = Array.from(startColumn.taskIds);
         newTaskIds.splice(source.index, 1);
         newTaskIds.splice(destination.index, 0, draggableId);

         const newColumn = {
            ...startColumn,
            taskIds: newTaskIds,
         };

         setData((prev) => ({
            ...prev,
            columns: {
               ...prev.columns,
               [newColumn.id]: newColumn,
            },
         }));
         return;
      }

      //moving from one column to another
      const startTaskIds = Array.from(startColumn.taskIds);
      startTaskIds.splice(source.index, 1);

      const newStartColumn = {
         ...startColumn,
         taskIds: startTaskIds,
      };

      const endTaskIds = Array.from(endColumn.taskIds);
      endTaskIds.splice(destination.index, 0, draggableId);

      const newEndColumn = {
         ...endColumn,
         taskIds: endTaskIds,
      };

      setData((prev) => ({
         ...prev,
         columns: {
            ...prev.columns,
            [newStartColumn.id]: newStartColumn,
            [newEndColumn.id]: newEndColumn,
         },
      }));
   };

   return (
      <DragDropContext onDragEnd={onDragEnd}>
         <main className="w-screen h-screen bg-gray-100 flex flex-row p-2 gap-2">
            {data.columnOrder.map((columnId) => {
               const column = data.columns[columnId as keyof typeof data.columns];
               const tasks = column.taskIds.map(
                  (taskId) => data.tasks[taskId as keyof typeof data.tasks],
               );

               return <Column key={column.id} column={column} tasks={tasks} />;
            })}
         </main>
      </DragDropContext>
   );
};

export default App;
