import { View, Text, TextInput, Button } from 'react-native';
import React, {useState} from 'react';
import AppStyles from '../styles/AppStyles';
import DateTimePicker from '@react-native-community/datetimepicker'

export default function AddToDoModal(props) {
  let [todo, setTodo] = React.useState("");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Select the Deadline for the ToDo');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = 'Date: ' + tempDate.getDate() + '.' + (tempDate.getMonth() + 1) + '.' + tempDate.getFullYear();
    let fTime = 'Time: ' + tempDate.getHours() + ' Hours ' + tempDate.getMinutes() + ' Minutes';
    setText(fDate+ '\r' + fTime);

  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode)

  }

  // const dateToExport = date.getDate()+'.'+(date.getMonth()+1)+'.'+date.getFullYear() +'  ' + date.getHours() + ':' +date.getMinutes();

  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.header}>Add ToDo</Text>
      <TextInput 
          style={[AppStyles.textInput, AppStyles.darkTextInput]} 
          placeholder='ToDo'
          placeholderTextColor = "black"
          value={todo}
          onChangeText={setTodo} />

    <View>
      <Text style={{alignSelf: 'center', fontSize: 25, color: '#B22222'}}>Deadline:</Text>
      <Text style={AppStyles.datePickerText}>{text}</Text>
      <Button title='Pick Date' onPress={() => showMode('date')}/>
      <Button title='Pick Time' onPress={() => showMode('time')}/>
      

      {show && (
        <DateTimePicker
        testID = 'dateTimePicker'
        value = {date}
        mode = {mode}
        is24Hour={true}
        display='default'
        onChange={onChange}


        />
      )}
    </View>

      <View style={[AppStyles.rowContainer, AppStyles.rightAligned, AppStyles.rightMargin]}>
        <Button title="Cancel" onPress={props.onClose} />
        <Button title="OK" onPress={() => {
          props.addToDo(todo, date);
          setTodo("");
          props.onClose();
        }} />
      </View>
    </View>
  );
}