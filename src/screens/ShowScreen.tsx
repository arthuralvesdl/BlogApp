import React, { useContext } from 'react'
import { Context } from '../context/BlogContext'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
// Define o tipo para a propriedade 'params' na propriedade 'route'
interface ShowScreenRouteParams {
    id: number;
    state: { content: string, id: number, title: string }[]
}
// Define o tipo para a propriedade 'route'
type ShowScreenRouteProp = RouteProp<Record<string, ShowScreenRouteParams>, string>;

// Define as propriedades do componente
interface ShowScreenProps {
    route: ShowScreenRouteProp
    navigation: NavigationProp<any, any>
}

interface BlogPost {
    title: string
    id: number;
    content: string
}

const ShowScreen = (props: ShowScreenProps) => {
    const { state } = useContext(Context)
    const routeId = props.route.params.id
    const navigation = props.navigation

    const blogPost: BlogPost = state.find((blogPost: BlogPost) => blogPost.id === routeId)


    React.useLayoutEffect(() => {
        // Update the navigation header options
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => { navigation.navigate('EditScreen', { id: blogPost.id }) }}
                >
                    <EvilIcons name='pencil' size={35} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);
    return (
        <View>
            <Text>{blogPost.title}</Text>
            <Text>{blogPost.content}</Text>
        </View>
    )

}


const styles = StyleSheet.create({

})

export default ShowScreen