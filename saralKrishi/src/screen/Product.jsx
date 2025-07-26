import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Product = ({ item }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('ProductDetails', { item })}
        >
            <Image source={{ uri: item.image }} style={styles.img} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.productName}</Text>
                <Text style={styles.category} numberOfLines={1} ellipsizeMode='tail'>{item.category}</Text>
                <Text style={styles.price}>NPR {item.price}</Text>
            </View>

            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('ProductDetails', { item })}
            >
                <Text style={styles.btnText}>Buy Now</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default Product;

const styles = StyleSheet.create({
    container: {
        height: "auto",
        width: wp('45%'),
        marginHorizontal: wp('2.5%'),
        marginVertical: hp('1.5%'),
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 15,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        overflow: 'hidden',
    },
    img: {
        height: hp('15%'),
        width: wp('40%'),
        borderRadius: 10,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    category: {
        fontSize: 14,
        color: '#888',
        marginBottom: 5,
        textAlign: 'center',
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: '#e94e77',
    },
    btn: {
        backgroundColor: '#e94e77',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    btnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    }
});
