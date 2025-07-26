import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import DropDown from '../components/DropDown';
import Product from './Product';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AddProject from '../components/AddProject';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { API_URL } from '../store/authStore';
import ColdStore from '../components/ColdStore';
import axios from 'axios';

const Market = () => {
  const navigation = useNavigation();
  const [addPoduct, setAddPoduct] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('seed');

  // Fetch categories and products from the API
  useEffect(() => {
    // Fetch categories
    axios.get(`${API_URL}/community/getProduct`)
      .then((response) => {
        if (response.data.success) {
          setCategories(response.data.data.categories);
          setProducts(response.data.data.products);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Filter products based on selected category
  const filteredProducts = products.filter((product) => product.category === selectedCategory);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Market Place</Text>

      <View style={{ height: hp('20%'), width: wp('90%'), margin: 'auto', marginVertical: hp('0.5%') }}>
        <ColdStore />
      </View>

      <View style={{ gap: hp('2%'), marginTop: hp('1.3%'), paddingHorizontal: wp('2.5%') }}>
        <Text style={styles.subTitle}>Categories:</Text>
        <View style={styles.categoriesContainer}>
          <FlatList
            horizontal={true}
            data={categories}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => setSelectedCategory(item.category)}>

                {/* <Text>{item.user}</Text> */}
                {/* { } (item.category === 'Crop'){<Image
                  source={require('../assets/crops.jpg')} // Local image path
                  style={styles.image}
                />} */}
                {item.category === 'crop' && (
                  <Image
                    source={require('../assets/crops.jpg')} // Local image path
                    style={styles.image}
                  />
                )}
                {item.category === 'seed' && (
                  <Image
                    source={require('../assets/seeds.jpg')} // Local image path
                    style={styles.image}
                  />
                )}
                {item.category === 'fertilizer' && (
                  <Image
                    source={require('../assets/fertilizer.jpg')} // Local image path
                    style={styles.image}
                  />
                )}   {item.category === 'tools' && (
                  <Image
                    source={require('../assets/tools.jpeg')} // Local image path
                    style={styles.image}
                  />
                )}
                {item.category === 'machineries' && (
                  <Image
                    source={require('../assets/machineries.jpg')} // Local image path
                    style={styles.image}
                  />
                )}
                {/* You can add a category-specific image here */}
                <Text>{item.category}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      <View style={[styles.selectCity, addPoduct === false ? { zIndex: 1 } : { zIndex: -1 }]}>
        <Text style={[styles.title, { marginTop: hp('1.4%') }]}>{selectedCategory}</Text>
        <View style={styles.city}>
          <EvilIcons name="location" size={hp('3%')} />
          <DropDown />
        </View>
      </View>

      <FlatList
        numColumns={2}
        data={filteredProducts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Product item={item} />}
        contentContainerStyle={{ paddingBottom: hp('12%') }} // Ensure the FlatList takes up the necessary space
      />

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: hp('6%'),
          right: wp('2.5%'),
          zIndex: 1,
        }}
        onPress={() => setAddPoduct(!addPoduct)}>
        <View
          style={{
            backgroundColor: 'darkgreen',
            paddingHorizontal: hp('1.3%'),
            paddingVertical: hp('0.7%'),
            borderRadius: hp('12%'),
          }}>
          <FontAwesome name="plus" size={hp('5%')} color={'white'} />
        </View>
      </TouchableOpacity>

      {addPoduct && (
        <View style={{ position: 'absolute', right: wp('4%'), bottom: hp('20%') }}>
          <TouchableOpacity
            onPress={() => setAddPoduct(false)}
            style={{
              position: 'relative',
              alignSelf: 'flex-end',
              top: hp('5%'),
              zIndex: 1,
              right: wp('5%'),
            }}>
            <FontAwesome name="close" size={hp('4%')} color={'red'} />
          </TouchableOpacity>
          <AddProject />
        </View>
      )}
    </View>
  );
};

export default Market;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: hp('3%'),
    fontWeight: '700',
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: hp('2.5%'),
  },
  itemContainer: {
    alignItems: 'center',
    marginHorizontal: wp('2.5%'),
  },
  subTitle: {
    fontSize: hp('2.5%'),
    fontWeight: '800',
    opacity: 0.7,
  },
  selectCity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1.5%'),
    marginHorizontal: wp('3.5%'),
  },
  city: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('45%'),
    zIndex: 0,
  }, image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});



// import {
//   Button,
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import DropDown from '../components/DropDown';
// import Product from './Product';
// import {crops} from '../Data/crops';
// import {seedProducts} from '../Data/seeds';
// import {fruits} from '../Data/fruits';
// import {tools} from '../Data/tools';
// import {fertilizers} from '../Data/fertilizer';
// import {machines} from '../Data/machine';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import AddProject from '../components/AddProject';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import ColdStore from '../components/ColdStore';

// const Market = () => {
//   const navigation = useNavigation();
//   const [addPoduct, setAddPoduct] = useState(false);

