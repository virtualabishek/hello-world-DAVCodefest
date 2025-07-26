// import { Button, FlatList, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import CommunityPost from '../components/CommunityPost';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import { launchImageLibrary } from 'react-native-image-picker';
// import axios from 'axios';
// import {  userAuthStore } from '../store/authStore';
// import { API_URL } from '../store/authStore';

// const Community = () => {
//   const [state, setState] = useState(false);
//   const [imageUri, setImageUri] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalPosts, setTotalPosts] = useState(0);
//   const [hasNextPage, setHasNextPage] = useState(false);
//   const [error, setError] = useState(false);
//   const { user } = userAuthStore();
//   const limit = 5;

//   const pickImage = () => {
//     const options = {
//       mediaType: 'photo',
//       quality: 1,
//     };

//     launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorMessage) {
//         console.log('Image picker error: ', response.errorMessage);
//       } else {
//         setImageUri(response.assets[0].uri);
//       }
//     });
//   };

//   const fetchPosts = async () => {
//     console.log('RUNNING')

//     try {
//       const response = await axios.get(
//         `${API_URL}/community/post?page=${page}&limit=${limit}`
//       );

//       console.log('RESPONSE',response)

//       setPosts(response.data.post);
//       setTotalPosts(response.data.total);
//       const total = Math.ceil(response.data.total / limit);
//       setTotalPages(total > 10 ? 10 : total);

//       const nextPageResponse = await axios.get(
//         `${API_URL}/community/post?page=${page + 1}&limit=${limit}`
//       );
//       setHasNextPage(nextPageResponse.data.post.length > 0);
//       setError(false);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//       setError(true);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, [page]);

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Unable to fetch posts. Please try again later.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Community</Text>

//       <TouchableOpacity style={styles.addButton} onPress={() => setState(!state)}>
//         <View style={styles.addButtonInner}>
//           <FontAwesome name="plus" size={hp('5%')} color={'white'} />
//         </View>
//       </TouchableOpacity>

//       <FlatList
//         data={posts}
//         renderItem={({item,index})=>{
//           return <CommunityPost item={item} />
//         }}
//         keyExtractor={(item) => item._id}
//         contentContainerStyle={{ paddingBottom: hp('12%') }}

//       />

//       {state && (
//         <View style={styles.stateContainer}>
//           <TouchableOpacity onPress={() => setState(false)} style={styles.closeButton}>
//             <FontAwesome name="close" size={hp('4%')} color={'red'} />
//           </TouchableOpacity>
//           <View style={{ width: '80%' }}>
//             <Button title="Choose an Image" onPress={pickImage} color={'darkgreen'} />
//           </View>

//           {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

//           <TextInput
//             style={styles.input}
//             multiline
//             numberOfLines={10}
//             placeholder="Description of the post"
//             textAlignVertical="top"
//             placeholderTextColor='gray'
//           />

//           <TouchableOpacity style={styles.postButton}>
//             <Text style={styles.postButtonText}>Post</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// export default Community;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: wp('4%'),
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: hp('3%'),
//     fontWeight: '700',
//     textAlign: 'center',
//     marginVertical: hp('2%'),
//   },
//   addButton: {
//     position: 'absolute',
//     bottom: hp('10%'),
//     right: wp('5%'),
//     zIndex: 1,
//   },
//   addButtonInner: {
//     backgroundColor: 'darkgreen',
//     paddingHorizontal: hp('1.3%'),
//     paddingVertical: hp('0.7%'),
//     borderRadius: hp('12%'),
//   },
//   stateContainer: {
//     position: 'absolute',
//     bottom: hp('15%'),
//     right: wp('5%'),
//     backgroundColor: 'white',
//     height: hp('40%'),
//     width: wp('90%'),
//     elevation: 5,
//     borderRadius: hp('1%'),
//     padding: wp('4%'),
//     justifyContent: 'space-between',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: hp('1%'),
//     right: wp('2%'),
//     zIndex: 1,
//   },
//   imagePreview: {
//     width: wp('80%'),
//     height: hp('20%'),
//     alignSelf: 'center',
//     marginVertical: hp('2%'),
//     borderRadius: hp('1%'),
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: hp('1%'),
//     padding: wp('2%'),
//     fontSize: hp('2%'),
//     height: hp('20%'),
//   },
//   postButton: {
//     backgroundColor: 'darkgreen',
//     height: hp('6%'),
//     width: wp('30%'),
//     borderRadius: hp('1%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//   },
//   postButtonText: {
//     color: 'white',
//     fontSize: hp('2.5%'),
//     fontWeight: '600',
//   },
//   paginationBtn: {
//     paddingHorizontal: wp('4%'),
//     paddingVertical: hp('1%'),
//     backgroundColor: '#007bff',
//     borderRadius: hp('1%'),
//   },
//   disabledBtn: {
//     backgroundColor: '#d3d3d3',
//   },
//   paginationText: {
//     color: '#fff',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: hp('2.5%'),
//   },
// });

