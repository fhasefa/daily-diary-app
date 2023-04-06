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
                                    <div class="accordion" id="accordionExample">
                                        <h4 class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{ backgroundColor: "#4ea8de", color: "red"}}>{new Date(entry.createdAt).toLocaleDateString()} Diary Entry</h4>
                                        <Link to={`/diary/${entry._id}`} key={index}>
                                            <div id="collapseOne" className="accordion-collapse collapse show a-post" data-bs-parent="#accordionExample" style={{ backgroundColor: "#64dfdf" }}>
                                                {/* <h4 className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">{new Date(entry.createdAt).toLocaleDateString()} Diary Entry</h4> <br /> */}
                                                {entry.title}
                                            </div>
                                        </Link>
                                    </div>
                                    )}
                    
                            {user && 
                                <Link to="/diary/new">
                                    <button type="button" class="btn btn-primary">NEW ENTRY</button>
                                    {/* <button>NEW ENTRY</button> */}
                                </Link>
                            }
            
                        </div>
                    </>
                ) : (
                    <>
                        <h1 style={{textAlign: "center"}}>Welcome to your personal Diary</h1>
                        <img style={{ display: "block", margin: "auto" }} src="https://m.media-amazon.com/images/I/81T15mxeFVL.png"/>

                    </>
                )}
            </div>
    )
}

export default Index