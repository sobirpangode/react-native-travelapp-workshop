import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

function Home() {
  const [categories, setCategories] = useState([]);
  const [places, setPlaces] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get('https://traveller.talrop.works/api/v1/places/categories/')
      .then(function (response) {
        setCategories(response.data.data);
      })
      .catch(function (error) {
        console.warn(error);
      });

    axios
      .get('https://traveller.talrop.works/api/v1/places/')
      .then(function (response) {
        setPlaces(response.data.data);
      })
      .catch(function (error) {
        console.warn(error);
      });
  }, []);

  const renderCategories = () => {
    return categories.map(item => (
      <TouchableOpacity activeOpacity={0.8} style={styles.round}>
        <Image style={styles.roundImage} source={{uri: item.image}} />
        <Text style={styles.categoryName}>{item.name}</Text>
      </TouchableOpacity>
    ));
  };

  const renderPlaces = () => {
    return places.map(item => (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.box}
        onPress={() => navigation.push('Detail', {id: item.id})}>
        <Image style={styles.place} source={{uri: item.image}} />
        <Text style={styles.placeName}>{item.name}</Text>
        <View style={styles.boxBottom}>
          <Image
            style={styles.locationIcon}
            source={require('../assets/icons/place.png')}
          />
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topTitleContainer}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.description}>Explore the world around you.</Text>
        </View>

        <ScrollView
          style={styles.categories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {renderCategories()}
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <ScrollView
          contentContainerStyle={styles.bottomContainer}
          showsVerticalScrollIndicator={false}>
          {renderPlaces()}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerMainContainer: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  top: {
    marginTop: 20,
  },
  title: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Product Sans italic',
  },
  description: {
    color: '#a9a7a7',
  },
  categories: {
    flexDirection: 'row',
    paddingLeft: 20,
  },

  topTitleContainer: {
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  bottom: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  locationIcon: {
    marginRight: 5,
  },
  round: {
    borderWidth: 2,
    borderColor: '#026cf6',
    borderRadius: 50,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  roundImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  categoryName: {
    color: '#026cf6',
  },
  place: {
    width: '100%',
    height: 120,
    marginBottom: 5,
    borderRadius: 5,
  },
  placeName: {
    fontWeight: '700',
    marginBottom: 3,
  },
  box: {
    width: '48%',
    marginBottom: 20,
  },
  boxBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 5,
  },
  location: {
    fontSize: 12,
  },
});

export default Home;
