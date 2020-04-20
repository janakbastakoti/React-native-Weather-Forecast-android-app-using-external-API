import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';


 const MyHeader = (props) =>{
    return (
      <View >
        <Appbar.Header>
        <Appbar.Content
          title="Weather App"
          subtitle={props.title}
          style={{ alignItems: 'center'}}
        />
      </Appbar.Header>
      </View>
    );
}

export default MyHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
