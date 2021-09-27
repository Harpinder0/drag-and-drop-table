import React,{useState} from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Users from "./Users";

const DragDrop = () => {
    const [user,setUser] = useState(Users)

    const handleDragEnd = (results) => {
        if(!results.destination) return;
        let updateUser = [...user]
        let [selectedRow] = updateUser.splice(results.source.index, 1);
        updateUser.splice(results.destination.index,0,selectedRow)
        setUser(updateUser)
    }

  return (
    <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
        </thead>
        <Droppable droppableId="tbody">
            {(provided) => (
                 <tbody ref={provided.innerRef} {...provided.droppableProps}>
                 {user.map((ele,index) => (
                  <Draggable draggableId={ele.name} index={index} key={ele.name}>
                     {(provided) => (
                         <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={ele.id}>
                         <td>{ele.id}</td>
                         <td>{ele.name}</td>
                         <td>{ele.contact}</td>
                         <td>{ele.country}</td>
                       </tr>
                     )}
                  </Draggable>
                 ))}
                 {provided.placeholder}
               </tbody>
            )}
        </Droppable>
      </table>
    </DragDropContext>
  );
};

export default DragDrop;
