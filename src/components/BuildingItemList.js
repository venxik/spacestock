import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {DeviceHeight, DeviceWidth} from '../contants/config';
import {parseCurrency} from "../helper/numberFormat";

const BuildingItemList = (props) => {
  const {data, onPress, onScroll} = props;

  const renderItem = (item) => {
    const {name, image, location, status, size, price} = item;
    return (
      <TouchableOpacity
      onPress={() => onPress(item)}
        style={{
          margin: 10,
          padding: 10,
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{
              width: DeviceWidth * 0.9,
              height: DeviceHeight * 0.2,
              borderRadius: 10,
            }}
            source={{
              uri: image,
            }}
          />
        </View>
        <View style={{marginTop: 16}}>
          <Text style={{margin: 2, fontSize: 16, fontWeight: 'bold'}}>
            {name}
          </Text>
          <Text style={{margin: 2}}>{location}</Text>
          <Text style={{margin: 2}}>{status}</Text>
          <View style={{margin: 2, flexDirection: 'row'}}>
            <Text> Size {`${size} m`}</Text>
            <Text style={{fontSize: 10}}>2</Text>
          </View>
          <Text style={{margin: 2}}>{parseCurrency(price)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmpty = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>There is no data</Text>
      </View>
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
      <FlatList
        data={data}
        onScroll={onScroll}
        contentContainerStyle={{flexGrow: 1}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => renderItem(item)}
        ListEmptyComponent={() => renderEmpty()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default BuildingItemList;
