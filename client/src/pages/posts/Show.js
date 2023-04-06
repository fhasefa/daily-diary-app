import { useEffect, useState, useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { createCommentForPost, deleteCommentFromPost } from "../../services/commentService"
import { deleteEntry, getEntry } from "../../services/diaryService"

function Show({ user }) {

    const [entry, setEntry] = useState({})

    const navigate = useNavigate()
    const params = useParams()
    const bodyRef = useRef()
    const detailsRef = useRef()

    useEffect(() => {
        async function loadData() {
            const data = await getEntry(params.id)
            if (!data) navigate('/diary')
            setEntry(data)
        }
        loadData()
    }, [params.id])

    async function handleDeleteComment(comment) {
        await deleteCommentFromPost(comment._id, entry._id)
        let updatedEntry = { ...entry }
        updatedEntry.comments = updatedEntry.comments.filter(c => c._id !== comment._id)
        setEntry(updatedEntry)
    }

    async function handleDeleteEntry() {
        console.log('handleDeleteEntry')
        await deleteEntry(entry._id)
        navigate('/diary')
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let comment = {
            body: bodyRef.current.value,
            user
        }

        const newComment = await createCommentForPost(comment, entry._id)
        let updatedEntry = { ...entry }
        updatedEntry.comments.push(newComment)
        setEntry(updatedEntry)
        bodyRef.current.value = ''
        detailsRef.current.open = false
    }

    return (
            <div>
                <div className="a-post">
                    <h2>{entry.title}</h2>
                    <h5>Posted by <span style={{textTransform: 'capitalize'}}>{entry.user}</span> on {new Date(entry.createdAt).toLocaleDateString()}</h5>
                    <div className='p-body'>{entry.body}</div><br /><br />

                    {
                        entry.comments?.length?
                        <>
                            <div>Reflection from {new Date(entry.createdAt).toLocaleDateString()}:</div> <br />
                            <div>{entry.comments.map((comment, i) => 
                                <div key={i} className="">
                                    {/* <div>{comment.user}</div> */}
                                    <div>{comment.body}</div>
                                    {comment.user === user &&
                                        <div class="btn-group">
                                        <button type="button" class="btn btn-primary">Action</button>
                                        <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span class="visually-hidden">Toggle Dropdown</span>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><button class="dropdown-item" onClick={() => handleDeleteComment(comment)}>Delete</button></li>
                                            {/* <li><a class="dropdown-item" href="#" onClick={handleDeleteComment(comment)}>Delete</a></li> */}
                                            {/* <li><a class="dropdown-item" href="#">Edit</a></li> */}
                                            <li><Link to={`/posts/${entry._id}/comments/${comment._id}`}><span>Edit</span></Link></li>

                                        </ul>
                                        </div>
                                        // <>
                                        //     <button onClick={() => handleDeleteComment(comment)}>x</button>
                                        //     <Link to={`/posts/${entry._id}/comments/${comment._id}`}><span>+</span></Link>
                                        // </>
                                    }
                                </div>
                            )}</div>
                            <br/><br/>
                        </>
                        : ''
                    }
                    {user && 
                        <>
                            <summary>Reflection Section</summary>
                            <form onSubmit={handleSubmit}>
                                <textarea ref={bodyRef} id="lc" cols="1" rows="1" />
                                <button type="button" class="btn btn-primary">Add</button>
                            </form>
                        </>
                        // <details ref={detailsRef}>
                        // </details>
                    }
                    
                    <div className="buttons">
                        {entry.user === user &&
                            <>
                                <button type="button" class="btn btn-primary" onClick={handleDeleteEntry}>Delete</button>
                                <Link to={`/diary/${entry._id}/edit`}>
                                    <button type="button" class="btn btn-primary">Edit</button>
                                </Link>
                            </>
                        }
                        <Link to='/diary'>
                            <button type="button" class="btn btn-primary">Back</button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}

export default Show