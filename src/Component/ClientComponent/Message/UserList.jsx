import React, { useEffect, useState } from 'react'
import {userList} from "../../service/UserApi"
import {msguserList} from "../../service/vendorApi"
// import{ usesele}


const UserList = ({user,setselected}) => {
  const [List, setlist] = useState([])

  const [filteredUserList, setFilteredUserList] = useState([]);
const [sortOption, setSortOption] = useState(''); // Initialize with an empty string or default sort option.
const [searchQuery, setSearchQuery] = useState('');


const userlist= ()=>{
 try {
  userList().then((res)=>{
    // console.log(res.data.data[0].venue.name);
    setlist(res.data.data)
  }).catch((err)=>{
    console.log(err,"error");
  })
 } catch (error) {
  console.log("userList err",error);
 }
}
const venueList=()=>{
  try{
    msguserList()
    .then((res)=>{
      setlist(res.data.data)
      // console.log(res,"venuList")
    }
      )
    .catch((err)=>{console.log(err,"venulisterr")})

  }catch(error){
     console.log(error,"venue list err");
    }
}


useEffect(() => {
  if(user==="user"){
    userlist()
  }else if(user=="venue"){
    venueList()
  }

}, [])
// console.log(res.data.data[0].venue.name);
// filter
const filterUsers = () => {
  if(List){
   if(user==="user"){
    const filteredList = List.filter((user) => {
      
      const name = user?.venue?.name.toLowerCase();
      return name.includes(searchQuery.toLowerCase());
    });
    setFilteredUserList(filteredList);
   }else{
    const filteredList = List.filter((user) => {
      
      const name = user?.user?.name.toLowerCase();
      return name.includes(searchQuery.toLowerCase());
    });
    setFilteredUserList(filteredList);
   }
    //
  }
};

const sortUsers = () => {
  const sortedList = [...filteredUserList]; // Create a copy of the filtered list.
  switch (sortOption) {
    case 'name':
      sortedList.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'time':
      // Implement your custom sorting logic for time if needed.
      break;
    default:
      // No sorting or default sorting logic.
      break;
  }
  setFilteredUserList(sortedList);
};

useEffect(() => {
  filterUsers()
}, [searchQuery, List]);

// useEffect(() => {
//   sortUsers();
// }, [sortOption, filteredUserList]);


const selectedHandle=(select)=>{
  setselected(select)
 
}



  return (
 
    <div className='bg-slate-400    rounded-sm'>
         {/* {user} */}
       <div className='  p-2 flex items-center '>
              <div className="avatar online">
                  <div className="w-8 rounded-full">
                    <img src="https://res.cloudinary.com/djrtauheh/image/upload/v1693815968/e0lw1ndmesjdbkxc70n8.png" />
                  </div>
              </div>
              <div className='mx-5'> vyshak kolloth </div>
      </div>
      <div className='bg-rose-400  p-2 flex items-center '>
      <input type="text" placeholder="Type here" className="input rounded-md w-full max-w-xs"  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)} />
  
      <div className="dropdown dropdown-right mx-1">
  <label tabIndex={0} className="btn "> ...</label>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li>sort by name</li>
    <li>sort by time</li>
  </ul>
</div>

      </div>

      <div className=' '>
       
        {filteredUserList?.map((iteam,index)=>{return(
       

<div key={index}  className='flex px-2 py-1'>
 
<div className="avatar online">
            <div className="w-12 rounded-full">
             <img  onClick={()=>{selectedHandle(iteam)}} className='scale-125' src={user==="user"?iteam?.venue.image[0]:iteam ?.user.image}  />  {/*  //*/}
            </div>
        </div>
        <div className='flex-row  w-full border-b-2 border-rose-500 mx-1'>
          <div className='font-bold capitalize mx-2'>
           {user==="user"?iteam.venue.name:iteam.user.name}
          </div>
          <div className='text-sm capitalize mx-3'>
           last message
          </div>

        </div>
</div>
        )})}
     
     
      </div>

    </div>
  )
}

export default UserList