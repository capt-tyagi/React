import React , {useState , useEffect} from 'react'


// getitem method for local storage

const getmethod = ()=>{
    let list = localStorage.getItem('itemlist')
    console.log(list);
     if(list){
         return JSON.parse(localStorage.getItem('itemlist'))
     }
     else{
         return [];
     }
}

function Todo() {

// defining the states uses..

   const[inputval,setInputval] = useState("") 
   const[items,setItems] = useState(getmethod())
   const[toggleItem,setToggleItem] = useState(true)
   const[foredit,setForEdit] = useState(null)

   const handleInput = (e)=>{
         setInputval(e.target.value)
     }

        //get value method working..

   const getvalue = ()=>{
       if(!inputval){
           alert("please enter some item to add into the list")
       }

       else if(inputval && !toggleItem){

           setItems(items.map((elem)=>{
               if(elem.id === foredit){
                    return {...items, name:inputval}
               }
               return elem

           }));
           setToggleItem(true)
           setInputval('')
           setForEdit(null)

       }
       else{

        const allInput = {id: new Date().getTime().toString(), name: inputval} 
        setItems([...items,allInput])
        setInputval('')
       }

   }

//    edit item functionality

const editItem = (index)=>{
    let newEdit = items.find((elem)=>{
        return elem.id === index
    })
    // console.log(newEdit);
     setToggleItem(false)
     setInputval(newEdit.name)
     setForEdit(index)

}


//    delete item functionality

   const deleteItem = (ind)=>{
       const updatedData = items.filter((elem)=>{
                return ind !== elem.id
       });
       setItems(updatedData)
   }


//    add local storage seteitem method

    useEffect(() => {
        localStorage.setItem('itemlist', JSON.stringify(items))
    }, [items])

    return (
        <div className = "main_div">
            <div className = "sub_div">
                <h3>Welcome to the To-Do-List App</h3>
                <p>Created by <strong>Hritik Tyagi</strong></p>
                <div className = "additem">
                    <input type = "text" placeholder = "enter items to add.."  value = {inputval}
                    onChange = {handleInput}></input>

                    {
                        toggleItem ? <i className="fas fa-plus" title = "Add items" onClick = {getvalue}></i> :
                        <i className="far fa-edit fas" title = "Edit item" onClick = {getvalue}></i>
                    }
                    </div>

                    { items.map((elem)=>{
                        return(
                             <div className = "item" key = {elem.id}>
                             <input type = "text" placeholder = "items added here.. " value = {elem.name}></input>
                             <i class="far fa-edit" title = "edit Item" onClick = {()=> editItem(elem.id)}></i>
                             <i class="fas fa-trash-alt" title = "delete Item" onClick = {()=> deleteItem(elem.id)}></i>
                             </div>
                             )
                    })}

                    </div>
             </div>
    )
}

export default Todo
