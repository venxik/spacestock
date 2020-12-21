import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../contants/color';
import {
  horizontal,
  NORMAL_HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
} from '../contants/config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const CustomHeader = (props) => {
  const {
    title,
    showFilter,
    onPressRight,
    onPressLove,
    isOnSavedItemList,
    isSavedItems
  } = props;
  const navigation = useNavigation();

  const setTitle = () => {
    return showFilter ? 'Edit your search' : title ? title.toUpperCase() : isSavedItems ? 'SAVED' : 'SEARCH';
  };

  return (
    <View
      style={[
        styles.mainContainer,
        {
          borderBottomWidth: !showFilter ? 1 : 0,
          elevation: !showFilter ? 0 : 3,
        },
      ]}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name={'arrow-left'} size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.centerContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          {setTitle()}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        {onPressLove && (
          <TouchableOpacity onPress={() => onPressLove()}>
            <MaterialCommunityIcons
              name={isOnSavedItemList ? 'heart' : 'heart-outline'}
              size={24}
              color={colors.color_one_500}
            />
          </TouchableOpacity>
        )}
        {onPressRight && (
          <TouchableOpacity onPress={() => onPressRight()}>
            {showFilter ? (
              <MaterialCommunityIcons name={'close'} size={24} />
            ) : (
              <Ionicons name={'options-outline'} size={24} />
            )}
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          height: STATUS_BAR_HEIGHT,
          backgroundColor: colors.white,
          top: -STATUS_BAR_HEIGHT,
          left: 0,
          right: 0,
        }}
      />
    </View>
  );
};
export default CustomHeader;

const styles = StyleSheet.create({
  mainContainer: {
    height: NORMAL_HEADER_HEIGHT,
    backgroundColor: colors.white,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: horizontal,
    borderBottomColor: 'lightgray',
  },
  leftContainer: {position: 'absolute', left: 15},
  centerContainer: {width: '70%', alignItems: 'center', paddingVertical: 2},
  rightContainer: {position: 'absolute', right: 15},
});
