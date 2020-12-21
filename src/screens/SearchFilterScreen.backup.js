import React, {useCallback, useRef} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Animated,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BuildingItemList from '../components/BuildingItemList';
import {colors} from '../contants/color';
import {DeviceHeight, DeviceWidth, STATUS_BAR_HEIGHT, HeaderConfig, horizontal} from '../contants/config';
import buildings from '../contants/json/buildings.json';
import LoadingIndicator from '../components/LoadingIndicator';

const SearchFilterScreen = ({navigation, route}) => {
  HeaderConfig(true)
  const searchTextdata = route.params

  const animatedScrollYValue = useRef(new Animated.Value(0)).current
  const [searchText, setSearchText] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [data, setData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setSearchText(searchTextdata);
  }, []);

  useEffect(() => {
    setLoading(true);
    console.log(searchText);
    if (searchText !== '') {
      const dummy = buildings.filter((x) => {
        return (
          x.name.toLowerCase().includes(searchText.toLowerCase()) ||
          x.type.toLowerCase().includes(searchText.toLowerCase()) ||
          x.location.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setData(dummy);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
      setData([]);
      setLoading(false);
    }
  }, [searchText]);

  const navigateToDetails = useCallback((item) => {
    navigation.navigate('BuildingDetailsScreen', item, {name: item.name});
  });

  const filterData = () => {
    setLoading(true);
    if (searchText !== '') {
      data.filter((x) => {
        return x.price >= parseInt(minPrice) || x.price <= parseInt(maxPrice);
      });
    } else {
      const dummy = buildings.filter((x) => {
        return x.price >= parseInt(minPrice) && x.price <= parseInt(maxPrice);
      });
      setData(dummy);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    setShowFilter(false);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View
        style={{
          backgroundColor: colors.white,
          width: '100%',
          height: DeviceHeight * 0.1,
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TextInput
          style={{
            padding: 20,
            fontSize: 16,
            width: DeviceWidth * 0.6,
            backgroundColor: colors.lightgrey,
            borderRadius: 20,
          }}
          placeholder="Search"
          onChangeText={(e) => setSearchText(e)}
          value={searchText}
        />
        <View>
          <TouchableOpacity
            style={styles.arrowIconContainer}
            onPress={() => {
              setShowFilter(!showFilter);
            }}>
            <Text>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.arrowIconContainer}
            onPress={() => {
              setShowSort(!showSort);
            }}>
            <Text>Sort</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{height: 0.5, width: '100%', backgroundColor: 'grey'}}/>
      {showFilter && (
        <View
          style={{
            paddingHorizontal: horizontal,
            paddingVertical: 4,
            backgroundColor: colors.white,
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 12, marginVertical: 4, fontWeight: 'bold'}}>
            Filter
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 4,
            }}>
            <Text style={{fontSize: 18}}>Min Price</Text>
            <TextInput
              style={{
                padding: 5,
                fontSize: 14,
                width: DeviceWidth * 0.5,
                backgroundColor: colors.lightgrey,
                borderRadius: 5,
              }}
              keyboardType="numeric"
              placeholder="Min Price"
              onChangeText={(e) => setMinPrice(e)}
              value={minPrice}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 4,
            }}>
            <Text style={{fontSize: 18}}>Max Price</Text>
            <TextInput
              style={{
                padding: 5,
                fontSize: 14,
                width: DeviceWidth * 0.5,
                backgroundColor: colors.lightgrey,
                borderRadius: 5,
              }}
              keyboardType="numeric"
              placeholder="Max Price"
              onChangeText={(e) => setMaxPrice(e)}
              value={maxPrice}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.lightgrey,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}
            onPress={() => filterData()}>
            <Text> Filter</Text>
          </TouchableOpacity>
        </View>
      )}
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <BuildingItemList
          data={data}
          onPress={navigateToDetails} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: STATUS_BAR_HEIGHT,
  },
  arrowIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.lightgrey,
    marginVertical: 2,
    paddingVertical: 4,
    paddingHorizontal: horizontal,
    borderRadius: 10,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
});

export default SearchFilterScreen;
