import {Dimensions, Platform, StatusBar} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {isIphoneX} from 'react-native-iphone-x-helper';

const {width: DeviceWidth, height: DeviceHeight} = Dimensions.get('window');

const ios = Platform.OS === 'ios';

const HEADER_MAX_HEIGHT = 80 + getStatusBarHeight();
const STATUS_BAR_HEIGHT = getStatusBarHeight();
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - STATUS_BAR_HEIGHT;

const NORMAL_HEADER_HEIGHT = 50

const borderRadius = 80;
const horizontal = 24;

const HeaderConfig = (isDark) =>
{
  Platform.OS !== 'ios' && StatusBar.setBackgroundColor( "transparent")
  Platform.OS !== 'ios' && StatusBar.setTranslucent(true)
  StatusBar.setBarStyle( isDark ? "dark-content" : "light-content")
  StatusBar.animated
}

export {
  DeviceWidth,
  DeviceHeight,
  HEADER_MAX_HEIGHT,
  STATUS_BAR_HEIGHT,
  HEADER_SCROLL_DISTANCE,
  borderRadius,
  horizontal,
  ios,
  HeaderConfig,
  NORMAL_HEADER_HEIGHT
};
