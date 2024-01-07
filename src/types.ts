import {DocumentPickerResponse} from 'react-native-document-picker';

export type DocumentExploreMeta = {
  pickerResult: DocumentPickerResponse;
  updatedAt: string;
  md5: string;
};
