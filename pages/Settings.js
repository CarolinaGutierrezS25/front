import { View,StyleSheet } from 'react-native';
import UserView from '../components/Settings/UserView'
import {Divider} from '@rneui/themed'
import SettingsList from '../components/Settings/SettingsList'
import {useTheme} from '@rneui/themed'
import { useEffect,useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings() {
    const { theme } = useTheme();
    const [mail, setMail] = useState(''); 
    
    useEffect(() => {
        async function getMail(){
            const mail = await AsyncStorage.getItem('mail');
            setMail(mail?.replace(/['"]+/g, ''));
        }
        getMail();
    }, [])

    const user = {
        name: 'usuario',
        mail: mail,
        image: "https://randomuser.me/api/portraits/men/36.jpg"
    }
    return(
        <View style={[styles.mainView,{backgroundColor: theme.colors.background}]}>
            <UserView user={user.name} image={user.image} mail={user.mail}/>
            <SettingsList></SettingsList>
        </View>
    )
};

const styles = StyleSheet.create({
    mainView:{
        flex:1,
    }
})
