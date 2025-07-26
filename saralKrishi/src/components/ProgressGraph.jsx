import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ProgressGraph = ({ fill, label }) => {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={55}
        width={7} // Increased border width
        fill={fill}
        tintColor="#162D5B"
        backgroundColor="gray"
      >
        {(fill) => (
          <Text style={styles.percentageText}>
            {`${fill.toFixed(0)}%`}
          </Text>
        )}
      </AnimatedCircularProgress>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default ProgressGraph;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius:20,
    // backgroundColor:'pink'
  },
  percentageText: {
    fontSize: hp('2%'),
    color: 'black',
    textAlign:'center',
    textAlignVertical:'center',
  },
  label: {
    // marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
});