import {Alert} from "react-native";
import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import httpClient from "../services/httpClient";
import {encode} from "js-base64";
import {Camera} from 'expo-camera';
import * as rootNavigation from "../helpers/rootNavigation";

const initialState = {
    error: false,
    message: null,
    isVisible: false,
    data: {
        name: '',
        paternal: '',
        maternal: '',
        CURP: '',
        clave: '',
        date: '',
        gender: null,
        premios: null,
    },
    photo: null,
};

const AccountDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CLEAR_STATE":
            return {
                ...initialState,
            };
        case "FETCHING_DATA":
            return {...state, fetchingData: action.payload.fetchingData};
        case "SET_REQUEST_ERROR":
            return {
                ...state,
                error: true,
                message: action.payload.message,
                fetchingData: false,
            };
        case "INPUT_CHANGE_TEXT":
            return {
                ...state,
                error: false,
                message: "",
                data: {
                    ...state.data,
                    [action.payload.type]: action.payload.value
                }
            };
        case "SCANNER_SUCCES":
            return {
                ...state,
                error: false,
                message: "",
                data: action.payload.data,
                photo: action.payload.photo,
            };
        case "TAKE_PICTURE":
            return {
                ...state,
                error: false,
                message: "",
                photo: action.payload.base64,
            };
        default:
            return state;
    }
};

const clearState = (dispatch) => {
    return () => {
        dispatch({type: "CLEAR_STATE"});
    };
};

const inputChangeText = (dispatch) => {
    return async (type, value) => {
        dispatch({
            type: "INPUT_CHANGE_TEXT",
            payload: {type, value},
        });
    };
};

const getScanID = (dispatch) => {
    return async (photo) => {
        try {
            const inputBody = {
                returnFullDocumentImage: true,
                returnFaceImage: false,
                returnSignatureImage: false,
                allowBlurFilter: false,
                allowUnparsedMrzResults: false,
                allowUnverifiedMrzResults: true,
                validateResultCharacters: true,
                anonymizationMode: "FULL_RESULT",
                anonymizeImage: true,
                ageLimit: 0,
                imageSource: "data:image/jpeg;base64," + photo,
                scanCroppedDocumentImage: false
            };

            const apiKey = 'b0202c6f22224ba2a8a42da7a8cfd15b';
            const apiSecret = 'f1039e74-5275-4cef-be86-6ac834baf14f';
            const response = await httpClient.post(`v1/recognizers/blinkid`, inputBody, {
                Authorization: 'Bearer ' + "YjAyMDJjNmYyMjIyNGJhMmE4YTQyZGE3YThjZmQxNWI6ZjEwMzllNzQtNTI3NS00Y2VmLWJlODYtNmFjODM0YmFmMTRm",
            });
            if (!response.ok) {
                const data = {
                    name: response.result.fullName || "",
                    paternal: response.result.fathersName || "",
                    maternal: response.result.mothersName || "",
                    CURP: response.result.personalIdNumber || "",
                    clave: response.result.documentAdditionalNumber || "",
                    date: response.result.dateOfBirth ? `${response.result.dateOfBirth.day}0${response.result.dateOfBirth.month}${response.result.dateOfBirth.year}` : "",
                    gender: null, // Puedes establecer un valor predeterminado o manejarlo según el caso
                    premios: null,
                }
                const photo = response.result.fullDocumentImageBase64;
                dispatch({
                    type: "SCANNER_SUCCES",
                    payload: {data,photo} || "",
                });
                rootNavigation.navigate("Inicio")
            }
        } catch (error) {
            console.log(error)
        }
    }
}


const requestPermissions = (dispatch) => {
    return async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
        if (cameraPermission.status !== 'granted' || microphonePermission.status !== 'granted') {
            Alert.alert(
                'Permisos requeridos',
                'Necesitas permitir el acceso a la cámara y al micrófono para poder utilizar esta función.',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    },
                    {
                        text: 'Ir a Configuración',
                        onPress: () => Platform.OS === 'ios' ? Linking.openURL('app-settings:') : Linking.openSettings(),
                    },
                ],
            );
        } else {
            rootNavigation.navigate('PhotoScreen')
        }

    }
};

const takePhoto = (dispatch) => {
    return async (ref) => {
        try {
            let options = {
                quality: 0.5,
                base64: true,
                exif: false
            };
            const {uri,base64} = await ref.takePictureAsync(options);
            dispatch({
                type: "TAKE_PICTURE",
                payload: {base64},
            });
        } catch (error) {
            console.error('Error al tomar la foto:', error);
        }
    };
};

export const {Context, Provider} = createDataContext(
    AccountDataReducer,
    {
        clearState,
        getScanID,
        takePhoto,
        inputChangeText,
        requestPermissions
    },
    initialState
);
