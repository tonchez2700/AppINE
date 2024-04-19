import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Context as AccountDataContext } from '../../context/AccountDataContext';
import tw from 'tailwind-react-native-classnames'
import { Icon, Button } from 'react-native-elements'


const { width } = Dimensions.get("window");
const ModalAlert = ({ messages }) => {

    const navigation = useNavigation();

    const { state,
        clearState,
        isVisibleModal,
    } = useContext(AccountDataContext);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            clearState()
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.body}>
            <Modal
                visible={state.isVisible}
                hardwareAccelerated
                animationType="slide"
                transparent
                presentationStyle="overFullScreen"
                onRequestClose={() =>
                    isVisibleModal()
                }>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <Text style={styles.text}>{messages.name}</Text>
                        <Text style={styles.textbody}>{messages.description}.</Text>
                        <View >
                            <Button
                                onPress={() => {
                                    isVisibleModal()
                                }}
                                titleStyle={{ fontSize: 17 }}
                                title={'Aceptar'}
                                buttonStyle={{ backgroundColor: '#004480', borderRadius: 9, width: '100%' }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ModalAlert

const styles = StyleSheet.create({

    text: {
        color: '#000000',
        fontWeight: 'bold',
        fontWeight: '700',
        textAlign: 'left',
        fontSize: 20,
    },
    textbody: {
        color: 'black',
        textAlign: 'left',
        fontWeight: '400',
        fontSize: 16,
    },
    body: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },

    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        padding: 10,
        justifyContent: "space-between",
        position: "absolute",
        top: "40%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) },
        { translateY: -90 }],
        height: 200,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
})