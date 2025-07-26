import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function DropDown({ category }) {
  const defaultItems = [
    { label: 'Birgunj', value: 'Birgunj' },
    { label: 'Chitwan', value: 'Chitwan' },
    { label: 'Kathmandu', value: 'Kathmandu' },
    { label: 'Hetauda', value: 'Hetauda' },
  ];

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(defaultItems);

  useEffect(() => {
    if (category) {
      const categoryItems = category.map((cat) => ({ label: cat, value: cat.toLowerCase() }));
      setItems([...categoryItems, ...defaultItems]);
      setValue(categoryItems[0]?.value || null); // Set the initial value to the first category item
    } else {
      setItems(defaultItems);
      setValue(defaultItems[0]?.value || null); // Set the initial value to the first default item
    }
  }, [category]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        multiple={false} // Set multiple to false to allow only one selection
        mode="BADGE"
        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
        style={styles.dropdown} // Apply custom styles
        dropDownContainerStyle={styles.dropdownContainer} // Apply custom styles to the dropdown container
        textStyle={styles.text} // Apply custom text styles
        iconContainerStyle={styles.iconContainer} // Apply custom styles to the icon container
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: wp('4%'),
  },
  dropdown: {
    width: wp('42%'), // Set the width of the dropdown picker
    height: hp('6%'), // Set the height of the dropdown picker
    borderWidth: 0, // Remove the border
    backgroundColor: 'transparent',
    // paddingRight: wp('2%'), // Adjust padding to reduce gap
  },
  dropdownContainer: {
    width: wp('42%'), // Set the width of the dropdown container
    borderWidth: 0, // Remove the border
  },
  text: {
    fontWeight: '600', // Set font weight to 600
    fontSize: hp('2.5%'),
  },
  iconContainer: {
    backgroundColor: 'gray', // Set background color of the icon to gray
    // marginLeft: -wp('2%'), // Adjust margin to reduce gap
  },
});