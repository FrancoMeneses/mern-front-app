import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { createPostRequest, updatePostRequest } from "../api/post"
import { usePost } from '../context/PostContainer'

function NewForm() {

    const { post, setPost, getPost } = usePost()

    const navigate = useNavigate()
    const params = useParams()

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const onSubmit = async data => {
        // If there are params to upload
        if (params.id !== undefined) {
            data.image = data.image[0]
            data.updateDate = new Date()
            const updating = await updatePostRequest(params.id, data)
            const newPosts = post.map(p => {
                if (p._id === params.id) {
                    p = updating
                    return p
                }
                return p
            })
            setPost(newPosts)
            navigate('/')
        } else {
            // If the post is new
            data.image = data.image[0]
            data.date = new Date().toLocaleDateString('en-GB');
            const newPost = await createPostRequest(data)
            setPost([...post, newPost])
            console.log(newPost)
            navigate('/')
            reset({
                title: "",
                description: "",
                content: "",
                tag: "",
                author: ""
            }, {
                keepErrors: true,
                keepDirty: true,
            })
        }
    }

    const update = async (id) => {
        const post = await getPost(id)
        reset({
            title: post.title,
            description: post.description,
            content: post.title,
            tag: post.tag,
            author: post.author
        })
        if (post.image) {
            const img = document.getElementById('imgload')
            img.src = post.image.url
            img.className = 'w-48 h-48'
            img.alt = post.description
        }
    }

    const handleFile = (e) => {
        const img = document.getElementById('imgload')
        var url = URL.createObjectURL(e.target.files[0]);
        img.src = url;
        img.className = 'w-48 h-48'
    }


    useEffect(() => {
        if (params.id !== undefined) {
            update(params.id)
        }
    }, [params.id])


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4 py-4 items-center">
                <div>
                    <p>Title</p>
                    <input {...register("title", { required: true, minLength: 3 })} type="input" className="bg-slate-600 text-white rounded w-48" />
                    {errors.name && <span>This field is required</span>}
                </div>
                <div>
                    <p>Description</p>
                    <input {...register("description", { required: true })} placeholder="Description..." className="bg-slate-600 text-white rounded w-48" />
                </div>
                <div>
                    <p>Content</p>
                    <textarea className="form-textarea bg-slate-600 text-white rounded" rows="10" cols="50" {...register("content", { required: true })}></textarea>
                </div>
                <div>
                    <p>Tag</p>
                    <input {...register("tag", { required: true })} className="bg-slate-600 text-white rounded w-48" />
                </div>
                <div>
                    <p>Author</p>
                    <input {...register("author", { required: true, minLength: 3 })} className="bg-slate-600 text-white rounded w-48" />
                    {/* errors will return when field validation fails  */}
                    {errors.lastname && <span>This field is required</span>}
                </div>
                <div className='flex flex-col items-center gap-y-2'>
                    <img id='imgload' alt='' />
                    <input type="file" {...register("image")} onChange={handleFile}></input>
                </div>
                {/* <div>
                    <p>Checkbox</p>
                    <input  {...register("checkbox", { required: true })} type="checkbox" className="form-checkbox rounded-full" />
                </div>
                <div>
                    <p>Select</p>
                    <select {...register("select", { required: true })} className="form-select px-4 py-3 rounded-full w-48 h-12">
                        <optgroup label='Select'>
                            <option value="1">Value 1</option>
                            <option value="2">Value 2</option>
                            <option value="3">Value 3</option>
                        </optgroup>
                    </select>
                </div> */}
                <input type="submit" className="bg-slate-600 text-white rounded w-48" />
            </form>
        </div>
    )
}

export default NewForm