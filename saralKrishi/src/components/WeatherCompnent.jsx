import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const WeatherCompnent = ({ date, temp, days }) => {
  const getDate = (day) => {
    if (day) {
      const date = new Date(day.dt_txt);
      const month = date.toLocaleString('default', { month: 'short' });
      const dayOfMonth = date.getDate();
      return `${month} ${dayOfMonth}`;
    }
    return '';
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'Clear':
        return 'weather-sunny';
      case 'Clouds':
        return 'weather-cloudy';
      case 'Rain':
        return 'weather-rainy';
      case 'Snow':
        return 'weather-snowy';
      case 'Thunderstorm':
        return 'weather-lightning';
      case 'Drizzle':
        return 'weather-hail';
      default:
        return 'weather-sunny';
    }
  };

  return (
    <LinearGradient colors={['#0A472B', '#B5C1AE']} style={styles.linearGradient}>
      <View style={styles.dateContainer}>
        <Text style={styles.txt}>{date}</Text>
        <View style={{ flexDirection: 'row', gap: wp('2%') }}>
          <Text style={styles.txt}>{temp}°C</Text>
          <MaterialCommunityIcons name="weather-sunny" size={hp('3%')} color={'white'} />
        </View>
      </View>

      <View style={styles.dayWeaterContainer}>
        {days.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={{ color: 'white', marginBottom: hp('1%') }}>{getDate(day)}</Text>
            {day && day.weather && day.weather[0] && (
              <>
                <MaterialCommunityIcons name={getWeatherIcon(day.weather[0].main)} size={hp('3%')} color={'white'} />
                <Text style={{ color: 'white', marginTop: hp('1%') }}>{day.main.temp}°C</Text>
              </>
            )}
          </View>
        ))}
      </View>
    </LinearGradient>
  );
};

export default WeatherCompnent;

const styles = StyleSheet.create({
  linearGradient: {
    paddingLeft: wp('4%'),
    paddingRight: wp('4%'),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    height: hp('20%'),
    width: wp('90%'),
    marginTop: hp('2%'),
    margin: 'auto',
    elevation: 4,
  },
  buttonText: {
    fontSize: hp('2.5%'),
    textAlign: 'center',
    margin: hp('1%'),
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
  },
  txt: {
    fontSize: hp('2.5%'),
    fontWeight: '600',
    color: '#fff',
  },
  dayWeaterContainer: {
    flexDirection: 'row',
    marginTop: hp('2%'),
  },
  dayContainer: {
    alignItems: 'center',
    marginHorizontal: wp('1.5%'),
  },
});
