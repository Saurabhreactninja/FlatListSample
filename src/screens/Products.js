import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import ProductItem from '../components/ProductItem';
import products from '../utils/products.json';
import colors from '../theme/colors';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Products = () => {
  //useState hook
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    console.log('I am in use effect');
    setData(products.arrayOfProducts.slice(offset, offset + 10));
    setOffset(offset + 10);
  }, []);

  // Note i have added wait for 2 second since we are getting data from local json instead of rest api
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setOffset(0);
    setData([]);
    wait(2000).then(() => {
      setRefreshing(false);
      setData(products.arrayOfProducts.slice(offset, offset + 10));
      setOffset(offset + 10);
    });
  }, []);

  const renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!loading) {
      return null;
    }
    return <ActivityIndicator style={styles.activityIndicator} />;
  };

  // Use to fetch 10 more products once threshold rechead
  const fetchMoreData = () => {
    console.log(offset);
    if (offset <= 40) {
      setLoading(true);
      setOffset(offset + 10);
      setData([
        ...data,
        ...products.arrayOfProducts.slice(offset, offset + 10),
      ]);
      setLoading(false);
    }
  };

  // Render flatlist item
  const renderItem = ({item}) => <ProductItem item={item} />;

  // Product List JSX
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={renderFooter}
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0}
      />
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  activityIndicator: {
    color: colors.white,
  },
});

export default Products;
