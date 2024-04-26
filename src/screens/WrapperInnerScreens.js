import React, { useContext } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { navigationRef } from '../helpers/rootNavigation';
import { Provider as AccountDataProvider } from '../context/AccountDataContext';
import { Context as AuthContext } from '../context/AuthContext';
import HomeScreen from './HomeScreen';
import tw from 'tailwind-react-native-classnames';
import PhotoScreen from "./PhotoScreen";
import Images from '../components/assets/images';
import NavBar from '../components/NavBar'
import SimpleNavBar from '../components/SimpleNavBar'
import { useNavigation } from '@react-navigation/native';


const Drawer = createDrawerNavigator();

const WrapperInnerScreens = () => {
const navigation = useNavigation();

    const { state, signout } = useContext(AuthContext);

    const CustomDrawerContent = (props) => {
        return (
            <View style={[tw`flex-1`, { backgroundColor: '#ECECEC' }]}>
                <DrawerContentScrollView {...props}
                    style={{ paddingVertical: 0, marginTop: -5, backgroundColor: '#ECECEC' }}>
                    <DrawerItem
                        label="Inicio"
                        onPress={() => props.navigation.navigate('Inicio')}
                    />
                    <DrawerItem
                        label="Salir"
                        onPress={() => {
                            signout()
                            props.navigation.closeDrawer()
                        }}
                    />
                </DrawerContentScrollView>
            </View>
        )
    }

    return (
        <SafeAreaView style={[tw`flex-1 `, { backgroundColor: '#FFFFFF' }]}>
            <AccountDataProvider>
                <Drawer.Navigator
                    screenOptions={{
                        drawerActiveBackgroundColor: '#005691',
                        drawerInactiveBackgroundColor: '#FFFFFF',
                        drawerActiveTintColor: '#FFFFFF',
                        drawerInactiveTintColor: '#23233C',
                        header: (...props) => (

                            <NavBar navigation={props[0].navigation} />
                        )
                    }}
                    drawerContent={(props) => <CustomDrawerContent {...props} />}
                    initialRouteName={`${state.route}`}
                    useLegacyImplementation>
                    <Drawer.Screen name="Inicio" component={HomeScreen} />
                    <Drawer.Screen name="PhotoScreen" component={PhotoScreen} />
                </Drawer.Navigator>
            </AccountDataProvider>
        </SafeAreaView>
    )
}

export default WrapperInnerScreens

const styles = StyleSheet.create({
    card_content: {
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 20,
        shadowColor: 'black',
    },
    content_text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})
