import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllEntries } from "../../services/diaryService"

function Index({ user }) {

    const [entries, setEntries] = useState([])

    useEffect(() => {
        async function loadData() {
            const data = await getAllEntries()
            setEntries(data)
        }
        loadData()
    }, [])
    console.log(entries)

    return (
            <div>
                {user ? (
                    <>
                        <h1><span style={{textTransform: 'capitalize'}}>{user}'s</span> Diary</h1>
                        <div id="posts">

                                {entries?.map((entry, index) => 
                                    <Link to={`/diary/${entry._id}`} key={index}>
                                        <div className="a-post">
                                            <h4>{new Date(entry.createdAt).toLocaleDateString()} Diary Entry</h4> <br />
                                            {/* {entry.title} */}
                                        </div>
                                    </Link>
                                )}
                    
                            {user && 
                                <Link to="/diary/new">
                                    <button>NEW ENTRY</button>
                                </Link>
                            }
            
                        </div>
                    </>
                ) : (
                    <h1>Welcome to your personal Diary</h1>
                )}
            </div>
    )
}

export default Index