import { StyleSheet } from 'react-native';

export const general = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20
    },
    Tittle: {
        marginTop: 30,
        fontSize: 29,
        color: '#6C6767',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textCardQuiz: {

        fontSize: 14,
        color: '#6C6767',
        lineHeight: 14,
        textAlign: 'left',
        fontWeight: '700',
    },
    textCountCuestions: {
        fontSize: 12,
        lineHeight: 12,
        textAlign: 'left',
        fontWeight: '500',
    },
    CardIconQuiz: {

        backgroundColor: '#012B54',
        height: 39,
        width: 37,
        justifyContent: 'center',
        borderRadius: 4

    },
    CardQuiz: {
        borderWidth: 1,
        borderColor: '#B7B7B7',
        padding: 5,
        flexDirection: 'row',
        width: '100%'

    },
})

export const QuestionStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 15,
        
        //justifyContent: "center",
        alignItems: "center",
        //alignContent: "center"
    },
    CardQuestHelp: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#B7B7B7',
        borderRadius: 5,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    ButtonQuestHelp: {
        backgroundColor: "#012B54",
        flex: 1,
        borderBottomRightRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 4
    },
    ButtonGruopQuest: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#B7B7B7',
        backgroundColor: 'white',
    },

})