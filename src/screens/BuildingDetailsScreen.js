import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Linking,
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import {parseCurrency} from '../helper/numberFormat';
import {
  DeviceHeight,
  horizontal,
  STATUS_BAR_HEIGHT,
  DeviceWidth,
} from '../contants/config';
import {colors} from '../contants/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {capitalize} from '../helper/capitalize';
import {useDispatch, useSelector} from 'react-redux';
import {deleteItem, saveItem} from '../redux/actions/savedItem';

const IMAGE_HEIGHT = DeviceHeight * 0.3;

const Separator = () => (
  <View
    style={{
      marginHorizontal: horizontal,
      height: 1,
      backgroundColor: 'lightgray',
      marginVertical: 24,
    }}
  />
);

const ItemDetails = (props) => (
  <View style={{flexDirection: 'row'}} key={props.key}>
    <Text style={{fontWeight: 'bold', color: 'gray'}}>
      {`${props.item} `}
      <MaterialCommunityIcons name={'checkbox-blank-circle'} size={8} />{' '}
    </Text>
  </View>
);

const BuildingDetailsScreen = ({navigation, route}) => {
  const {params} = route;
  const {
    name,
    image,
    location,
    status,
    size,
    price,
    details,
    hosted,
    type,
    unitDetails,
  } = params;

  const animatedImage = useRef(new Animated.Value(0)).current;

  const scaleImage = animatedImage.interpolate({
    inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT, IMAGE_HEIGHT + 1],
    outputRange: [2, 1, 0.5, 0.5],
  });

  const translateYImage = animatedImage.interpolate({
    inputRange: [0, IMAGE_HEIGHT, IMAGE_HEIGHT + 1],
    outputRange: [0, IMAGE_HEIGHT * 0.75, IMAGE_HEIGHT * 0.75],
  });

  const dispatch = useDispatch();
  const {savedList} = useSelector((state) => state.savedItemReducers);

  const [saved, setSaved] = useState(false);

  const saveLocation = useCallback(() => {
    if (saved) {
      dispatch(deleteItem(params));
    } else {
      dispatch(saveItem(params));
    }
  });

  const callHost = () => {
    Linking.openURL(`tel:081212121212121`)
  }

  useEffect(() => {
    const found = savedList.find((item) => item.id === params.id);
    if (found) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [savedList]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomHeader
        title={name}
        onPressLove={saveLocation}
        isOnSavedItemList={saved}
      />
      <Animated.ScrollView
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: animatedImage}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}>
        <View style={{flex: 1}}>
          <View style={styles.mainImageContainer}>
            <Animated.Image
              style={[
                styles.mainImage,
                {
                  transform: [
                    {translateY: translateYImage},
                    {scale: scaleImage},
                  ],
                },
              ]}
              resizeMode="cover"
              source={{
                uri: image,
              }}
            />
          </View>
          <Text style={styles.title}>{name}</Text>
          <Text style={{marginHorizontal: horizontal}}>
            {location}, Indonesia
          </Text>
          <Separator />
          <View style={{marginHorizontal: horizontal, flexDirection: 'row'}}>
            <Text style={styles.host}>
              {`${capitalize(type)} By ${hosted}`}
            </Text>
            <View style={styles.hostImage} />
          </View>
          <View style={styles.unitDetails}>
            {unitDetails.map((value, index) => (
              <ItemDetails item={value} key={index} />
            ))}
          </View>
          <Separator />
          <Text style={{marginHorizontal: horizontal*2, fontSize: 18}}>{details}</Text>
          <TouchableOpacity style={styles.contactHostContainer} onPress={() => callHost()}>
            <Text style={styles.contactHostText}>Contact host</Text>
          </TouchableOpacity>
          <Separator />
        </View>
      </Animated.ScrollView>
      <View style={styles.priceContainer}>
        <View style={[styles.price]}>
          <Text style={styles.priceText}>{parseCurrency(price)}</Text>
          <Text>{' / night'}</Text>
        </View>
        <TouchableOpacity
        onPress={() => callHost()}
          style={[
            styles.contactHost,
            {borderColor: colors.lightgrey, borderWidth: 1},
          ]}>
          <Text style={{fontWeight: 'bold', color: colors.black}}>Contact</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: STATUS_BAR_HEIGHT,
  },
  mainImage: {
    width: '140%',
    height: IMAGE_HEIGHT,
  },
  mainImageContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginHorizontal: horizontal,
    paddingBottom: 12,
    paddingTop: 24,
    fontSize: 24,
    fontWeight: 'bold',
  },
  host: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    textAlignVertical: 'center',
  },
  hostImage: {
    width: DeviceWidth * 0.15,
    height: DeviceWidth * 0.15,
    backgroundColor: 'lightgray',
    borderRadius: 50,
  },
  unitDetails: {
    marginTop: 20,
    marginHorizontal: horizontal,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  contactHostContainer: {
    marginHorizontal: horizontal,
    paddingVertical: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 12,
  },
  contactHost: {
    paddingVertical: 12,
    paddingHorizontal: DeviceWidth * 0.1,
    backgroundColor: colors.color_one_500,
    borderRadius: 12,
  },
  contactHostText: {
    fontWeight: 'bold',
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  priceContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    paddingHorizontal: horizontal,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: 'lightgray',
  },
  price: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  priceText: {fontWeight: 'bold', fontSize: 18},
});

export default BuildingDetailsScreen;
