import { RouteProp } from '@react-navigation/native'
import React, { useContext } from 'react'
import { Context } from '../context/BlogContext'
import { NavigationProp } from '@react-navigation/native';
import BlogPostForm from '../components/BlogPostForm'

interface ShowScreenRouteParams {
    id: number
}
type ShowScreenRouteProp = RouteProp<Record<string, ShowScreenRouteParams>, string>

interface ShowScreenProps {
    route: ShowScreenRouteProp
    navigation: NavigationProp<any, any>
}

interface BlogPost {
    title: string
    id: number;
    content: string
}

const EditScreen = (props: ShowScreenProps) => {
    const { state, editBlogPost } = useContext(Context)
    const routeId = props.route.params.id

    const blogPost: BlogPost = state.find((blogPost: BlogPost) => blogPost.id === routeId)

    return <BlogPostForm
        initialValues={{ title: blogPost.title, content: blogPost.content }}
        onSubmit={(title: string, content: string) => {
            editBlogPost(blogPost.id, title, content, () => props.navigation.goBack())
        }} />
}
export default EditScreen