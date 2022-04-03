import React from "react";
import {  StyleSheet, Text, View,FlatList,SafeAreaView } from "react-native";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from 'react';


export const Advice = () => {

    const [dados,setdados] = useState();

      const { isLoading, error, data, isFetching } = useQuery( "advice", () =>
        axios.get('https://api.adviceslip.com/advice').then((res) =>
         setdados(res.data)
         )
    );

    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>An error has occurred: {error.message}</Text>;

    const DATA = [
    {
      id: '1',
      advice : dados
    },
    ];

const Item = ({ advice}) => (
  <View style={styles.text}>
    <Text>Advice: {advice.slip.advice}</Text>
    <Text>{isFetching ? "Updating..." : ""}</Text>
  </View>
);

    const renderItem = ({ item }) => (
    <Item
     advice={item.advice}
      />
  );

  return (
    <SafeAreaView>
          <View>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
          </View>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
  },
});