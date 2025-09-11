import React from 'react'
import toast from 'react-hot-toast'

import NoteCard from '../components/NoteCard'
import Navbar from '../components/Navbar'
import { useState,useEffect } from 'react'
import RateLimiterUi from '../components/RateLimiterUi'
import api from '../lib/axios'
import NotesNotFound from '../components/NotesNotFound'


const HomePage = () => {
  const [isRateLimited, setisRateLimited] = useState(false)
  const [notes, setnotes] = useState([])
  const [loading, setloading] = useState(true)

  useEffect(() => {
    const fetchNotes = async ()=>{
    try {
      const res  = await api.get("/notes")
      console.log(res.data);
      setnotes(res.data);
      setisRateLimited(false)
      
    } catch (error) {
      console.log(error);
      
      if(error.response?.status===429) {setisRateLimited(true);}
      else{ toast.error("Error Fetching Notes") }
      
    } finally{
      setloading(false)
    }
  }

    fetchNotes()
    
  }, [])
  

  return (
    <div className='min-h-screen bg-black'>
      <Navbar/>
      {isRateLimited && <RateLimiterUi/>}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading  && <div className='text-center text-primary py-10' >Loading Notes....</div>
        }
        {notes.length===0 && !isRateLimited && <NotesNotFound/>}

        {notes.length>0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
            {notes.map(note=>(
              <NoteCard key={note._id} note={note} setNotes={setnotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
 