import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {DeviceHeight, DeviceWidth, horizontal} from '../contants/config';

const LargeImageHorizontalList = (props) => {
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
          <Text style={styles.contentText}>{name ? name : 'Unknown'}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={[
        {
          ...props.style,
        },
        styles.mainContainer,
      ]}>
      <Text style={styles.titleText}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => renderItem(item)}
        snapToInterval={DeviceWidth * 0.45+16}
        decelerationRate='fast'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: horizontal,
    marginVertical: 16,
    marginTop: 12,
  },
  titleText: {fontWeight: 'bold', paddingVertical: 8, fontSize: 16},
  listContainer: {
    width: DeviceWidth * 0.45,
    height: DeviceHeight * 0.3,
    marginRight: 16,
  },
  imageContainer: {
    width: DeviceWidth * 0.45,
    height: DeviceHeight * 0.26,
    backgroundColor: 'lightgray',
    borderRadius: 12,
  },
  image: {
    width: DeviceWidth * 0.45,
    height: DeviceHeight * 0.26,
    borderRadius: 12,
  },
  contentText: {
    fontWeight: 'bold',
  },
  contentTextContainer: {
    marginTop: 4,
  },
});

export default LargeImageHorizontalList;
