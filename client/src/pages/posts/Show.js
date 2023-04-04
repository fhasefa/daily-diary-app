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
                    <h5 style={{ opacity: '.3'}}>Posted by {entry.user} on {new Date(entry.createdAt).toLocaleDateString()} at {new Date(entry.createdAt).toLocaleTimeString()}</h5>
                    <div className='p-body'>{entry.body}</div><br /><br />

                    {
                        entry.comments?.length ?
                        <>
                            <div>Comments:</div>
                            <div>{entry.comments.map((comment, i) => 
                                <div key={i} className="comm">
                                    <div>{comment.user}</div>
                                    <div>{comment.body}</div>
                                    {comment.user === user &&
                                        <>
                                            <button onClick={() => handleDeleteComment(comment)}>X</button>
                                            <Link to={`/posts/${entry._id}/comments/${comment._id}`}><span>+</span></Link>
                                        </>
                                    }
                                </div>
                            )}</div>
                            <br/><br/>
                        </>
                        : ''
                    }
                    {user && 
                        <details ref={detailsRef}>
                            <summary style={{ opacity: '.5' }}>Leave a comment:</summary>
                            <form onSubmit={handleSubmit}>
                                <textarea ref={bodyRef} id="lc" cols="1" rows="1" />
                                <button>Comment</button>
                            </form>
                        </details>
                    }
                    
                    <div className="buttons">
                        {entry.user === user &&
                            <>
                                <button onClick={handleDeleteEntry}>Delete</button>
                                <Link to={`/diary/${entry._id}/edit`}>
                                    <button>Edit</button>
                                </Link>
                            </>
                        }
                        <Link to='/diary'>
                            <button>Back</button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}

export default Show