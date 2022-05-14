import { View, Text, Button, SafeAreaView, Modal, ActivityIndicator, FlatList, ImageBackground} from 'react-native';
import InlineTextButton from '../components/InlineTextButton';
import AppStyles from '../styles/AppStyles';
import { auth, db } from '../firebase';
import { collection, addDoc, query, where, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";
import { signOut, sendEmailVerification } from 'firebase/auth';
import React from 'react';
import AddToDoModal from '../components/AddToDoModal';
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function ToDo({ navigation }){

    const background = require("../assets/bg2.jpg")

    let [modalVisible, setModalVisible] = React.useState(false);
    let [isLoading, setIsLoading] = React.useState(true);
    let [isRefreshing, setIsRefreshing] = React.useState(false);
    let [toDos, setToDos] = React.useState([]);

    let loadToDoList = async () =>{
        const q = query(collection(db, "todos"), where("userId", "==", auth.currentUser.uid));

        const querySnapshot = await getDocs(q);
        let toDos = [];
        querySnapshot.forEach((doc) => {
            let toDo = doc.data();
            toDo.id = doc.id;
            toDos.push(toDo);
        });
        setToDos(toDos);
        setIsLoading(false);
        setIsRefreshing(false);
    };

    if (isLoading){
        loadToDoList();
    };

    let checkToDoItem = (item, isChecked) => {
        const toDoRef = doc(db, 'todos', item.id);
        setDoc(toDoRef, { completed: isChecked }, { merge: true });
    };

    let deleteToDo = async (toDoId) => {
        await deleteDoc(doc(db, "todos", toDoId));
        let updatedToDos = [...toDos].filter((item) => item.id != toDoId);
        setToDos(updatedToDos);
    };


    let renderToDoItem = ({item}) => {

        const tmpDate = new Date(item.deadline);
        const now = new Date()

        const dateToDisplay = tmpDate.getDate()+'.'+(tmpDate.getMonth()+1)+'.'+tmpDate.getFullYear() +'  ' + tmpDate.getHours() + ':' +tmpDate.getMinutes();
        
        const daysleft = Math.floor((tmpDate.getTime()-now.getTime()) / (1000*60*60*24));
        const hoursleft = Math.floor((tmpDate.getTime()-now.getTime()) / (1000*60*60) - daysleft*24);

        return(
            <View>
            <View style={[AppStyles.rowContainer, AppStyles.rightMargin, AppStyles.leftMargin]}>
                <View style={AppStyles.fillSpace}>
                <BouncyCheckbox
                isChecked={item.complated}
                size={25}
                fillColor="#082b5e"
                unfillColor="#FFFFFF"
                text={item.text}
                iconStyle={{ borderColor: "#082b5e" }}
                onPress={(isChecked) => {checkToDoItem(item, isChecked)}}
                />
                </View>
                
                <InlineTextButton text="Delete" color='#082b5e' onPress={() => deleteToDo(item.id)} />
                
            </View>
            <Text style={AppStyles.deadlineText}>Deadline at:  {dateToDisplay}</Text>
            <Text style={AppStyles.deadlineText}>Days left:  {daysleft}</Text>
            <Text style={AppStyles.deadlineText}>Hours left: {hoursleft}</Text>
            </View>
        )
    };

    let showToDoList = () => {
        return (
          <FlatList
            data={toDos}
            refreshing={isRefreshing}
            onRefresh={() => {
              loadToDoList();
              setIsRefreshing(true);
            }}
            renderItem={renderToDoItem}
            keyExtractor={item => item.id} />
        )
      };

    let showContent = () => {
        return (
        <View >
            {isLoading ? <ActivityIndicator size='large'/> : showToDoList()}
        <Button 
          title='Add ToDo'
          onPress={() => setModalVisible(true)} 
          color='#388e3c'/>
        </View>
        
        );

    };

    let showSendVerificationEmail = () => {
        return (
            <View>
            <Text style={AppStyles.textNotVeryfied}>Please verify your email to use ToDo list</Text>
            <Button 
              title="Send Verification Email" 
              onPress={() => sendEmailVerification(auth.currentUser)} />
            </View>
        );
    };

    let addToDo = async (todo, dateFromModal) => {
        let toDoToSave = {
          text: todo,
          completed: false,
          userId: auth.currentUser.uid,
          deadline: String(dateFromModal),
          
        };
        const docRef = await addDoc(collection(db, "todos"), toDoToSave);
    
        toDoToSave.id = docRef.id;
    
        let updatedToDos = [...toDos];
        updatedToDos.push(toDoToSave);
    
        setToDos(updatedToDos);
      };

    return(
        
        <ImageBackground style={AppStyles.imageContainer2} source={background} >
            <View style={[AppStyles.rowContainer, AppStyles.rightAligned, AppStyles.rightMargin, AppStyles.topMargin, AppStyles.btnManageAcc]}>
                <InlineTextButton text="Manage Account" color='#082b5e' onPress={() => navigation.navigate('ManageAccount')} />

            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}>
            
              <AddToDoModal
              onClose={() => setModalVisible(false)}
              addToDo={addToDo}
              />

            </Modal>

            <Text style={AppStyles.header}>ToDo</Text>
            {auth.currentUser.emailVerified ? showContent() : showSendVerificationEmail()}
        
        </ImageBackground>
        
    )
}