import { useEffect, useState } from "react"
import axios from 'axios';
function App() {
  const [userdata,setUserData]=useState([]);
  const [index,setIndex]=useState(1)
  const getData=async ()=>{
    const response= await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`);
    setUserData(response.data);
  }
  useEffect(function(){
    getData()
  },[index])
  let printUserData=<h3 className="text-gray-300 text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">Loading...</h3>;
  if(userdata.length > 0){
    printUserData=userdata.map(function(elem,idx){
      return <div key={idx}>
        <a href={elem.url} target="_blank">
          <div className="h-60 w-60 overflow-hidden rounded-xl">
            <img className='h-full w-full object-cover' src={elem.download_url}/>
          </div>
          <h1 className="font-bold text-xl">{elem.author}</h1>
        </a>
      </div>
    })
  }
  return (
    <div className="bg-black text-white h-screen overflow-auto p-4">
      <div className="flex flex-wrap gap-12 justify-center h-[82%]">{printUserData}</div>
      <div className="flex justify-center items-center gap-10 mt-6">
        <button className='bg-gray-700 rounded px-5 py-2 text-lg font-bold cursor-pointer'
        style={{opacity:index==1?0.4:1}}
        onClick={()=>{
          if(index > 1){
            setIndex(index-1)
            setUserData([])
          }
        }}>Prev</button>
        <h4>Page {index}</h4>
        <button className='bg-gray-700 rounded px-5 py-2 text-lg font-bold cursor-pointer'
        onClick={()=>{
          setIndex(index+1)
          setUserData([])
        }}>Next</button>
      </div>
    </div>
  )
}
export default App