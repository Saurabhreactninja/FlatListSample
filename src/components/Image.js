import React, {useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';

// Image Component
function Image(path) {
  const [loader, setLoader] = useState(true);

  return (
    <FastImage
      style={styles.image}
      source={{
        uri: path.imgUrl,
        priority: FastImage.priority.high,
        cache: FastImage.cacheControl.immutable,
      }}
      onLoadStart={() => {
        setLoader(true);
      }}
      onLoadEnd={() => {
        setLoader(false);
      }}
      resizeMode={FastImage.resizeMode.co}>
      <View style={styles.indicator}>
        <ActivityIndicator animating={loader} size="large" color="#6D6472" />
      </View>
    </FastImage>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 120,
    resizeMode: 'cover',
    position: 'relative',
    margin: 10,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default Image;
