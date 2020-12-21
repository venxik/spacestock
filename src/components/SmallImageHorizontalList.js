import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import {DeviceHeight, DeviceWidth, horizontal} from '../contants/config';
import { capitalize } from "../helper/capitalize";

const SmallImageHorizontalList = (props) => {
  const {data, title, onPress, filterType} = props;

  const renderItem = (item, index) => {
    const {name, image} = item;
    return (
      <TouchableOpacity
        key={index}
        style={styles.listContainer}
        onPress={() => onPress({name, filterType})}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
          />
        </View>
        <View style={styles.contentTextContainer}>
          <Text style={styles.contentText}>{capitalize(name)}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={({...props.style}, styles.mainContainer)}>
      <Text style={styles.titleText}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => renderItem(item)}
        snapToInterval={DeviceWidth * 0.2 + DeviceWidth * 0.5}
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: horizontal,
  },
  titleText: {fontWeight: 'bold', paddingVertical: 8, fontSize: 16},
  listContainer: {
    width: DeviceWidth * 0.2,
    marginRight: horizontal * 0.5,
  },
  imageContainer: {
    backgroundColor: 'lightgray',
    height: DeviceHeight * 0.1,
    borderRadius: 12,
  },
  image: {
    backgroundColor: 'lightgray',
    height: DeviceHeight * 0.1,
    borderRadius: 12,
  },
  locationText: {
    backgroundColor: 'lightgray',
    height: DeviceHeight * 0.1,
    borderRadius: 12,
  },
  contentText: {
    fontWeight: 'bold',
  },
  contentTextContainer: {
    marginTop: 4,
  },
});

export default SmallImageHorizontalList;
