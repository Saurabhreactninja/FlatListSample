import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Image from './Image';

import colors from '../theme/colors';
import matrics from '../theme/metrics';

const ProductItem = item => {
  // Item JSX
  return (
    <View style={styles.card_view}>
      <Image imgUrl={item.item.imgUrl} />
      <View style={{flexShrink: 1}}>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
          {item.item.name}
        </Text>
        <Text style={styles.price}>{item.item.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card_view: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    margin: 10,
    borderRadius: 5,
    shadowRadius: 5,
  },
  name: {
    fontSize: matrics.medium,
    padding: 10,
    marginRight: 10,
  },
  price: {
    fontSize: matrics.small,
    padding: 10,
  },
});

export default ProductItem;
