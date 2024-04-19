import React, {useContext} from 'react'
import {View, Text, Image, StyleSheet} from 'react-native';
import Images from '@assets/images';

const Card = ({text, Imagen}) => {
    return (
        <>
            <Text>{text}</Text>
            <View style={styles.container}>
                <Image
                    style={styles.card}
                    resizeMode={'cover'}
                    source={{uri: Imagen}}/>
            </View>
        </>

    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        borderWidth: 3,
        borderRadius: 4,
        padding: 5,
        borderColor: "orange"
    },
    card: {
        alignSelf: 'center',
        width: '100%',
        height: 200
    }

})
