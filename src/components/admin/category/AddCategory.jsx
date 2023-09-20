import React, { useState } from 'react'
import adminAxios from '../../../Axios/adminAxios';
const AddCategory = () => {
const  [categoryName,setCategoryName]=useState('')
console.log('ggggggggg');
const handleform =(e)=>{
    console.log('llllllll',categoryName);
    e.preventDefault()

    adminAxios.post('/addCategory',{categoryName}).then((res)=>{
        console.log(res.data);
    })

}
  return (
    <div>
      <form onSubmit={handleform} method='POST'>
        <div>
        <label htmlFor="">category name</label>
        </div>
        <div>
            <input type="text"
                   name='categoryName'
                   id='categoryName'
                   onChange={(e)=>{setCategoryName(e.target.value)}}
                   value={categoryName} />

        </div>

        <div>
            <button type='submit'>submit</button>
        </div>
        
      </form>


      
    </div>
  )
}

export default AddCategory
