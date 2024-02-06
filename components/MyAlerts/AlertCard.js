import { Card,ThemeProvider,Button ,useTheme} from "@rneui/themed";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {NavigationContext} from '@react-navigation/native'
import {useContext} from 'react'


export default function AlertCard({item}) {
  const { theme } = useTheme();

  const navigation = useContext(NavigationContext);

  const togglenav = () => {
    navigation.navigate("CardView",item)
  }

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={togglenav}>
      <Card containerStyle={{shadowColor: theme.colors.grey4,backgroundColor: theme.colors.white}}>
        <Card.Title>
          <Text style={{color: theme.colors.primary}}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        </Card.Title>
        <Card.Divider />
        <Card.FeaturedSubtitle numberOfLines={7} style={{ color: theme.colors.grey1 }}>
          {item.description||'No Hay Descripción'}...
        </Card.FeaturedSubtitle>
      </Card>
    </TouchableOpacity>
  );
}

