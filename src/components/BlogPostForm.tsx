import React, { useState } from 'react'
import { Text, StyleSheet, View, TextInput, Button } from 'react-native'

interface BlogPostFormProps {
    onSubmit: (title: string, content: string,) => void,
    initialValues: { title: string, content: string }

}

const BlogPostForm = ({ onSubmit, initialValues }: BlogPostFormProps) => {
    const [title, setTitle] = useState(initialValues.title)
    const [content, setContent] = useState(initialValues.content)
    return (
        <View>
            <Text style={styles.label}>Enter Title:</Text>
            <TextInput style={styles.input} value={title} onChangeText={(text) => setTitle(text)} />
            <Text style={styles.label}>Enter Content:</Text>
            <TextInput style={styles.input} value={content} onChangeText={(text) => setContent(text)} />

            <Button
                onPress={() => { onSubmit(title, content) }}
                title='Save Blog Post'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 15,
        padding: 5,
        margin: 5
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    }
})

export default BlogPostForm