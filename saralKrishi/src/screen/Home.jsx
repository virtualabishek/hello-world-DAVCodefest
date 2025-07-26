import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderComp from '../components/HeaderComp';
import WeatherCompnent from '../components/WeatherCompnent';
import LinearGradient from 'react-native-linear-gradient';
import NewsContainer from '../components/NewsContainer';
import { useNavigation } from '@react-navigation/native';
import ProgressGraph from '../components/ProgressGraph';
import IndicatorBox from '../components/IndicatorBox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { userAuthStore } from '../store/authStore';
import Geolocation from 'react-native-geolocation-service';
import DynamicChart from '../components/DynamicChart';
import { newsData } from '../Data/news';
import NewsScreen from './NewsScreen';

const openweatherApi = '&appid=5e0c4d7564f485afbd09ea6e9b55adb4';
const url = 'https://api.openweathermap.org/data/2.5/forecast?q=Birgunj&units=metric';

const Home = () => {


  const { user } = userAuthStore();
  const navigation = useNavigation();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isGraphVisible, setIsGraphVisible] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [deviceCode, setDeviceCode] = useState('');

  const WeatherData = async () => {
    try {
      const response = await fetch(`${url}${openweatherApi}`);
      const data = await response.json();
      processWeatherData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const processWeatherData = data => {
    const today = data.list[0];
    const days = [];

    for (let i = 0; i < 7; i++) {
      const dayIndex = i * 8; // Select data point for each day (24 hours / 3 hours = 8)
      days.push(data.list[dayIndex]);
    }

    setWeather({
      date: today.dt_txt.split(' ')[0],
      temp: today.main.temp,
      city: data.city.name,
      humidity: today.main.humidity,
      moisture: today.main.moisture || 50, // Assuming moisture is part of the API response
      days,
    });
  };

  const getLocation = async () => {
    if (await hasLocationPermission()) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position, 'position');
        },
        error => {
          console.log(error.code, error.message);
          Alert.alert('Error', 'Unable to fetch location. Please try again.');
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    } else {
      Alert.alert(
        'Permission Denied',
        'Location permission is required to fetch your location.',
      );
    }
  };

  useEffect(() => {
    getLocation();
    WeatherData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error fetching weather data: {error.message}
        </Text>
      </View>
    );
  }

  const handleConnectDevice = () => {
    if (isConnected) {
      setIsConnected(false);
      setIsGraphVisible(false);
    } else {
      setIsFormVisible(!isFormVisible);
    }
  };

  const handleFormSubmit = () => {
    if (deviceId && deviceCode) {
      setIsFormVisible(false);
      setIsGraphVisible(true);
      setIsConnected(true);
      Alert.alert('Success', 'Device connected successfully!');
    } else {
      Alert.alert('Error', 'Please enter valid Device ID and Code.');
    }
  };

  const renderHeader = () => (
    <>
      <HeaderComp title={weather.city} />
      <WeatherCompnent
        date={weather.date}
        temp={weather.temp}
        days={weather.days}
      />

      {user?.devices || isGraphVisible ? (
        <View style={[styles.graph]}>
          <TouchableOpacity style={{ alignSelf: 'flex-start', marginVertical: 10, elevation: 5 }} onPress={handleConnectDevice}>
            <Text style={{ paddingHorizontal: 15, paddingVertical: 5, backgroundColor: 'darkgreen', borderRadius: 10, color: 'white' }}>
              Disconnect
            </Text>
          </TouchableOpacity>
          <View style={[styles.progressContainer]}>
            <View style={styles.line}>
              <TouchableOpacity style={{ position: 'absolute', top: -7, left: hp('7.7%') }}>
                <Text style={{
                  fontSize: hp('1%'), backgroundColor: '#5CB338', borderRadius: 5,
                  color: 'white', paddingVertical: 1, paddingHorizontal: 7, fontWeight: '900'
                }}>ON</Text>
              </TouchableOpacity>
              <ProgressGraph fill={weather.humidity} label="Humidity" />
            </View>
            <View style={styles.line}>
              <TouchableOpacity style={{ position: 'absolute', top: -7, left: hp('7.7%') }}>
                <Text style={{
                  fontSize: hp('1%'), backgroundColor: '#5CB338', borderRadius: 5,
                  color: 'white', paddingVertical: 1, paddingHorizontal: 7, fontWeight: '900'
                }}>ON</Text>
              </TouchableOpacity>
              <ProgressGraph fill={weather.moisture} label="Moisture" />
            </View>
            <View style={styles.line}>
              <TouchableOpacity style={{ position: 'absolute', top: -7, left: hp('10%') }}>
                <Text style={{
                  fontSize: hp('1%'), backgroundColor: '#5CB338', borderRadius: 5,
                  color: 'white', paddingVertical: 1, paddingHorizontal: 7, fontWeight: '900'
                }}>ON</Text>
              </TouchableOpacity>
              <ProgressGraph fill={weather.moisture} label="Water Level" />
            </View>
          </View>

          <View style={[styles.progressContainer, { backgroundColor: 'none', elevation: 0 }]}>
            <View>
              <TouchableOpacity style={{ position: 'absolute', top: -5, left: hp('5.5%'), zIndex: 1 }}>
                <Text style={{
                  fontSize: hp('1%'), backgroundColor: '#5CB338', borderRadius: 5,
                  color: 'white', paddingVertical: 1, paddingHorizontal: 7, fontWeight: '900'
                }}>ON</Text>
              </TouchableOpacity>
              <IndicatorBox img={require('../assets/fire.png')} />
              <Text>Fire Alarm</Text>
            </View>
            <View>
              <TouchableOpacity style={{ position: 'absolute', top: -5, left: hp('5.5%'), zIndex: 1 }}>
                <Text style={{
                  fontSize: hp('1%'), backgroundColor: '#5CB338', borderRadius: 5,
                  color: 'white', paddingVertical: 1, paddingHorizontal: 7, fontWeight: '900'
                }}>ON</Text>
              </TouchableOpacity>
              <IndicatorBox img={require('../assets/animals.png')} />
              <Text style={{ marginLeft: 5 }}>security</Text>
            </View>
            <View>
              <TouchableOpacity style={{ position: 'absolute', top: -5, left: hp('5.5%'), zIndex: 1 }}>
                <Text style={{
                  fontSize: hp('1%'), backgroundColor: '#5CB338', borderRadius: 5,
                  color: 'white', paddingVertical: 1, paddingHorizontal: 7, fontWeight: '900'
                }}>ON</Text>
              </TouchableOpacity>
              <IndicatorBox img={require('../assets/smoke.png')} />
              <Text>Smoke</Text>
            </View>
            <View>
              <TouchableOpacity style={{ position: 'absolute', top: -5, left: hp('5.5%'), zIndex: 1 }}>
                <Text style={{
                  fontSize: hp('1%'), backgroundColor: '#5CB338', borderRadius: 5,
                  color: 'white', paddingVertical: 1, paddingHorizontal: 7, fontWeight: '900'
                }}>ON</Text>
              </TouchableOpacity>
              <IndicatorBox img={require('../assets/warning.png')} />
              <Text>Weather</Text>
            </View>

          </View>
          <DynamicChart />
        </View>
      ) : (
        <View style={{ marginVertical: hp('1%'), justifyContent: 'space-between', flexDirection: 'row', width: wp('90%') }}>
          <TouchableOpacity onPress={handleConnectDevice}>
            <Text style={{
              color: 'white',
              fontWeight: '800',
              paddingHorizontal: 5,
              paddingVertical: 5,
              backgroundColor: isConnected ? 'green' : 'darkred',
              width: wp('40%'),
              textAlign: 'center',
              borderRadius: 10
            }}>
              {isConnected ? "Disconnect" : isFormVisible ? "Cancel" : "Connect Device"}
            </Text>
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: hp('1.5%'), opacity: 0.6 }}>
            {isConnected ? "Device connected" : "No device connected !!"}
          </Text>
        </View>
      )}
      {isFormVisible && (
        <View style={{ backgroundColor: "lightgray", width: '90%', margin: 'auto', borderRadius: 12, height: hp('25%'), padding: 10, gap: 10 }}>
          <View>
            <Text style={{ marginLeft: hp('4%'), fontSize: hp('1.4%') }}>Device ID No</Text>
            <TextInput
              placeholderTextColor={'gray'}
              placeholder='Device Id No'
              style={{ borderWidth: 2, borderRadius: 10, width: '80%', margin: 'auto' }}
              value={deviceId}
              onChangeText={setDeviceId}
            />
          </View>
          <View>
            <Text style={{ marginLeft: hp('4%'), fontSize: hp('1.4%') }}>Device Code</Text>
            <TextInput
              placeholderTextColor={'gray'}
              placeholder='Device Code'
              style={{ borderWidth: 2, borderRadius: 10, width: '80%', margin: 'auto' }}
              value={deviceCode}
              onChangeText={setDeviceCode}
            />
          </View>
          <TouchableOpacity style={{ fontSize: hp('1%'), backgroundColor: 'darkred', width: '35%', borderRadius: 10, paddingVertical: 3, marginLeft: hp('3.5%') }} onPress={handleFormSubmit}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Connect</Text>
          </TouchableOpacity>
        </View>
      )}


      <View style={[styles.container, styles.exportContainer]}>
        <View style={styles.exportTxtContainer}>
          <Text style={styles.exportTitle}>Farming Tips from top farmers</Text>
          <Text style={styles.color}>
            Get in touch with Top farmes earing 12+ lakhs per season!!
          </Text>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnTxt}>Contact Now</Text>
          </TouchableOpacity>
        </View>
        <Image source={require('../assets/farmer.png')} style={styles.img} />
      </View>
      <View style={[styles.footerConatiner]}>
        <TouchableOpacity
          style={[styles.tipsConatiner]}
          onPress={() => navigation.navigate('Tips')}>
          <Text style={{ width: '70%', color: 'white' }}>
            Get your location based farming tips
          </Text>
          <Image
            source={require('../assets/tips.png')}
            style={{ width: 45, height: 45 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.camerContainer]}
          onPress={() => navigation.navigate('CameraPage')}>
          <Image
            source={require('../assets/camera.png')}
            style={{ width: 43, height: 43 }}
          />
          <Text style={{ color: 'white' }}>Scan to Identify Problems</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: wp('3%'),
        }}>
        <Text style={styles.title}>News</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NewsScreen')}>
          <Text style={[styles.title, { fontSize: hp('2%') }]}>View All</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <LinearGradient
      colors={['#0B7645', '#B5C1AE']}
      style={styles.linearGradient}>
      <FlatList
        data={newsData}
        renderItem={({ item }) => <NewsContainer item={item} />}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: hp('2%') }}
      />
    </LinearGradient>
    // <View>
    //   <Text> hllo</Text>
    // </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: wp('4%'),
    paddingRight: wp('4%'),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: hp('2.5%'),
  },
  container: {
    height: hp('20%'),
    width: wp('90%'),
    borderWidth: 1,
    borderColor: 'white',
    margin: 'auto',
    borderRadius: 10,
    marginVertical: hp('1%'),
  },
  btn: {
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.5%'),
    backgroundColor: 'white',
    width: wp('30%'),
    height: hp('4%'),
    borderRadius: 10,
    textAlign: 'center',
  },
  btnTxt: {
    fontSize: hp('2%'),
    fontWeight: '700',
  },
  img: {
    height: hp('25%'),
    width: wp('45%'),
    resizeMode: 'contain',
    position: 'relative',
    top: -hp('3%'),
    right: wp('10%'),
    zIndex: 0,
  },
  exportContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp('5%'),
    alignItems: 'center',
    backgroundColor: '#013220',
  },
  exportTxtContainer: {
    width: wp('55%'),
    zIndex: 1,
    justifyContent: 'space-evenly',
    height: '100%',
    paddingLeft: wp('2%'),
  },
  exportTitle: {
    fontSize: hp('2.5%'),
    fontWeight: '600',
    color: 'white',
  },
  color: {
    color: 'white',
  },
  footerConatiner: {
    height: hp('6.5%'),
    width: wp('94%'),
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 'auto',
    marginRight: wp('0.5%'),
    gap: wp('4%'),
  },
  tipsConatiner: {
    backgroundColor: '#013220',
    height: '100%',
    width: wp('45%'),
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: wp('2%'),
  },
  camerContainer: {
    backgroundColor: '#013220',
    height: '100%',
    width: wp('43%'),
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: wp('1%'),
    padding: wp('1%'),
  },
  title: {
    fontSize: hp('2.5%'),
    fontWeight: '600',
    color: '#013220',
    marginLeft: wp('5%'),
    marginVertical: hp('2%'),
  },
  graph: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp('1%'),
    marginVertical: hp('1%'),
    borderRadius: hp('1%'),
    margin: 'auto',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: wp('90%'),
    backgroundColor: 'lightgray',
    borderRadius: hp('1%'),
    paddingVertical: hp('1%'),
  },
  line: {
    borderRightWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
  },
});