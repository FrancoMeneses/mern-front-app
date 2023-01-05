import { usePost } from '../context/PostContainer'
import { VscEmptyWindow } from "react-icons/vsc";
import { NavLink } from 'react-router-dom';


function HomePage() {

    const { post, setPost, deletePost } = usePost()

    const handleDelete = async (e) => {
        console.log(e.target.className)
        e.target.className = 'bg-slate-700 text-white rounded-md disabled'
        const res = await deletePost(e.target.id)
        if (res === 204) {
            const updatePost = post.filter(p => p._id !== e.target.id)
            setPost(updatePost)
        }
    }

    if (post.length === 0) return (
        <div className='flex flex-col items-center text-7xl'>
            <p className='text-4xl block'>Create Post</p>
            <NavLink to="/new">
                <VscEmptyWindow />
            </NavLink>
        </div>
    )

    return (
        <div className="w-screen h-screen">
            <div>
                <p className="text-center text-2xl font-mono font-semibold">Ultimas publicaciones</p>
            </div>
            <div className="flex justify-between px-2">
                <p>Posts ({post.length})</p>
                <NavLink to="/new">Add new post</NavLink>
            </div>
            <div className="grid grid-cols-3 place-items-center">
                {post.map(p => (
                    <div key={p._id} className="flex flex-col p-4 gap-y-2">
                        <div className="flex flex-row text-center justify-around bg-orange-400 rounded-md w-[18rem]">
                            <NavLink to={`/posts/${p._id}`} className="bg-slate-700 text-white rounded-md">Edit</NavLink>
                            {p.title}
                            <button onClick={handleDelete} id={p._id} className="bg-slate-700 text-white rounded-md">Delete</button>
                        </div>
                        <div className="bg-slate-700 text-white rounded-md h-[10rem] w-[18rem] bg-no-repeat bg-center bg-cover" style={p.image && { backgroundImage: `url(${p.image.url})` }}>
                            <div className="flex flex-col items-center border border-white rounded-sm h-full backdrop-blur-[2px]">
                                {p.description}
                                {/* {p.image && <img alt='' src={p.image.url} className="object-scale-down h-28 self-center justify-self-center" />} */}
                                <div className="flex w-full h-full justify-end">
                                    {p.updateDate ? <div className="self-end text-[8px] p-1 text-white">{p.updateDate}</div> : <div className="self-end text-[8px] p-1 text-white font-bold">{p.date}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage

// {post ? 'There are no posts' : {}}
// <div>
//     {post.map( p => {
//         return(
//         <div key={p._id}>
//             {p}
//         </div>
//         )
//     })}
// </div>