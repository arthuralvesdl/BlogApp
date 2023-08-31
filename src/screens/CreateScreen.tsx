import React, { useContext } from 'react';
import { Context } from '../context/BlogContext';
import { NavigationProp } from '@react-navigation/native';
import BlogPostForm from '../components/BlogPostForm';

interface Navigation {
    navigation: NavigationProp<any, any>;
}

const CreateScreen = ({ navigation }: Navigation) => {
    const { addBlogPost } = useContext(Context);

    return (
        <BlogPostForm
            initialValues={{ title: '', content: '' }}
            onSubmit={(title: string, content: string) => {
                addBlogPost(title, content, navigation.navigate('IndexScreen'));
            }}
        />

    );
}

export default CreateScreen;