//   let categoriess = [
//     {
//       name: 'Crop',
//       img: require('../assets/crops.jpg'),
//     },
//     {
//       name: 'Fruit',
//       img: require('../assets/fruits.jpg'),
//     },
//     {
//       name: 'Seeds',
//       img: require('../assets/seeds.jpg'),
//     },
//     {
//       name: 'Fertilizer',
//       img: require('../assets/fertilizer.jpg'),
//     },
//     {
//       name: 'Tools',
//       img: require('../assets/tools.webp'),
//     },
//     {
//       name: 'Machine',
//       img: require('../assets/machine.jpg'),
//     },
//   ];
//   const [categories, setcategories] = useState(categoriess);
//   const [change, setChange] = useState('Crop');

//   const getData = () => {
//     switch (change) {
//       case 'Crop':
//         return crops;
//       case 'Fruit':
//         return fruits;
//       case 'Seeds':
//         return seedProducts;
//       case 'Fertilizer':
//         return fertilizers;
//       case 'Tools':
//         return tools;
//       case 'Machine':
//         return machines;
//       default:
//         return [];
//     }
//   };

//   return (
//     <View style={{flex: 1}}>
//       <Text style={styles.title}>Market Place</Text>

//       <View
//         style={{
//           height: hp('20%'),
//           width: wp('90%'),
//           margin: 'auto',
//           marginVertical: hp('0.5%'),
//         }}>
//         <ColdStore />
//       </View>

//       <View
//         style={{
//           gap: hp('2%'),
//           marginTop: hp('1.3%'),
//           paddingHorizontal: wp('2.5%'),
//         }}>
//         <Text style={styles.subTitle}>Categories:</Text>
//         <View style={styles.categoriesContainer}>
//           <FlatList
//             horizontal={true}
//             data={categories}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({item}) => (
//               <TouchableOpacity
//                 style={styles.itemContainer}
//                 onPress={() => setChange(item.name)}>
//                 <Image source={item.img} style={styles.image} />
//                 <Text>{item.name}</Text>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//       </View>

//       <View
//         style={[
//           styles.selectCity,
//           addPoduct === false ? {zIndex: 1} : {zIndex: -1},
//         ]}>
//         <Text style={[styles.title, {marginTop: hp('1.4%')}]}>{change}</Text>
//         <View style={styles.city}>
//           <EvilIcons name="location" size={hp('3%')} />
//           <DropDown />
//         </View>
//       </View>

//       <FlatList
//         numColumns={2}
//         data={getData()}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({item}) => <Product item={item} />}
//         contentContainerStyle={{paddingBottom: hp('12%')}} // Ensure the FlatList takes up the necessary space
//       />
//       <TouchableOpacity
//         style={{
//           position: 'absolute',
//           bottom: hp('6%'),
//           right: wp('2.5%'),
//           zIndex: 1,
//         }}
//         onPress={() => setAddPoduct(!addPoduct)}>
//         <View
//           style={{
//             backgroundColor: 'darkgreen',
//             paddingHorizontal: hp('1.3%'),
//             paddingVertical: hp('0.7%'),
//             borderRadius: hp('12%'),
//           }}>
//           <FontAwesome name="plus" size={hp('5%')} color={'white'} />
//         </View>
//       </TouchableOpacity>

//       {addPoduct && (
//         <View
//           style={{position: 'absolute', right: wp('4%'), bottom: hp('20%')}}>
//           <TouchableOpacity
//             onPress={() => setAddPoduct(false)}
//             style={{
//               position: 'relative',
//               alignSelf: 'flex-end',
//               top: hp('5%'),
//               zIndex: 1,
//               right: wp('5%'),
//             }}>
//             <FontAwesome name="close" size={hp('4%')} color={'red'} />
//           </TouchableOpacity>
//           <AddProject />
//         </View>
//       )}
//     </View>
//   );
// };

// export default Market;

// const styles = StyleSheet.create({
//   title: {
//     textAlign: 'center',
//     fontSize: hp('3%'),
//     fontWeight: '700',
//   },
//   image: {
//     width: wp('12.5%'),
//     height: wp('12.5%'),
//     marginBottom: hp('1.25%'),
//     borderRadius: wp('6.25%'), // Set border radius to 50% of width and height
//     elevation: 4,
//   },
//   categoriesContainer: {
//     flexDirection: 'row',
//     marginBottom: hp('2.5%'),
//   },
//   itemContainer: {
//     alignItems: 'center',
//     marginHorizontal: wp('2.5%'),
//   },
//   subTitle: {
//     fontSize: hp('2.5%'),
//     fontWeight: '800',
//     opacity: 0.7,
//   },
//   selectCity: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     // padding: wp('2.5%'),
//     marginBottom: hp('1.5%'),
//     marginHorizontal: wp('3.5%'),
//   },
//   city: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: wp('45%'),
//     zIndex: 0,
//   },
// });
