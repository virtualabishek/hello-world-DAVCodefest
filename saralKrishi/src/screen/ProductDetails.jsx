import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const ProductDetails = () => {
  const item = useRoute().params.item;
  const [quantity, setQuantity] = useState(1); // State to manage quantity
  const [totalPrice, setTotalPrice] = useState(item.price); // State to calculate total price

  // Handle quantity change
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      setTotalPrice(item.price * newQuantity); // Recalculate total price
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        setTotalPrice(item.price * newQuantity); // Recalculate total price
        return newQuantity;
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.img} />
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.title}>{item.productName}</Text>
          <Text>{item.category}</Text>
        </View>

        <View>
          <Text style={styles.title}>Rs {item.price}</Text>
          <Text>{item.productLocation}</Text>
        </View>
      </View>

      <View style={{ alignSelf: 'flex-start', marginLeft: hp('4%'), marginTop: hp('2%') }}>
        <Text style={styles.title}>Order</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: hp('1.2%') }}>
        <View>
          <Text style={styles.orderTxt}>Quantity</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.btnGreen} onPress={decreaseQuantity}>
              <Text style={styles.signSymbol}>-</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 25, fontWeight: '600' }}>{quantity}</Text>
            <TouchableOpacity style={styles.btnGreen} onPress={increaseQuantity}>
              <Text style={styles.signSymbol}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.orderTxt}>Choose payment method</Text>
          <View style={styles.paymentContainer}>
            <TouchableOpacity style={styles.payment}>
              <Image source={require('../assets/esewabg.png')} style={styles.paymentImg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.payment}>
              <Image source={require('../assets/Khalti.png')} style={styles.paymentImg} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Total Price */}
      <View style={{ marginTop: hp('2%'), alignSelf: 'center' }}>
        <Text style={styles.title}>Total Price: Rs {totalPrice}</Text>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  img: {
    height: hp('30%'),
    width: wp('100%'),
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: hp('3%'),
    marginVertical: 10,
  },
  detailsContainer: {
    width: wp('90%'),
    height: hp('15%'),
    backgroundColor: 'white',
    borderRadius: hp('4%'),
    padding: 10,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: wp('25%'),
    height: hp('7%'),
    backgroundColor: 'white',
    borderRadius: hp('2%'),
    padding: 10,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp('1.5%'),
    alignSelf: 'start',
  },
  signSymbol: {
    color: 'white',
    fontSize: hp('2%'),
    fontWeight: '700',
    backgroundColor: 'green',
    borderRadius: hp('2%'),
    width: wp('5%'),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  btnGreen: {
    backgroundColor: 'green',
    borderRadius: hp('2%'),
    width: wp('8%'),
    height: hp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentImg: {
    height: hp('7%'),
    width: wp('18%'),
    resizeMode: 'contain',
    borderRadius: hp('2%'),
    elevation: 5,
  },

  paymentContainer: {
    width: wp('60%'),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  orderTxt: {
    marginVertical: hp('1%'),
    textAlign: 'center',
  },
});
