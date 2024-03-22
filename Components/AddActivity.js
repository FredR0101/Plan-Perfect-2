import { Text, Pressable } from 'react-native'
 
export default function AddActivity () {
    return (
        <>
            <Pressable style = {{border: "2px solid black", boxShadow: "1px 2px 5px black", margin: "5%"}} onPress = {() => {navigation.navigate("Home")}}> 
                <Text>  Return ⬅️ </Text>
            </Pressable>
            <Text> Add Activity </Text>
        </>
    )
}