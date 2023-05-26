import { View, Text, TouchableOpacity, ImageBackground, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
//import { useDispatch, useSelector } from 'react-redux';
//import { addToMatches, removeFromMatches, selectMatches, setMatches } from '../features/matchSlice';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc"
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/firestore';

const MatchScreen = () => {

  const [matchData, setMatchData] = useState([])
  const navigation = useNavigation();
  //const dispatch = useDispatch()
  const db = firestore();

  //const matches = useSelector(selectMatches);
  const fetchSwipesFromFirestore = () => {
    const swipesRef = db.collection('swipedRight');
  
    swipesRef.get().then((querySnapshot) => {
      const fetchedMatches = [];
  
      querySnapshot.forEach((doc) => {
        const swipeData = doc.data();
  
        // Modify the swipe data as needed
        const modifiedSwipeData = {
          ...swipeData,
        };
        // Add the modified swipe data to the fetchedMatches array
        fetchedMatches.push(modifiedSwipeData);
      });
        // Update the matches in Redux store with the fetchedMatches array
        //dispatch(setMatches(fetchedMatches));
        setMatchData(fetchedMatches)
      });
  };

  useEffect(() => {
    fetchSwipesFromFirestore();
  }, []);
  
  return (
    <SafeAreaView style={tw`h-full w-full items-center justify-start bg-[#D34A4E] gap-5`}>
        <TouchableOpacity onPress={navigation.goBack} style={tw`absolute top-15 left-5 bg-[#D34A4E] p-2 rounded-full border border-[#f9fafa]`}>
          <ArrowLeftIcon size={20} color="#f9fafa" />
        </TouchableOpacity>
        <View style={tw`pt-15 flex items-center`}>
          <Text style={tw`text-white text-xl font-bold`}>Here is your matches:</Text>
        </View>

        <ScrollView contentContainerStyle={tw`flex gap-2.5 justify-center items-center`}>            
          {matchData.map((match, index) => (
              <TouchableOpacity onPress={() => navigation.navigate("Profile", { userId: match.userId })}
                style={tw`flex items-center justify-center w-100 h-24 bg-[#D34A4E] rounded px-5`} key={index}>
                <ImageBackground source={{ uri: match.userData.picture.large }} style={tw`w-full rounded-md h-full`} resizeMode="cover">
                  <View style={tw`bg-black bg-opacity-50 rounded-md w-full h-full flex flex-row items-center justify-between px-5 py-3`}>
                    <View>
                      <Text style={tw`text-white font-bold text-lg`}>{`${match.userData.name.first} ${match.userData.name.last}`}</Text>
                      <Text style={tw`text-gray-200`}>{match.userData.location.city}, {match.userData.location.country}</Text>
                    </View>
                    <View>
                      <Text style={tw`text-white font-bold text-lg`}>{match.userData.dob.age}</Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity> 
          ))}
        </ScrollView>
  </SafeAreaView>
  )
}

export default MatchScreen