import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button, ScrollView } from 'react-native';
import axios from 'axios';
// import { FaHandHoldingHeart } from 'react-icons/fa'; // React Native doesn't support react-icons; you'll need to replace it with a native icon library like 'react-native-vector-icons'.

// import { userAuthStore } from '../store/authStore'; // Assuming your store logic remains the same
import { userAuthStore } from '../store/authStore';
import { API_URL } from '../store/authStore';
import LoadingScreen from '../components/LoadingScreen';

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [like, setLike] = useState(false);
  const { user, isLoading, setLoading } = userAuthStore();
  const limit = 5;

  const handleLike = () => {
    setLike(!like);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Set loading state to true

      try {
        const response = await axios.get(`${API_URL}/community/post?page=${page}&limit=${limit}`);
        setLoading(false);

        const postsData = response.data.post || [];
        setPosts(postsData);
        setTotalPosts(response.data.total);
        const total = Math.ceil(response.data.total / limit);
        setTotalPages(total > 10 ? 10 : total);

        const nextPageResponse = await axios.get(`http://192.168.1.117:7180/community/post?page=${page + 1}&limit=${limit}`);
        setHasNextPage(nextPageResponse.data.post.length > 0);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);

      }
    };
    fetchPosts();
  }, [page]);

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Text style={styles.title}>Community Post</Text>

          {/* Posts Section */}
          <View style={styles.postsContainer}>
            {totalPosts === 0 ? (
              <Text style={styles.noPostsText}>No posts available.</Text>
            ) : (
              posts.map((post) => (
                <View key={post._id} style={styles.post}>
                  {/* Post Header */}
                  <View style={styles.header}>
                    <TouchableOpacity onPress={() => console.log(`/profile/${post.owner._id}`)}>
                      <Image
                        source={{ uri: post.owner.avatar }}
                        style={styles.avatar}
                      />
                    </TouchableOpacity>
                    <View>
                      <TouchableOpacity onPress={() => console.log(`/profile/${post.owner._id}`)}>
                        <Text style={styles.username}>{post.owner.username}</Text>
                      </TouchableOpacity>
                      <Text style={styles.date}>
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}{' '}
                        {new Date(post.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                    </View>
                  </View>

                  {/* Post Content */}
                  <Text style={styles.postTitle}>{post.title}</Text>
                  {post.photo && <Image source={{ uri: post.photo }} style={styles.postImage} />}

                  {/* Post Actions */}
                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={[styles.likeButton, { backgroundColor: like ? '#4CAF50' : '#8BC34A' }]}
                      onPress={handleLike}
                    >
                      <Text style={styles.likeText}>{`❤️: ${post.likes}`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.commentButton}>
                      <Text style={styles.actionText}>Comment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shareButton}>
                      <Text style={styles.actionText}>Share</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>

          {/* Pagination Controls */}
          {totalPosts > 0 && totalPages > 1 && (
            <View style={styles.pagination}>
              <TouchableOpacity
                onPress={() => setPage(page - 1)}
                disabled={page === 1}
                style={[styles.pageButton, page === 1 && styles.disabledButton]}
              >
                <Text style={styles.pageText}>Previous</Text>
              </TouchableOpacity>
              <Text style={styles.pageText}>Page {page} of {totalPages}</Text>
              <TouchableOpacity
                onPress={() => setPage(page + 1)}
                disabled={!hasNextPage}
                style={[styles.pageButton, !hasNextPage && styles.disabledButton]}
              >
                <Text style={styles.pageText}>Next</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Create Post Button */}
          {user && (
            <TouchableOpacity style={styles.createPostButton} onPress={() => console.log(`/post/${user._id}`)}>
              <Text style={styles.createPostText}>+</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    position: 'relative',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  postsContainer: {
    flex: 1,
    marginTop: 15,
  },
  noPostsText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
  },
  post: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  likeText: {
    color: '#fff',
    fontSize: 16,
  },
  commentButton: {
    padding: 10,
  },
  shareButton: {
    padding: 10,
  },
  actionText: {
    color: '#1E90FF',
    fontSize: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  pageButton: {
    padding: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: '#ddd',
  },
  pageText: {
    fontSize: 16,
    color: '#000',
  },
  createPostButton: {
    position: 'absolute',
    bottom: -150,
    right: 0,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 3,
  },
  createPostText: {
    fontSize: 30,
    color: '#fff',
    position: "absolute",


  },
});

export default Community;
