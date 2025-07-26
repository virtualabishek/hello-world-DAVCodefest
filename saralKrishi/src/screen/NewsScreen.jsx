import { FlatList, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../store/authStore.js';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const NewsScreen = () => {

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchNews = async () => {
    try {
      const response = await axios.get(`${API_URL}/news/all-news`);
      console.log('Fetched news:', response.data); // Debugging
      setNews(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2e64e5" />
        <Text>Loading news...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to fetch news. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        renderItem={({ item }) => <NewsItem item={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: hp('5%') }}
      />

    </View>

  );
};

const NewsItem = ({ item }) => {
  return (
    <View style={styles.newsItem}>
      <Image source={{ uri: item.image }} style={styles.newsImage} />
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsContent} numberOfLines={3}>{item.content}</Text>
      <Text style={styles.newsDate}>{new Date(item.date).toDateString()}</Text>
    </View>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: hp('2%'),
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
  newsItem: {
    backgroundColor: '#fff',
    marginBottom: hp('2%'),
    padding: hp('2%'),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  newsImage: {
    width: '100%',
    height: hp('20%'),
    borderRadius: 10,
  },
  newsTitle: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    marginTop: hp('1%'),
  },
  newsContent: {
    fontSize: hp('2%'),
    color: '#555',
    marginTop: hp('1%'),
  },
  newsDate: {
    fontSize: hp('1.8%'),
    color: '#888',
    marginTop: hp('1%'),
    textAlign: 'right',
  },
});
