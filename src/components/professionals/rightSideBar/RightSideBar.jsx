import React, { useEffect, useState } from 'react'
import CustomModal from '../../../components/modal/CustomModal'
import ImageUpload from '../post/ImageUpload';
const RightSideBar = ({email}) => {
   // useEffect(()=>{
      
   // })

   const [modalIsOpen, setModalIsOpen] = useState(false);

   const openModal = () => {
     setModalIsOpen(true);
   };
 
   const closeModal = () => {
     setModalIsOpen(false);
   };
   
  return (
    <div>

 
<button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-600">
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>

<aside id="separator-sidebar" className=" top-14 mt-20 ml-14 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
<ul class="h-48 py-2 overflow-y-auto text-black-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
    <li>
      <a href="#" class="flex items-center px-4 py-2 text-black">
      <img className="w-6 h-6 mr-2 rounded-full" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="sara" />

        Jese Leos
      </a>
    </li>
    <p className='text-black px-3 ' >follow</p>

    <li>
      <a href="#" class="flex items-center px-4 py-2 text-black">
      <img className="w-6 h-6 mr-2 rounded-full" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="sara" />
        Robert Gough
      </a>
    </li>
    <p className='text-black px-3 ' >follow</p>

    <li>
      <a href="#" class="flex items-center px-4 py-2 text-black">
        
      <img className="w-6 h-6 mr-2 rounded-full" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="sara" />
        Bonnie Green
      </a>
    </li>
    <p className='text-black px-3 ' >follow</p>

    <li>
      <a href="#" class="flex items-center px-4 py-2 text-black">
      <img className="w-6 h-6 mr-2 rounded-full" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="sara" />
        Leslie Livingston
      </a>
    </li>
    <p className='text-black px-3 ' >follow</p>

    <li>
      <a href="#" class="flex items-center px-4 py-2 text-black">
      <img className="w-6 h-6 mr-2 rounded-full" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="sara" />
        Michael Gough
      </a>
    </li>
    <p className='text-black px-3 ' >follow</p>

    <li>
      <a href="#" class="flex items-center px-4 py-2 text-black">
      <img className="w-6 h-6 mr-2 rounded-full" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="sara" />
        Joseph Mcfall
      </a>
    </li>
    <p className='text-black px-3 ' >follow</p>

          <li className='flex '>
      <a href="#" class="flex items-center px-4 py-2 text-black">
      <img className="w-6 h-6 mr-2 rounded-full" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="sara" />
        Roberta Casas

      </a>

    </li>
    <p className='text-black px-3 ' >follow</p>

    <li className=''>
      <a href="#" class="flex items-center   px-4 py-2 text-black">
      <img className="w-6 h-6 mr-2 rounded-full" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="sara" />
        Neil Sims
      </a>
      
    </li>
    <p className='text-black px-3 ' >follow</p>

  </ul>
</aside>


      
    </div>
  )
}

export default RightSideBar
