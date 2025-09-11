import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { Link , useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import RateLimiterUi from '../components/RateLimiterUi'
import api from '../lib/axios.js'

const CreatePage = () => {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [isRateLimited, setisRateLimited] = useState(false)
  const navigate = useNavigate()

  const handlesubmit = async (e)=>{
    e.preventDefault();

    if(!title.trim() || !content.trim()){
      toast.error("All Fields Required")
    }

    try {

      setLoading(true)

      await api.post("/notes",{
      title,
      content
    })

    toast.success("Note created succesfuly")
    navigate("/")
      
    } catch (error) {
        console.log(error);
        if(error.response?.status===429) setisRateLimited(true);
        else toast.error("Error creating Note")
        
    }
    finally{
      setLoading(false)
    }
    
    

  }

  return (
    <div className='min-h-screen bg-base-200'>
      {isRateLimited && <RateLimiterUi/>}
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className='btn btn-ghost mb-6 transition-all duration-200'>
            <ArrowLeftIcon className='size-5'/>
            Back to Notes
          </Link>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
              <form onSubmit={handlesubmit} className='flex flex-col gap-3'>
                <div className=' mb-4 flex  flex-col gap-3'>
                  <label className="label">
                    <span className='label-text'>Title</span>
                  </label>
                  <input type="text" placeholder='Note Title' className='input input-bordered min-w-full px-5 py-6'  value={title} onChange={(e)=>setTitle(e.target.value)} />
                </div>
                <div className=' mb-4 flex flex-col gap-3'>
                  <label className="label">
                    <span className='lebel-text'>Content</span>
                  </label>
                  <textarea placeholder="Write your Note here…" className="textarea textarea-bordered h-32 min-w-full p-5" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <div className='card-actions justify-end'>
                  <button type='submit' className='btn btn-primary' disabled={loading}>
                    {loading?"Creating....":"Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) 
}

export default CreatePage
