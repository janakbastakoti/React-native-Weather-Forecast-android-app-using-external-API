import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View , ScrollView,  AsyncStorage } from 'react-native';

import MyHeader from './MyHeader'
import { TextInput, Card, List, Button } from 'react-native-paper';

export default class SearchScreen extends Component {
  state = {
    text: '',
    cities:[]
  };
  async buttonClick() {
    console.log("clicked")
    this.props.navigation.navigate('current city',{city:this.state.text})
    await AsyncStorage.setItem("s_city",this.state.text)
  }


  async listclicked(name) {
    this.setState({text: name})
    await AsyncStorage.setItem("s_city",this.state.text)
    this.props.navigation.navigate('current city',{city:this.state.text})

  }



  fetchCities(text){
    this.setState({ text })
    // fetch('http://autocomplete.wunderground.com/aq?query=${text}')
    fetch('http://autocomplete.wunderground.com/aq?query='+ text)
    .then((data)=>data.json())
    .then((city)=>{
      this.setState({
        cities:city.RESULTS.slice(0,9)
      })
      
    })
    console.log(this.state.cities)

  }





  render() {
    var renderCity=<Card style={styles.card}><List.Item title="First Item"/></Card>
    if(this.state.cities.length>0){
        var renderCity=this.state.cities.map(city=>{
          return(
              <Card key={city.lat} style={styles.card} onPress={()=> this.listclicked(city.name)}>
                <List.Item title={city.name} />
              </Card>
            )
        })
    }
    return (
      <View style={styles.container}>
        <MyHeader title="select city"
         />
        <TextInput
        label='City name'
        value={this.state.text}
        onChangeText={text => this.fetchCities(text)}
      />
      <Button icon="camera" mode="contained" onPress={() => this.buttonClick()}>
        Save changes
      </Button>
      <ScrollView>
      { renderCity }
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin:5,
    backgroundColor: '#D1C9C8',
  }
 
});
