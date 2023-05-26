import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import tw from "twrnc"
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
            setUserData(userSnapshot.data().userData);
        }
    };    
        fetchUserData();
    }, [userId]);
        
    if (!userData) {
        return (
        <View style={tw`flex-1 justify-center items-center`}>
            <Text>Loading...</Text>
        </View>
        );
    }
    
return (
    <SafeAreaView style={tw`h-full w-full items-center justify-start bg-[#D34A4E] gap-5`}>
        <TouchableOpacity onPress={navigation.goBack} style={tw`absolute top-15 left-5 bg-[#D34A4E] p-2 rounded-full border border-[#f9fafa]`}>
            <ArrowLeftIcon size={20} color="#f9fafa" />
        </TouchableOpacity>


        {/* here comes the profile */}
        <View style={tw`flex items-center mt-15`}>
            <Image
                source={{ uri: userData.picture.large }}
                style={tw`w-40 h-40 rounded-full mb-5`}
            />
            <Text style={tw`text-2xl font-bold text-white mb-3`}>
                {userData.name.title} {userData.name.first} {userData.name.last}
            </Text>

            <View style={tw`bg-white rounded-lg p-4 w-full shadow-lg`}>
                <Text style={tw`text-xl font-bold text-[#D34A4E] mb-2`}>Details:</Text>
                <Text style={tw`text-lg text-black`}>
                    Gender: {userData.gender}
                </Text>
                <Text style={tw`text-lg text-black`}>
                    Email: {userData.email}
                </Text>
                <Text style={tw`text-lg text-black`}>
                    Date of Birth: {userData.dob.date}
                </Text>
                <Text style={tw`text-lg text-black`}>
                    Phone: {userData.phone}
                </Text>
                <Text style={tw`text-lg text-black`}>
                    Location: {userData.location.city}, {userData.location.country}
                </Text>
            </View>
        </View>

        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafa', marginHorizontal: 20, borderRadius: 10, paddingVertical: 15, marginBottom: 20 }}>
            <Icon name="account-edit" size={24} color="#D34A4E" />
            <Text style={{ color: '#D34A4E', fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Edit Profile</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ProfileScreen