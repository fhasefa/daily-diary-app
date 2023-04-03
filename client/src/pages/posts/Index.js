import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllPosts } from "../../services/postService"

function Index({ user }) {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function loadData() {
            const data = await getAllPosts()
            setPosts(data)
        }
        loadData()
    }, [])
    console.log(posts)
    return (
            <div>
                {user ? (
                    <>
                        <h1>{user}s Diary</h1>
                        <div id="posts">

                                {posts?.map((post, index) => 
                                    <Link to={`/posts/${post._id}`} key={index}>
                                        <div className="a-post">
                                            {post.subject}
                                        </div>
                                    </Link>
                                )}
                    
                            {user && 
                                <Link to="/posts/new">
                                    <button>NEW POST</button>
                                </Link>
                            }
            
                        </div>
                    </>
                ) : (
                    <h1>Log in to Access Diary</h1>
                )}
            </div>
    )
}

export default Index