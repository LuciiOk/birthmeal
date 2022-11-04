import { useState } from "react";
import * as Clipboard from "expo-clipboard";
import { ToastAndroid } from "react-native";

const useClipBoard = () => {
  const [clipBoard, setClipBoard] = useState(null);

  const copyToClipBoard = async (text) => {
    await Clipboard.setStringAsync(text);
    setClipBoard(text);
    ToastAndroid.show("Se copió al portapapeles", ToastAndroid.SHORT);
  };

  const fetchClipBoard = async () => {
    const content = await Clipboard.getStringAsync();
    setClipBoard(content);
  };

  return { clipBoard, copyToClipBoard, fetchClipBoard };
};

export default useClipBoard;
