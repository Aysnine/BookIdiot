import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Button} from 'react-native';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
} from 'react-native-document-picker';

const mainScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

export function MainScreen() {
  const [result, setResult] = useState<
    Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
  >();

  useEffect(() => {
    console.log(JSON.stringify(result, null, 2));
  }, [result]);

  const handleError = (err: unknown) => {
    if (isCancel(err)) {
      // console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  return (
    <SafeAreaView style={mainScreenStyles.container}>
      <View style={mainScreenStyles.container}>
        <Button
          title="Open Epub File"
          onPress={async () => {
            try {
              const pickerResult = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                copyTo: 'cachesDirectory',
              });
              setResult([pickerResult]);
            } catch (e) {
              handleError(e);
            }
          }}
        />
        {/* <Button
          title="open picker for multi file selection"
          onPress={() => {
            DocumentPicker.pick({allowMultiSelection: true})
              .then(setResult)
              .catch(handleError);
          }}
        />
        <Button
          title="open picker for multi selection of word files"
          onPress={() => {
            DocumentPicker.pick({
              allowMultiSelection: true,
              type: [types.doc, types.docx],
            })
              .then(setResult)
              .catch(handleError);
          }}
        />
        <Button
          title="open picker for single selection of pdf file"
          onPress={() => {
            DocumentPicker.pick({
              type: types.pdf,
            })
              .then(setResult)
              .catch(handleError);
          }}
        />
        <Button
          title="releaseSecureAccess"
          onPress={() => {
            DocumentPicker.releaseSecureAccess([])
              .then(() => {
                console.warn('releaseSecureAccess: success');
              })
              .catch(handleError);
          }}
        />
        <Button
          title="open directory picker"
          onPress={() => {
            DocumentPicker.pickDirectory().then(setResult).catch(handleError);
          }}
        /> */}

        <Text selectable>Result: {JSON.stringify(result, null, 2)}</Text>
      </View>
    </SafeAreaView>
  );
}
