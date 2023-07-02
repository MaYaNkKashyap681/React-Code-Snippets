import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const App = () => {
  const [selectedText, setSelectedText] = useState('');

  const handleTextSelection = (event) => {
    const { selection } = event.nativeEvent;
    const selected = event.nativeEvent.text.slice(
      selection.start,
      selection.end
    );
    setSelectedText(selected);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        multiline
        style={{ height: 200, width: '80%', borderWidth: 1, padding: 10 }}
        onSelectionChange={handleTextSelection}
      />
      <Text>Selected Text: {selectedText}</Text>
    </View>
  );
};

export default App;
