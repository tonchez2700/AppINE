import React, { useContext } from 'react'
import { TouchableOpacity, StatusBar, Text } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import Logo from './Logo';
import Images from '@assets/images';

const NavBar = (navigation) => {
    const { signout } = useContext(AuthContext);

    const open = () => {
        navigation.navigation.openDrawer();
    }

    return (
        <Header
            backgroundColor="orange"
            barStyle="default"
            containerStyle={{ height: 93 }}
            leftContainerStyle={{ justifyContent: 'center' }}
            rightContainerStyle={{ justifyContent: 'center' }}
            rightComponent={
                <TouchableOpacity
                    onPress={() => open()}
                    style={{ position: 'absolute' }}>
                    <Icon
                        name='bars'
                        size={25}
                        type='font-awesome'
                        color='white' />
                </TouchableOpacity>
            }
        />

    )
}

export default NavBar
