import { View, Text, TextInput } from 'react-native'
import { FontAwesome5 } from 'react-native-vector-icons';
import React, { useState } from 'react'

const Search = () => {

    const [sText, setSText] = useState("");
    const [timer, setTimer] = useState(null);

    const handleTextChange = (text) => {
        setSText(text);
        if (timer) {
            clearInterval(timer)
        };
        const newTimer = setTimeout(() => {
            console.log("Hello");
        }, 2000)
        setTimer(newTimer)
    }


    return (
        <View>
            <View className="h-[80px] p-4">
                <View className="relative flex justify-center h-full w-full bg-white rounded-lg p-1 px-4">
                    <TextInput value={sText} placeholder='search word ...' className="h-full w-[90%] bg-white" onChangeText={handleTextChange}></TextInput>
                    <FontAwesome5 name={"microphone"} size={18} className="absolute right-2 bg-red-300 p-2 rounded-full" />
                </View>
            </View>
        </View>
    )
}

export default Search
