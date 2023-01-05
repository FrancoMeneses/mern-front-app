// export const getPostsRequest = () => {
//     const posts = fetch('http://localhost:4000/posts')
//     .then(res => res.json())
//     return posts
// }

export const getPostsRequest = async () => {
    try {
        const res = await fetch('http://localhost:4000/posts')
        const posts = await res.json()
        return posts
    } catch (error) {
        console.log(error)
    }
}
//multipart/form-data

export const getPostRequest = async (id) => {
    try {
        const res = await fetch(`http://localhost:4000/posts/${id}`)
        const post = await res.json()
        return post
    } catch (error) {
        console.log(error)
    }
}

export const createPostRequest = async (data) => {
    try {
        console.log('data', data)
        const form = new FormData()
        for (let key in data) {
            form.append(key, data[key])
        }
        const response = await fetch('http://localhost:4000/posts', {
            method: 'POST',
            // headers: {
            //   'Content-Type': 'multipart/form-data'
            // },
            body: form
        })
        return response.json();
    } catch (error) {
        console.log(error)
    }
}

export const deletePostRequest = async (id) => {
    try {
        const res = await fetch('http://localhost:4000/posts/' + id, {
            method: 'DELETE'
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const updatePostRequest = async (id, data) => {
    try {
        const form = new FormData()
        for (let key in data) {
            form.append(key, data[key])
        }
        if (data.image) {
            const res = await fetch('http://localhost:4000/posts/' + id, {
                method: 'PUT',
                body: form
            })
            return res.json()
        } else {
            const res = await fetch('http://localhost:4000/posts/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                
            })
            return res.json()
        }
    } catch (error) {
        console.log(error)
    }
}