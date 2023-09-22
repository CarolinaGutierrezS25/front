import { View,Text,StyleSheet} from 'react-native'
import {Icon,useTheme} from '@rneui/themed'

export default function UserView({user, mail, image}) {
    const {theme} = useTheme();
    return(
        <>
    <View style={styles.mainView}>
        <View>
        <Icon name="account-circle" size={70} color={theme.colors.primary}/>
        </View>
        <View style={styles.textView}>
            <Text style={[styles.user,{color: theme.colors.black}]}>
                {user}
            </Text>
            <Text style={[styles.mail,{color: theme.colors.grey2}]}>
                {mail}
            </Text>
        </View>
    </View>
    </>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        padding: 15,

    },
    textView: {
        justifyContent: 'center',
        paddingLeft: 10
    },
    editBtn:{
        margin:15,
        marginTop: 0,
        width: 70,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    user: {
        fontWeight:'600',
        fontSize:18
    },
    mail:{
        fontSize: 14,
        color:'gray'
    }
})