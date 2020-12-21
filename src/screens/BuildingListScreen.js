import React, {useCallback} from 'react';
import {View, SafeAreaView, Text, StyleSheet, StatusBar} from 'react-native';
import buildings from '../contants/json/buildings.json';

import {useState} from 'react';
import {useEffect} from 'react';
import BuildingItemList from '../components/BuildingItemList';
import CustomHeader from '../components/CustomHeader';
import {STATUS_BAR_HEIGHT} from '../contants/config';

const BuildingListScreen = ({navigation, route}) => {
  const {params} = route;
  const {filterType, name, isSaved, data: savedData} = params || {};

  const [data, setData] = useState([]);

  useEffect(() => {
    if (filterType === 'type') {
      const dummy = buildings.filter((item) => {
        return item.type === name;
      });
      setData(dummy);
    }
    if (filterType === 'location') {
      const dummy = buildings.filter((item) => {
        return item.location === name;
      });
      setData(dummy);
    }
    if (savedData) {
      setData(savedData);
    }
  }, []);

  const navigateToDetails = useCallback((item) => {
    navigation.navigate('BuildingDetailsScreen', item, {name: item.name});
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <CustomHeader title={name} isSavedItems={isSaved} />
      <BuildingItemList data={data} onPress={navigateToDetails} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: STATUS_BAR_HEIGHT,
  },
});

export default BuildingListScreen;
