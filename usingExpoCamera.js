import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Camera, CameraType } from "expo-camera";

const CameraDoubt = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState('');

  useEffect(() => {
    (async () => {
      const camSatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(camSatus === "granted");
    })();
  }, []);

  const takePic = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();
      setImage(data.uri);

    }
  };

  return (
    <SafeAreaView>
      <View style={tw`flex justify-center items-center h-full`}>
        <Camera
          style={tw`h-64 w-64`}
          type={type}
          ratio={"1:1"}
          ref={(ref) => setCamera(ref)}
        ></Camera>
        <View style={tw`flex-row justify-center items-center`}>
          <TouchableOpacity
          onPress={takePic}
            style={tw`flex-row justify-center items-center bg-green-200 mt-16 p-4 border-2 rounded-2`}
          >
            <Text style={tw`font-bold text-lg`}>Click Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )
            }
            style={tw`flex-row justify-center items-center bg-green-200 mt-16 p-4 border-2 rounded-2`}
          >
            <Text style={tw`font-bold text-lg`}>Toggle Camera</Text>
          </TouchableOpacity>
        </View>
        {image && (
          <View
            style={tw`flex-row justify-center items-center h-32 w-32 mt-16`}
          >
            <Image source={{ uri: image }} style={tw`h-32 w-32`} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CameraDoubt;
