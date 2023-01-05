import { useState, createContext, useContext, useEffect } from "react"
import { deletePostRequest, getPostRequest, getPostsRequest } from "../api/post"

const postContext = createContext()

export const usePost = () => {
    const context = useContext(postContext)
    return context
}

export const PostProvider = ({ children }) => {

    const [post, setPost] = useState([])

    const getPosts = async () => {
        const res = await getPostsRequest()
        if(res !== undefined){
            setPost(res)
        }
        //return res
    }

    const getPost = async (id) => {
        const res = await getPostRequest(id)
        return res
    }

    const deletePost = async(id) => {
        const res = await deletePostRequest(id)
        return res.status
    }

    useEffect(() => {
        getPosts()
    }, [])

    return(
        <postContext.Provider value={{
            post,
            setPost,
            getPosts,
            getPost,
            deletePost
        }}>
            {children}
        </postContext.Provider>
    )
}