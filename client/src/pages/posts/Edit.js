import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getEntry, updateEntry } from '../../services/diaryService'

function Edit() {

    const [entry, setEntry] = useState({})

    const navigate = useNavigate()
    const params = useParams()

    const bodyRef = useRef()
    const titleRef = useRef()

    useEffect(() => {
        getEntry(params.id).then(data => setEntry(data))
    }, [params.id])

    async function handleSubmit(e) {
        e.preventDefault()
        let updatedEntry = {
            title: titleRef.current.value,
            body: bodyRef.current.value
        }
        await updateEntry(entry._id, updatedEntry)
        navigate(`/diary/${entry._id}`)
    }

    return ( 
        <div>
            <h1>Edit Post</h1>
            <div className='buttons' style={{ flexDirection: 'column' }}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nme">Title:</label><br />
                    <input type="text" id="nme" ref={titleRef} defaultValue={entry.title} /><br /><br />

                    <label htmlFor="clr">Body:</label><br />
                    <textarea ref={bodyRef} id="clr" cols="30" rows="10" defaultValue={entry.body} /><br /><br />

                    <button>Submit</button>
                </form>
                <Link to={`/diary/${entry._id}`}>
                    <button>Back</button>
                </Link>
                
            </div>
        </div>
    );
}

export default Edit;