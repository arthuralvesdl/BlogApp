import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

interface BlogState {
    title: string,
    id: number
}
// type BlogActionType = 'add_blogpost' | 'delete_blogpost' | 'edit_blogpost'

interface AddBlogPost {
    title: string
    content: string,
}

type BlogAction =
    | { type: 'add_blogpost', payload: AddBlogPost }
    | { type: 'delete_blogpost', payload: number }
    | { type: 'edit_blogpost', payload: { id: number, title: string, content: string } }
    | { type: 'get_blogpost', payload: any }

interface BlogReducer {
    (state: BlogState[], action: BlogAction): BlogState[]
}

type Dispatch = (props: BlogAction) => () => void

const blogReducer: BlogReducer = (states, actions) => {
    switch (actions.type) {
        case 'get_blogpost':
            return actions.payload
        // case 'add_blogpost':
        //     return [...states,
        //     {
        //         id: Math.floor(Math.random() * 99999),
        //         title: actions.payload.title,
        //         content: actions.payload.content
        //     }]
        case 'delete_blogpost':
            return states.filter((blogPost) => blogPost.id !== actions.payload)
        case 'edit_blogpost':
            return states.map(blogPost => {
                return blogPost.id === actions.payload.id ? actions.payload : blogPost
            })
        default:
            return states
    }
}

const getBlogPost = (dispatch: Dispatch) => {
    return async () => {
        const response = await jsonServer.get('/blogpost')

        dispatch({ type: 'get_blogpost', payload: response.data })
    }
}

const addBlogPost = (dispatch: Dispatch) => {
    return async (title: string, content: string, callback: () => void) => {
        await jsonServer.post('/blogpost', { title, content })
        if (callback) {
            callback()
        }
    }
}

const deleteBlogPost = (dispatch: Dispatch) => {
    return async (id: number) => {
        await jsonServer.delete(`/blogpost/${id}`)
        dispatch({ type: 'delete_blogpost', payload: id })
    }
}

const editBlogPost = (dispatch: Dispatch) => {
    return async (id: number, title: string, content: string, callback: () => void) => {

        await jsonServer.put(`/blogpost/${id}`, { title, content })
        dispatch({
            type: 'edit_blogpost',
            payload: { id, title, content }
        });
        if (callback) {
            callback()
        }
    }
}

export const { Context, Provider } = createDataContext(
    blogReducer, { addBlogPost, deleteBlogPost, editBlogPost, getBlogPost },
    []
)
