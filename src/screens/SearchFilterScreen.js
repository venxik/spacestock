import React, {useCallback, useRef} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import BuildingItemList from '../components/BuildingItemList';
import {colors} from '../contants/color';
import {STATUS_BAR_HEIGHT, HeaderConfig, horizontal, NORMAL_HEADER_HEIGHT} from '../contants/config';
import buildings from '../contants/json/buildings.json';
import LoadingIndicator from '../components/LoadingIndicator';
import CustomHeader from '../components/CustomHeader';

const SearchFilterScreen = ({navigation, route}) => {
  HeaderConfig(true);
  const searchTextdata = route.params;

  const filterAnimatedValue = useRef(new Animated.Value(0)).current;

  const animatedShowFilter = filterAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [(-NORMAL_HEADER_HEIGHT-STATUS_BAR_HEIGHT)*5, NORMAL_HEADER_HEIGHT+STATUS_BAR_HEIGHT],
    extrapolate: 'clamp'
  })

  const showFilterView = () => {
    // Will change filterAnimatedValue value to 1 in 5 seconds
    Animated.timing(filterAnimatedValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
    setShowFilter(true);
  };

  const hideFilterView = () => {
    Animated.timing(filterAnimatedValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setShowFilter(false);
    });
  };

  const [searchText, setSearchText] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [data, setData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [sortNameType, setSortNameType] = useState('');
  const [sortPriceType, setSortPriceType] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setSearchText(searchTextdata);
    setLoading(true);
    if (searchTextdata !== '') {
      const dummy = buildings.filter((x) => {
        return (
          x.name.toLowerCase().includes(searchTextdata.toLowerCase()) ||
          x.type.toLowerCase().includes(searchTextdata.toLowerCase()) ||
          x.location.toLowerCase().includes(searchTextdata.toLowerCase())
        );
      });
      setData(dummy);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
      setData(buildings);
      setLoading(false);
    }
  }, []);

  const navigateToDetails = useCallback((item) => {
    console.log("navigate to details")
    navigation.navigate('BuildingDetailsScreen', item, {name: item.name});
  });

  const filterLocation = () => {
    const dummy2 = buildings.filter((x) => {
      return (
        x.name.toLowerCase().includes(searchText.toLowerCase()) ||
        x.type.toLowerCase().includes(searchText.toLowerCase()) ||
        x.location.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    // setData(dummy2);
    return dummy2;
  };

  const filterPrice = (dummy) => {
    console.log('data filter location', dummy);
    const dummy2 = dummy.filter((x) => {
      console.log(x.price);
      return x.price >= parseInt(minPrice) && x.price <= parseInt(maxPrice);
    });
    return dummy2;
  };

  const filterData = () => {
    setLoading(true);
    var dummyData = buildings;

    if (minPrice === '' && maxPrice !== '') {
      Alert.alert('Please input minimal price');
      setLoading(false);
      return;
    }
    if (minPrice !== '' && maxPrice === '') {
      Alert.alert('Please input maximum price');
      setLoading(false);
      return;
    }
    if (parseInt(minPrice) >= parseInt(maxPrice)) {
      Alert.alert('Minimal price must be less than maximum price');
      setLoading(false);
      return;
    }
    if (searchText !== '') {
      dummyData = filterLocation();
    }
    if (minPrice !== '' && maxPrice !== '') {
      dummyData = filterPrice(dummyData);
    }
    if (searchText === '' && minPrice === '' && maxPrice === '') {
      setData(buildings);
    }
    if (sortNameType !== '') {
      if (sortNameType === 'ascending') {
        dummyData = sortNameAscending(dummyData);
      } else {
        dummyData = sortNameDescending(dummyData);
      }
    }
    if (sortPriceType !== '') {
      if (sortPriceType === 'ascending') {
        dummyData = sortPriceAscending(dummyData);
      } else {
        dummyData = sortPriceDescending(dummyData);
      }
    }
    setData(dummyData);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // setShowFilter(false);
    hideFilterView();
  };

  const resetFilter = () => {
    setLoading(true);
    setData(buildings);
    setMaxPrice('');
    setMinPrice('');
    setSearchText('');
    setSortPriceType('')
    setSortNameType('')
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // setShowFilter(false);
    hideFilterView();
  };

  const sortNameAscending = (dummy) => {
    const dummy2 = dummy.sort((a, b) => {
      var nameA = a.name.split(' ').join('').toLowerCase();
      var nameB = b.name.split(' ').join('').toLowerCase();
      return nameA.localeCompare(nameB);
    });
    return dummy2;
  };

  const sortNameDescending = (dummy) => {
    const dummy2 = dummy.sort((a, b) => {
      var nameA = a.name.split(' ').join().toLowerCase();
      var nameB = b.name.split(' ').join().toLowerCase();
      return nameB.localeCompare(nameA);
    });
    return dummy2;
  };

  const sortPriceAscending = (dummy) => {
    const dummy2 = dummy.sort((a, b) => {
      return a.price - b.price;
    });
    console.log('dummy 2', dummy2);
    return dummy2;
  };

  const sortPriceDescending = (dummy) => {
    const dummy2 = dummy.sort((a, b) => {
      return b.price - a.price;
    });
    return dummy2;
  };

  const onPressRightHeader = useCallback(() => {
    // setShowFilter((state) => !state);
    // hideFilterView();
    if (!showFilter) {
      showFilterView();
    } else hideFilterView();
    // setShowFilter(!showFilter);
  });

  const checkSortNameType = (data) => {
    if (sortPriceType !== '') {
      setSortPriceType('');
    }
    if (sortNameType !== data) {
      setSortNameType(data);
    } else setSortNameType('');
  };

  const checkSortPriceType = (data) => {
    console.log(sortNameType);
    if (sortNameType !== '') {
      setSortNameType('');
    }
    if (sortPriceType !== data) {
      setSortPriceType(data);
    } else setSortPriceType('');
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomHeader
        title={searchText}
        onPressRight={onPressRightHeader}
        showFilter={showFilter}
      />
      {showFilter && (
        <Animated.View style={[styles.filterContainer, {transform: [{translateY: animatedShowFilter}]}]}>
          <View style={styles.filterInnerContainer}>
            <View style={styles.filterLocation}>
              <TextInput
                placeholder={'Location'}
                value={searchText}
                onChangeText={(e) => setSearchText(e)}
                style={{padding: 4}}
              />
            </View>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                marginLeft: 10,
                padding: 2,
              }}>
              Filter Price
            </Text>
            <View style={styles.priceFilterContainer}>
              <View style={styles.priceFilter}>
                <TextInput
                  placeholder={'Min Price'}
                  keyboardType={'numeric'}
                  onChangeText={(e) => setMinPrice(e)}
                  value={minPrice}
                  style={{padding: 4}}
                />
              </View>
              <View style={styles.filterHorizontalSeparator} />
              <View style={styles.priceFilter}>
                <TextInput
                  placeholder={'Max Price'}
                  keyboardType={'numeric'}
                  value={maxPrice}
                  onChangeText={(e) => setMaxPrice(e)}
                  style={{padding: 4}}
                />
              </View>
            </View>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                marginLeft: 10,
                padding: 2,
              }}>
              Sort by Alphabetical
            </Text>
            <View style={styles.sortContainer}>
              <TouchableOpacity
                style={styles.sort}
                onPress={() => checkSortNameType('ascending')}>
                <Text
                  style={{
                    fontWeight:
                      sortNameType === 'ascending' ? 'bold' : 'normal',
                    color:
                      sortNameType === 'ascending'
                        ? colors.lightred
                        : colors.black,
                  }}>
                  A-Z
                </Text>
              </TouchableOpacity>
              <View style={styles.filterHorizontalSeparator} />
              <TouchableOpacity
                style={styles.sort}
                onPress={() => checkSortNameType('descending')}>
                <Text
                  style={{
                    fontWeight:
                      sortNameType === 'descending' ? 'bold' : 'normal',
                    color:
                      sortNameType === 'descending'
                        ? colors.lightred
                        : colors.black,
                  }}>
                  Z-A
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                marginLeft: 10,
                padding: 2,
              }}>
              Sort by Price
            </Text>
            <View style={styles.sortContainer}>
              <TouchableOpacity
                style={styles.sort}
                onPress={() => checkSortPriceType('ascending')}>
                <Text
                  style={{
                    fontWeight:
                      sortPriceType === 'ascending' ? 'bold' : 'normal',
                    color:
                      sortPriceType === 'ascending'
                        ? colors.lightred
                        : colors.black,
                  }}>
                  Cheap - Expensive
                </Text>
              </TouchableOpacity>
              <View style={styles.filterHorizontalSeparator} />
              <TouchableOpacity
                style={styles.sort}
                onPress={() => checkSortPriceType('descending')}>
                <Text
                  style={{
                    fontWeight:
                      sortPriceType === 'descending' ? 'bold' : 'normal',
                    color:
                      sortPriceType === 'descending'
                        ? colors.lightred
                        : colors.black,
                  }}>
                  Expensive - Cheap
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  flex: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => filterData()}>
                <Text style={styles.applyFilter}>Apply Filter</Text>
              </TouchableOpacity>
              <View style={styles.filterHorizontalSeparator} />
              <TouchableOpacity
                style={{
                  flex: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => resetFilter()}>
                <Text style={styles.applyFilter}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <BuildingItemList
          onScroll={() => {
            if (showFilter) {
              onPressRightHeader()
            }
          }}
          data={data}
          onPress={navigateToDetails}
        />
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
  filterContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    zIndex: 1,
    overflow: 'hidden',
    // top: STATUS_BAR_HEIGHT+NORMAL_HEADER_HEIGHT,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    elevation: 3,
    paddingVertical: 6,
    shadowColor: 'black',
    shadowOffset: {
      height: 4,
      width: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  filterInnerContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    width: '100%',
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    paddingVertical: 4,
    marginVertical: 16,
  },
  filterLocation: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderColor: 'lightgray',
  },
  priceFilterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  priceFilter: {flex: 1, paddingVertical: 8, paddingHorizontal: 8},
  sortContainer: {
    flexDirection: 'row',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  sort: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  applyFilter: {
    fontWeight: 'bold',
    color: 'black',
    paddingVertical: 12,
  },
  filterHorizontalSeparator: {width: 1.5, backgroundColor: 'lightgray'},
  filterVerticalSeparator: {height: 1.5, backgroundColor: 'lightgray'},
});

export default SearchFilterScreen;
