import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import tw from "twrnc"
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';

const ProfileScreen = ({ route }) => {

    const { userId } = route.params;
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const db = firestore();

    useEffect(() => {
        const fetchUserData = async () => {
        const userRef = db.collection('swipedRight').doc(userId);
        const userSnapshot = await userRef.get();
        if (userSnapshot.exists) {
            setUserData(userSnapshot.data());
        }
    };    
        fetchUserData();
    }, [userId]);
        
/*     if (!userData) {
        return (
        <View style={tw`flex-1 justify-center items-center`}>
            <Text>Loading...</Text>
        </View>
        );
    } */

    console.log(userId)
    
return (
    <SafeAreaView style={tw`h-full w-full items-center justify-start bg-[#D34A4E] gap-5`}>
        <TouchableOpacity onPress={navigation.goBack} style={tw`absolute top-15 left-5 bg-[#D34A4E] p-2 rounded-full border border-[#f9fafa]`}>
            <ArrowLeftIcon size={20} color="#f9fafa" />
        </TouchableOpacity>
        <View style={tw`pt-15 flex items-center`}>
            <Text style={tw`text-white text-xl font-bold`}>ProfileScreen</Text>
        </View>
    </SafeAreaView>
  )
}

export default ProfileScreen