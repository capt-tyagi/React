import React, { useEffect , useState } from 'react'
import './Userdata.css'

const Userdata = () => {
     const[udata,setUdata] = useState([])

    const Data = async() =>{
        const datafetch = await fetch(" https://reqres.in/api/users?page=2") 
        const userdata = await datafetch.json();
        // console.log(userdata.data)

        setUdata(userdata.data)
    
    }

    useEffect(()=>{
           Data()
    },[])

    return (
        <div>
            <div className="container">
<h1>Excellence user Data list</h1>
  <table className="rwd-table">
    <tbody>
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>E-mail</th>
        <th>Image</th>
      </tr>

        {
            udata.map((elem,key)=>{
                return(

                    <tr>
                    <td data-th="ID">
                     {elem.id}
                    </td>
                    <td data-th="First Name">
                      {elem.first_name}
                    </td>
                    <td data-th="Last Name">
                      {elem.last_name}
                    </td>
                    <td data-th="E-mail">
                      {elem.email}
                    </td>
                    <td data-th="Image">
                      <img src= {elem.avatar} style = {{height: "5rem", width: "5rem", borderRadius: "50%"}} alt = {elem.name}></img>
                    </td>
                  </tr>
                )
            })
        }

     
      </tbody>
      </table>            
        </div>
        </div>
    )
}

export default Userdata
