import React, { useEffect } from "react";
import axios from "axios";


export default function App(){
  useEffect(()=>{


    getUsers();
  
    async function getUsers(): Promise<void> {
      try{

      const data = await axios.get('/api/users');
      console.log(data);
    }
    catch(e){
      console.error(e)
    }
  }
  },[]);
  return(<div>
    gg
  </div>)
}