import { customAxios, customAxiosWithAuth } from './api'

export async function getAllEntries() {
    const axios = customAxios()
    try {
        const response = await axios.get('/diary')
        return response.data
    } catch(err) {
        console.log(err.message)
        return []
    }
}

export async function getEntry(id) {
    const axios = customAxios()
    try {
        const response = await axios.get(`/diary/${id}`)
        return response.data
    } catch(err) {
        console.log(err.message)
    }
}

export async function deleteEntry(id) {
    let token = localStorage.getItem("token")
    // const axios = customAxiosWithAuth()
    const axios = customAxios()
    console.log('diaryservice')
    try {
        await axios.delete(`/diary/${id}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch(err) {
        console.log(err.message)
    }
}

export async function createEntry(entry) {
    const axios = customAxiosWithAuth()
    try {
        const response = await axios.post('/diary', entry)
        return response.data
    } catch(err) {
        console.log(err.message)
    }
}

export async function updateEntry(id, entry) {
    const axios = customAxiosWithAuth()
    try {
        await axios.put(`/diary/${id}`, entry)
    } catch(err) {
        console.log(err.message)
    }
}