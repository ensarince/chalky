import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from "twrnc"
import useAuth from '../hooks/useAuth'
import SwipeCards  from 'react-native-swipe-cards-deck';
import Card from '../components/Card';
//import { useDispatch, useSelector } from 'react-redux';
//import { addToMatches, removeFromMatches, selectMatches } from '../features/matchSlice';
import { useNavigation } from '@react-navigation/native';
import {
  HeartIcon,
} from "react-native-heroicons/solid";

//import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/firestore';


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

function StatusCard({ text }) {
  return (
    <View>
      <Text style={styles.cardsText}>{text}</Text>
    </View>
  );
}

const HomeScreen = () => {

  const {user} = useAuth();
  const [cards, setCards] = useState([]);
  //const dispatch = useDispatch();
  const navigation = useNavigation()

  const db = firestore();

  // Save swipe rights to Firestore
  const saveSwipeRightToFirestore = async(userId, userData) => {
    const swipeRef = await db.collection('swipedRight').doc();
    swipeRef.set({
      userId,
      userData,    
    }).then(async() => {
      await db.collection('swipedRight').doc(swipeRef.id).update({userId:swipeRef.id})
  });
  };

    // Save swipe rights to Firestore
    const saveSwipeLeftToFirestore = async(userId, userData) => {
      const swipeRef = await db.collection('swipedLeft').doc();
      swipeRef.set({
        userId,
        userData,    
      }).then(async() => {
        await db.collection('swipedLeft').doc(swipeRef.id).update({userId:swipeRef.id})
    });
  }

  const handleYup = (data) => {
    console.log("YEEEY")
    //dispatch(addToMatches(data))
    saveSwipeRightToFirestore(user.uid, data);
    return true;
  };

  const handleNope = (data) => {
    console.log("YOOO")
    //dispatch(addToMatches(data))
    saveSwipeLeftToFirestore(user.uid, data);
    return true;
  };

  function handleMaybe() {
    console.log(`Maybe baby`);
    return true;
  }

  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();
        const results = data.results;
        setCards((prevCards) => [...prevCards, ...results]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCardsData();
  }, []);


  return (
    <View style={tw`h-full w-full items-center justify-start bg-[#D34A4E] gap-5`}>
        <View style={tw`pt-15 flex items-center`}>
          <Text style={tw`text-white text-xl font-bold`}>Welcome {user.email}</Text>
          <Text style={tw`text-white text-xl font-bold`}>Swipe people to start matching!</Text>
        </View>

        <TouchableOpacity
                onPress={() => navigation.navigate("Matches")}
                style={tw`absolute top-15 left-5 bg-[#D34A4E] p-2 rounded-full border border-[#f9fafa]`}
            >
            <HeartIcon size={20} color="#f9fafa" />
        </TouchableOpacity>

        {/* here comes the card */}
        <View style={styles.container}>
        {cards ? (
          <SwipeCards
            cards={cards}
            renderCard={(cardData) => <Card data={cardData} />}
            keyExtractor={(cardData) => String(cardData.email)}
            renderNoMoreCards={() => <StatusCard text="No more cards..." />}
            actions={{
              nope: { onAction: handleNope },
              yup: { onAction: handleYup },
              maybe: { onAction: handleMaybe },
            }}
            hasMaybeAction={true}
          />
        ) : (
          <StatusCard text="Loading..." />
        )}
      </View>
    </View>
  )
}

export default HomeScreen