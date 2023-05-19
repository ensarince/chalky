import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import tw from "twrnc"

const Card = ({ data }) => {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#D34A4E",
            alignItems: "center",
            justifyContent: "center",    
        },
        card: {
            justifyContent: "center",
            alignItems: "center",
            width: 300,
            height: 600,
        },
        cardsText: {
            fontSize: 22,
        },
    });

    
return (
    <View style={[styles.card, { backgroundColor: data.backgroundColor }]}>
        <Text>{data.name.first}</Text>
        <Image source={{uri: data.picture.large}} style={tw`h-72 w-72 bg-gray-300 p-4 rounded-full`}/>
    </View>
)
}

export default Card