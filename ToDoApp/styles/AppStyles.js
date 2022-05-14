import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    imageContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    imageContainer2: {
        flex: 1
    },
    ToDoItems: {
        backgroundColor: 'white'
    },
    container :{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      backgroundColor: 'powderblue'
    },
    noPadding:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      backgroundColor: 'powderblue',
      paddingVertical: 16
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        marginVertical: 4
    },
    fillSpace: {
        flex: 1
    },
    rightAligned: {
        justifyContent: "flex-end",
    },
    topMargin: {
        marginTop: 16
    },
    bottomMargin: {
        marginBottom: 16
    },
    rightMargin: {
        marginRight: 16
    },
    leftMargin: {
        marginLeft: 16
    },
    backgroundCover:{
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        padding: 16,
        opacity: 0.7
    },
    lightText:{
        color: '#fff'
    },
    errorText: {
        color: '#ff0000'
    },
    header: {
        fontSize: 20,
        alignSelf: 'center'
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 8,
        borderBottomWidth: 2,
        marginVertical: 8,
        borderWidth: 2,
    },
    textNotVeryfied:{
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: 'red',
        marginTop: 18,
        marginBottom: 18
    },
    lightTextInput: {
        borderBottomColor: '#ffffff'
    },
    darkTextInput: {
        borderBottomColor: '#000000'
    },
    inlineTextButton: {
        color: '#87F1FF',
        fontSize: 20
    },
    pressedInlineTextButton: {
        color: '#87F1FF',
        opacity: 0.6
    },
    btnManageAcc: {
        marginTop: 48
    },
    datePickerText: {
        alignSelf: 'center',
        fontSize: 20,
        marginTop: 20,
        color: 'green'
    },
    deadlineText: {
        alignSelf: 'center',
        color: '#B22222',
        fontSize: 17
    }
  });