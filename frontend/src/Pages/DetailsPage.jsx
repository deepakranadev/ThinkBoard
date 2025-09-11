import { ArrowLeftIcon, LoaderIcon, TrashIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { useState ,useEffect } from 'react'
import { useNavigate , useParams} from 'react-router'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'

const DetailsPage = () => {

  const [note, setNote] = useState(null);
  const [loading, setloading] = useState(true)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

 
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () =>{

      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
        
      } catch (error) {
        console.log("Error in fetching note",error);
        toast.error("Failed to fetch Note")
        
      }
      finally{
        setloading(false)
      }
    };
    fetchNote()
  }, [id]);

  console.log({note});

  const handleDelete = async () =>{
    
    if(!window.confirm("Are you sure you want to delete this note ?")) return;

    try {
      await api.delete(`/notes/${id}`)
      navigate("/")
      toast.success("Note deleted succcesfuly")
    } catch (error) {
      console.log(error);
      toast.error("Deleting Note unsuccesful")
      
    }
  }
  const handleSave = async () =>{

    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please add both Title and Content")
    }

    setSaving(true)

    try {
      await api.put(`/notes/${id}`,note)
      toast.success("Note updated succesfuly")
      navigate("/")
      setSaving(false)
    } catch (error) {
        console.log(error);
        toast.error("Failed to update Note")  
    }
   
  }


  if(loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10'/>
      </div>
    )
  }
  
  
  return (
    <div className='min-h-screen bg-base-200 '>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <Link to={"/"} className='btn btn-ghost'>
             <ArrowLeftIcon className='size-5'/>
              Back to Notes
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <TrashIcon className='size-5'/>
             Delete Note
            </button>
         </div>
         <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
              <form  className='flex flex-col gap-3'>
                <div className=' mb-4 flex  flex-col gap-3'>
                  <label className="label">
                    <span className='label-text'>Title</span>
                  </label>
                  <input type="text" placeholder='Note Title' className='input input-bordered min-w-full px-5 py-6' value={note.title} onChange={(e)=>{setNote({...note,title:e.target.value})}}  />
                </div>
                <div className=' mb-4 flex flex-col gap-3'>
                  <label className="label">
                    <span className='lebel-text'>Content</span>
                  </label>
                  <textarea placeholder="Write your Note here…" className="textarea textarea-bordered h-32 min-w-full p-5" value={note.content} onChange={(e)=>{setNote({...note,content:e.target.value})}} ></textarea>
                </div>
                <div className='card-actions justify-end'>
                  <button className='btn btn-primary ' disabled={saving} onClick={handleSave}>
                    {saving?"Saving...":"Save Changes"}
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

export default DetailsPage
