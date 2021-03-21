import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Platform,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';

function Detail() {
  const [place, setPlace] = useState({gallery: []});
  const route = useRoute();

  useEffect(() => {
    axios
      .get(
        `https://traveller.talrop.works/api/v1/places/view/${route.params.id}/`,
      )
      .then(function (response) {
        setPlace(response.data.data);
      })
      .catch(function (error) {
        console.warn(error);
      });
  }, [route.params.id]);

  const renderGallery = () => {
    return place.gallery.map(item => (
      <Image style={styles.image} source={{uri: item.image}} />
    ));
  };
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topTitleContainer}>
          <Text style={styles.title}>{place.name}</Text>
        </View>

        <View style={styles.categories}>
          <View style={styles.round}>
            <Image style={styles.roundImage} source={{uri: place.image}} />
            <Text style={styles.categoryName}>{place.category_name}</Text>
          </View>
          <View style={styles.locationContainer}>
            <Image
              style={styles.locationIcon}
              source={require('../assets/icons/place.png')}
            />
            <Text style={styles.locationIcon}>{place.location}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <ScrollView
          contentContainerStyle={styles.bottomContainer}
          showsVerticalScrollIndicator={false}>
          <Image style={styles.featuredImage} source={{uri: place.image}} />
          <View style={styles.grid}>{renderGallery()}</View>
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>Place Details</Text>
            <Text style={styles.details}>{place.description}</Text>
          </View>
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  categories: {
    flexDirection: 'row',
    paddingLeft: 20,
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
  topTitleContainer: {
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  bottom: {
    flex: 1,
    padding: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  featuredImage: {
    width: '100%',
    height: 150,
    marginBottom: 5,
  },
  image: {
    width: '49%',
    height: 100,
    marginBottom: 5,
  },
  locationIcon: {
    marginRight: 5,
  },
  detailsContainer: {
    marginTop: 10,
  },
  details: {
    color: '#a9a7a7',
    marginTop: 5,
  },
});

export default Detail;
