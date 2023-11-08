import React, { useEffect, useState } from 'react'
import ToDo from './components/ToDo'
import { addToDo, getAllToDo, updateToDo, deleteToDo } from './utils/HandleApi'




const App = () => {

  const [toDo, setToDo] = useState([])
  const [text, setText] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [toDoId, setToDoId] = useState("")

  useEffect(() => {
    getAllToDo(setToDo)
  }, [])

  const updateMode = (_id, text) => {
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)
  }
  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>

        <div className="top">
          <input
            type="text"
            placeholder="Add ToDos ..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="add" onClick={() => {
            if (text.trim() !== '') {
              if (isUpdating) {
                updateToDo(toDoId, text, setToDo, setText, setIsUpdating);
              } else {
                addToDo(text, setText, setToDo);
              }
            } else {
              alert("يرجى إضافة مهمة قبل النقر على 'Add'");
            }
          }}>
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>

        <div className="list">
          {toDo.map((item) => <ToDo
            key={item._id}
            text={item.text}
            updateMode={() => updateMode(item._id, item.text)}
            deleteToDo={() => deleteToDo(item._id, setToDo)}
          />)}



        </div>
      </div>
    </div>
  )
}

export default App