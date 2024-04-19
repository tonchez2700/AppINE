import React, {useState, useEffect, useContext} from 'react'
import {
    View, ScrollView,
    Text, ActivityIndicator, TextInput,
} from 'react-native';
import {general} from '../theme/customTheme';
import {Button} from 'react-native-elements'
import MaskInput, {Masks} from 'react-native-mask-input';
import {Dropdown} from "react-native-element-dropdown";
import {useNavigation} from '@react-navigation/native';
import {Context as AccountDataContext} from '../context/AccountDataContext';
import tw from 'tailwind-react-native-classnames'
import Card from "../components/Card";

const HomeScreen = () => {

    const navigation = useNavigation();
    const {
        state,
        clearState,
        requestPermissions,
        inputChangeText
    } = useContext(AccountDataContext);

    const gender = [
        {id: 1, name: "Hombre"},
        {id: 2, name: "Mujer"},
        {id: 3, name: "Otros"},
    ]
    const premios = [
        {id: 1, name: "Copones"},
        {id: 2, name: "Lavadora"},
        {id: 3, name: "Carro"},
        {id: 4, name: "Ventilador"},
        {id: 5, name: "$1,000"},
    ]

    const renderContent = () => {
        return (
            <View style={general.container}>
                <Text>Nombre</Text>
                <TextInput
                    style={{borderWidth: 1, borderRadius: 4, padding: 5, borderColor: "orange"}}
                    placeholder={'Pedro'}
                    value={state.data?.name}
                    onChangeText={text => inputChangeText('name', text)}
                    textContentType={'familyName'}
                />
                <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                    <View style={{width: '48%'}}>
                        <Text>Nombre Paterno</Text>
                        <TextInput
                            style={{borderWidth: 1, borderRadius: 4, padding: 5, borderColor: "orange"}}
                            placeholder={'Garza'}
                            value={state.data?.paternal}
                            textContentType={'familyName'}
                            onChangeText={text => inputChangeText('paternal', text)}
                        />
                    </View>
                    <View style={{width: '48%'}}>
                        <Text>Nombre Materno</Text>
                        <TextInput
                            style={{borderWidth: 1, borderRadius: 4, padding: 5, borderColor: "orange"}}
                            placeholder={'Garcia'}
                            value={state.data?.maternal}
                            textContentType={'familyName'}
                            onChangeText={text => inputChangeText('maternal', text)}
                        />
                    </View>
                </View>
                <Text>CURP</Text>
                <TextInput
                    style={{borderWidth: 1, borderRadius: 4, padding: 5, borderColor: "orange"}}
                    placeholder={'SDADS23234234SE'}
                    value={state.data?.CURP}
                    onChangeText={text => inputChangeText('CURP', text)}
                />
                <Text>Clave de elector</Text>
                <TextInput
                    style={{borderWidth: 1, borderRadius: 4, padding: 5, borderColor: "orange"}}
                    placeholder={'SDADS23234234SE'}
                    value={state.data?.clave}
                    onChangeText={text => inputChangeText('clave', text)}
                />
                <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                    <View style={{width: '48%'}}>
                        <Text>ID</Text>
                        <MaskInput
                            mask={Masks.DATE_DDMMYYYY}
                            maxLength={14}
                            style={{borderWidth: 1, borderRadius: 4, padding: 5, borderColor: "orange"}}
                            placeholder={'20/02/1009'}
                            keyboardType={"numeric"}
                            textContentType={'telephoneNumber'}
                            value={state.data?.date}
                            onChangeText={text => inputChangeText('phone', text)}
                        />
                    </View>
                    <View style={{width: '48%'}}>
                        <Text>Género</Text>
                        <Dropdown
                            data={gender}
                            valueField={'id'}
                            search
                            mode={"auto"}
                            labelField={'name'}
                            value={state.data?.gender}
                            onChange={item => {
                                inputChangeText('gender', item)
                            }}
                            style={{borderWidth: 1, borderRadius: 4, padding: 1, paddingLeft: 4, borderColor: "orange"}}
                            placeholder={'Otros'}

                        />
                    </View>
                </View>
                <Text>Premio</Text>
                <Dropdown
                    data={premios}
                    valueField={'id'}
                    search
                    mode={"auto"}
                    labelField={'name'}
                    value={state.data?.premios}
                    onChange={item => {
                        inputChangeText('premios', item)
                    }}
                    style={{borderWidth: 1, borderRadius: 4, padding: 1, paddingLeft: 4, borderColor: "orange"}}
                    placeholder={'Otros'}
                />
                {
                    state.photo
                        ?
                        <Card
                            text={"Anverso"}
                            Imagen={"data:image/jpeg;base64," + state.photo}
                        />
                        :
                        null
                }
                {/*<Card*/}
                {/*    text={"Reverso"}*/}
                {/*    Imagen={Images.logo}*/}
                {/*/>*/}
                <Button
                    containerStyle={{marginTop: 10,}}
                    buttonStyle={{height: 50, backgroundColor: "orange"}}
                    title={"Escanear"}
                    onPress={() => {
                        clearState();
                        requestPermissions();
                    }}
                />
            </View>
        );
    }

    return (
        !state.fetchingData
            ? !state.error
                ? renderContent()
                :
                <View style={tw`flex-1 p-5 justify-center items-center`}>
                    <Text style={tw`text-center text-lg mb-3`}>
                        {state.message}
                    </Text>
                    <Button
                        containerStyle={{width: 120}}
                        buttonStyle={[{backgroundColor: '#118ea6'}]}
                        title="Actualizar"
                        onPress={() => console.log("pepe")}
                    />
                </View>
            : <ActivityIndicator size="large" color="#118EA6" style={tw`mt-5`}/>
    )
}

export default HomeScreen;
