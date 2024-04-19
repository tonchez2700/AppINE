import React, {useEffect, useRef, useState, useContext} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import {Camera} from 'expo-camera';
import {Context as AccountDataContext} from '../context/AccountDataContext';
import * as rootNavigation from "../helpers/rootNavigation";


const PhotoScreen = () => {
    const {state, clearState, takePhoto,getScanID} = useContext(AccountDataContext);
    const [camera, setCamera] = useState(null);
    return (
        state.photo
            ?
            <View style={styles.container}>
                <Image style={{width: '100%', height: '100%', alignSelf: 'center'}}
                       source={{uri: "data:image/jpeg;base64," + state.photo}}/>
                <Text style={{
                    color: 'white',
                    position: 'absolute',
                    alignSelf: 'center',
                    bottom: '20%',
                }}>¿Desea guardar esta imagen o tomar otra?</Text>
                <View style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    width: '80%',
                    bottom: '10%',
                    flexDirection:'row',
                    justifyContent: 'space-between',
                }}>
                    <Button
                        containerStyle={{
                            marginRight: 10,
                        }}
                        buttonStyle={{height: 50, backgroundColor: "gray"}}
                        title={"Cancelar"}
                        onPress={() => clearState()}
                    />
                    <Button
                        containerStyle={{
                            marginRight: 10,
                        }}
                        buttonStyle={{height: 50, backgroundColor: "orange"}}
                        title={"Otra Vez"}
                        onPress={() => getScanID(state.photo)}
                    />
                </View>
            </View>
            :
            <View style={styles.container}>
                <Camera
                    style={styles.camera}
                    ref={(ref) => setCamera(ref)}>
                    <TouchableOpacity style={styles.arrowBotton} onPress={() => console.log(rootNavigation.goBack())}>
                        <Icon
                            name="arrow-back-outline"
                            size={30}
                            type='ionicon'
                            color="white"/>
                    </TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => console.log("pato")}>
                            <Icon
                                name="md-images"
                                size={30}
                                type='ionicon'
                                color="white"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => console.log("pato")}>
                            <Icon
                                size={30}
                                name={'flash-off'}
                                type='ionicon'
                                color={'white'}/>
                        </TouchableOpacity>
                        {/*<TouchableOpacity style={styles.button} onPress={() => console.log("pato")}>*/}
                        {/*    <Icon*/}
                        {/*        size={30}*/}
                        {/*        name={'videocam-off'}*/}
                        {/*        type='MaterialIcons'*/}
                        {/*        color={'white'}/>*/}
                        {/*</TouchableOpacity>*/}
                        <TouchableOpacity style={styles.button} onPress={() => takePhoto(camera)}>
                            <Icon
                                name="camera"
                                size={30}
                                type='ionicon'
                                color="white"/>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
    );
}

export default PhotoScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    },
    arrowBotton: {
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    video: {
        flex: 1,
        alignSelf: "stretch"
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
    },
    button: {
        padding: 10,
    },
});
