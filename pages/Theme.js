import { View, StyleSheet } from "react-native";
import {ListItem,Icon,Divider,useTheme,useThemeMode,Switch} from '@rneui/themed';
import {useState,useEffect} from 'react'
export default function Theme() {
  const {theme} = useTheme();
  const {mode,setMode} = useThemeMode();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    mode == 'light'? setChecked(false):setChecked(true)
  }, [])
  
  const toggleChange = () =>{
    setChecked(!checked)
    checked? setMode('light'):setMode('dark');
  }
  return (
    <View style={[styles.mainView,{backgroundColor: theme.colors.background}]}>
      <ListItem containerStyle={{ paddingLeft: 15, backgroundColor: theme.colors.white }} >
        <Icon name={mode!='light'? 'sun':'moon'} type="feather" size={20} iconStyle={{ padding: 5, borderRadius: 5 ,backgroundColor: theme.colors.primary}} color="white"/>
        <ListItem.Content>
          <ListItem.Title>{mode=='light'? 'Dark mode':'Light mode'}</ListItem.Title>
        </ListItem.Content>
        <Switch value={checked}
          onValueChange={toggleChange}
        ></Switch>
      </ListItem>
      <Divider width ={1} color={theme.colors.background}/>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingTop: 30
  },
});
