import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createEntry } from "../../services/diaryService";

function New({ user }) {

    let titleRef = useRef()
    let bodyRef = useRef()
    let navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        let entry = {
            title: titleRef.current.value,
            body: bodyRef.current.value,
            user
        }
        await createEntry(entry)
        navigate('/diary')
    }

    return ( 
        <div>
            <h1>New Entry</h1>
            <h3>Entry Date:{Date.toLocaleTimeString()}</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nme">Title:</label><br />
                <input type="text" id="nme" ref={titleRef} /><br /><br />

                <label htmlFor="clr">Body:</label><br />
                <textarea id="clr" cols="30" rows="10" ref={bodyRef} /><br /><br />

                <button>Submit</button>
            </form>
        </div>
     );
}

export default New;