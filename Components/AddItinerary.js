import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { TextInput } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enGB, registerTranslation } from "react-native-paper-dates"; registerTranslation("en-GB", enGB);
import { DatePickerInput } from 'react-native-paper-dates';
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase";

export const AddItinerary = () => {
    const [startDate, setStartDate] = React.useState(undefined)
    const [endDate, setEndDate] = React.useState(undefined)
    const [nameText, setNameText] = useState('')
    const [locationText, setLocationText] = useState('')

    const handleOnPress = () =>  {
        if (startDate){
            const stringifiedStartDate = JSON.stringify(startDate)
            const stringifiedEndDate = JSON.stringify(endDate)
    
            const finalStartDate = stringifiedStartDate.slice(1, 11)
            const finalEndDate = stringifiedEndDate.slice(1, 11)
            
            addDoc(collection(db, "test-itineraries"), {
                name: nameText,
                location: locationText,
                startDate: finalStartDate,
                endDate: finalEndDate
              }).then(() => {
                addDoc(collection(db, "test-activities"), {
                    activities: []
                })
              });
        }
    }



    return (
        <View>
            <View>
                <Text>Add Trip</Text>
            </View>
            <View>
                <TextInput
                    placeholder='Name of Trip'
                    onChangeText={newNameText => setNameText(newNameText)}
                    defaultValue={nameText}
                    ></TextInput>
                <TextInput
                    placeholder='Location'
                    onChangeText={newLocationText => setLocationText(newLocationText)}
                    defaultValue={locationText}></TextInput>
            </View>
            <SafeAreaProvider>
                <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                    <DatePickerInput
                        locale="en-GB"
                        label="Start Date"
                        value={startDate}
                        onChange={(d) => setStartDate(d)}
                        inputMode="start"
                    />
                </View>
                <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                    <DatePickerInput
                        locale="en-GB"
                        label="End Date"
                        value={endDate}
                        onChange={(d) => setEndDate(d)}
                        inputMode="start"
                    />
                </View>
            </SafeAreaProvider>

            <View>
                <Pressable onPress={handleOnPress}>
                    <Text>
                        Add
                    </Text>
                </Pressable>
            </View>

        </View>
    )

}
