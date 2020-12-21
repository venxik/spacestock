import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  borderRadius,
  DeviceWidth,
  HEADER_MAX_HEIGHT,
  STATUS_BAR_HEIGHT,
  HEADER_SCROLL_DISTANCE,
  horizontal,
  ios,
  DeviceHeight,
} from '../contants/config';
import LargeImageHorizontalList from '../components/LargeImageHorizontalList';
import {SafeAreaView} from 'react-native-safe-area-context';
import SmallImageHorizontalList from '../components/SmallImageHorizontalList';
import types from '../contants/json/types.json';
import locations from '../contants/json/locations.json';
import {colors} from '../contants/color';
import {isIphoneX} from 'react-native-iphone-x-helper';
import { useSelector } from 'react-redux';
import SavedItemList from '../components/SavedItemList';

const HomeScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

  const {savedList} = useSelector((state) => state.savedItemReducers);

  const animatedScrollYValue = useRef(new Animated.Value(0)).current;
  const [isLight, setLight] = useState(true);
  const headerColor = animatedScrollYValue.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: ['transparent', 'white'],
    extrapolate: 'clamp',
  });
  const searchColor = animatedScrollYValue.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [colors.white, '#EAEAEA'],
    extrapolate: 'clamp',
  });

  const onItemClick = useCallback((item) => {
    navigation.navigate('BuildingListScreen', item);
  });

  return (
    <SafeAreaView style={styles.fill} edges={['bottom']}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={isLight ? 'light-content' : 'dark-content'}
        animated
      />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.fill}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: animatedScrollYValue}}}],
          {
            listener: (e) => {
              if (e.nativeEvent.contentOffset.y >= HEADER_MAX_HEIGHT) {
                setLight(false);
              } else {
                setLight(true);
              }
            },
            useNativeDriver: false,
          },
        )}>
        <View
          style={{
            position: 'absolute',
            right: 0,
            left: 0,
            height: HEADER_MAX_HEIGHT,
          }}>
          <Animated.View
            style={{
              flex: 1,
              paddingTop: isIphoneX()
                ? STATUS_BAR_HEIGHT + DeviceWidth * 0.02
                : STATUS_BAR_HEIGHT + 20,
              paddingBottom: isIphoneX()
                ? STATUS_BAR_HEIGHT - DeviceWidth * 0.07
                : STATUS_BAR_HEIGHT - 10,
              paddingHorizontal: DeviceWidth * 0.1,
              backgroundColor: headerColor,
            }}>
            <Animated.View
              style={{
                backgroundColor: searchColor,
                flex: 1,
                borderRadius: borderRadius,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: horizontal,
                  borderRadius: borderRadius,
                }}>
                <TextInput
                  style={{
                    flex: 1,
                    fontWeight: 'bold',
                  }}
                  placeholder="Search Here"
                  value={searchText}
                  onChangeText={(e) => setSearchText(e)}
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('SearchFilterScreen', searchText)
                  }
                  style={{
                    paddingHorizontal: horizontal,
                    justifyContent: 'center',
                    borderTopRightRadius: borderRadius,
                    borderBottomRightRadius: borderRadius,
                    backgroundColor: colors.lightred,
                  }}>
                  <Text style={{fontWeight: 'bold', color: colors.white}}>
                    Search
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
        </View>
        <View
          style={{
            flex: 1,
            height: DeviceWidth * 0.8,
          }}>
          <View
            style={{
              position: 'absolute',
              top: -STATUS_BAR_HEIGHT,
            }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
                position: 'absolute',
                zIndex: 1,
                top: DeviceHeight * 0.22,
                left: 50,
                width: '70%',
                flexWrap: 'wrap',
              }}>
              This is Spacestock
            </Text>
            <Image
              resizeMode={'cover'}
              style={{
                width: DeviceWidth,
                height: DeviceWidth * 0.9,
              }}
              source={{
                uri:
                  'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
              }}
            />
          </View>
        </View>

        <View style={{flex: 1, marginTop: DeviceWidth * 0.1}}>
          <SmallImageHorizontalList
            onPress={onItemClick}
            title={'TYPE'}
            data={types}
            filterType={'type'}
          />
          <LargeImageHorizontalList
            title={'AROUND YOU'}
            data={locations}
            filterType={'location'}
            onPress={onItemClick}
          />
          <LargeImageHorizontalList
            title={'HOT'}
            data={locations}
            filterType={'location'}
            onPress={onItemClick}
          />
          <LargeImageHorizontalList
            title={'BEST LOCATION'}
            data={locations}
            filterType={'location'}
            onPress={onItemClick}
          />
          <SavedItemList
            title={'SAVED'}
            data={savedList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    paddingTop: STATUS_BAR_HEIGHT,
    height: STATUS_BAR_HEIGHT,
  },
});
export default HomeScreen;
