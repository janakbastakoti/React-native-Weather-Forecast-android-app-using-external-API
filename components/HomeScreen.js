import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View , ScrollView, componentDidMount, Image , Alert,  AsyncStorage} from 'react-native';
import MyHeader from './MyHeader';

import { TextInput, Card, List, Title } from 'react-native-paper';


export default class HomeScreen extends Component {

  state = {
    info: {
      name: 'loading',
      temp: 'loading',
      humidity: 'loading',
      desc: 'loading',
      icon: 'loading'
    }
  }


  async getWeather() {
    // var city_name = this.props.navigation.getParam('city', 'london')
    var city_name = await AsyncStorage.getItem('s_city');
    if(!city_name){
      var city_name = this.props.navigation.getParam('s_city')
    }


    fetch('http://api.openweathermap.org/data/2.5/weather?q='+ city_name + '&units=metric&APPID=1f2c00fa44f84359e02f355d16f27cc7')
    .then(data=>data.json())
    .then(city_n=>{
      console.log("from here")
      console.log(city_n)
      this.setState({
        info: {
          name: city_n.name,
          temp: city_n.main.temp,
          humidity: city_n.main.humidity,
          desc: city_n.weather[0].description,
          icon: city_n.weather[0].icon
        }
        
      })
      console.log(this.state.info)



    })
    // .catch(err=> {
    //   Alert.alert("Error"+err.message + "please connect to internet",[{text:"ok"}])
    // })
  }

  componentDidMount() {
    this.getWeather()

  }


  render() {
    if(this.props.navigation.getParam('city')){
      this.getWeather()
    }
    return (
      <View style={styles.container}>
        <MyHeader title="current weather" />
        
          <Card style={styles.card}>
            <View style={styles.container1}>
              <Title style={styles.text}>{this.state.info.name}</Title>
              <Image style={styles.img}
                source = {{uri: 'http://openweathermap.org/img/w/' + this.state.info.icon + '.png' }}
              />
              <Title style={styles.text}>Temperatur:{this.state.info.temp} C</Title>
              <Title style={styles.text}>Humidity:{this.state.info.humidity}</Title>
              <Title style={styles.text}>Description:{this.state.info.desc}</Title>
            </View>
          </Card>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
  card: {
    margin: 10,
    backgroundColor: '#D1C9C8',
  },
  img: {
    width: 90,
    height: 90,
  },
  container1: {
    alignItems: 'center',
  }
 
});

 // <Image style={styles.img}
              //   source = {{uri: 'http://openweathermap.org/img/w/' + this.state.info.icon + '.png' }}
              // />
