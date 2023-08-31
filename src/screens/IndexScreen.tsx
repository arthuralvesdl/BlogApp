import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from "react-native";
import { Context } from "../context/BlogContext";
import Feather from 'react-native-vector-icons/Feather'
import { NavigationProp } from "@react-navigation/native";

interface Navigation {
    navigation: NavigationProp<any, any>
}

const IndexScreen = ({ navigation }: Navigation) => {
    const { state, addBlogPost, deleteBlogPost, getBlogPost } = useContext(Context);

    useEffect(() => {
        getBlogPost()

        const listener = navigation.addListener('focus', () => {
            getBlogPost()
        })

        return () => {
            listener.remove()
        }
    }, [])

    React.useLayoutEffect(() => { //SET OPTIONS
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('CreateScreen')}>
                    <Feather name="plus" size={30} />
                </TouchableOpacity>
            ),
        });
    }, [navigation, addBlogPost]);

    return (
        <View>
            <FlatList
                data={state}
                keyExtractor={(blogPost) => blogPost.title}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ShowScreen', { id: item.id, state: state },)}
                        >
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.title} - {item.id}</Text>
                                <TouchableOpacity onPress={() => {
                                    deleteBlogPost(item.id)
                                }}>
                                    <Feather style={styles.icon} name="trash"></Feather>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24
    }
});

export default IndexScreen;
