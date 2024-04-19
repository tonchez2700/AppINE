import React, { useContext, useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const AnimetedText = ({ data }) => {


    const FadeInView = (props) => {
        const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

        useEffect(() => {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 1000,
                }
            ).start();
        }, [fadeAnim])

        return (
            <Animated.View                 // Special animatable View
                style={{
                    ...props.style,
                    opacity: fadeAnim,         // Bind opacity to animated value
                }}
            >
                {props.children}
            </Animated.View>
        );
    }
    const navigation = useNavigation();
    return (

        <View>
            <FadeInView >
                <Text style={styles.Atext}>Seleccione un método de pago para continuar</Text>
            </FadeInView>
        </View>
    )
}

export default AnimetedText

const styles = StyleSheet.create({

    Atext: {
        backgroundColor: '#F6DA7B',
        color: '#8B793B',
        textAlign: 'center',
        width: '100%',
        borderRadius: 5,
        padding: 5,
        paddingLeft: 19,
        fontSize: 10

    },
})
