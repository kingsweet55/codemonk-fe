import includes from 'lodash/includes';
import { toastMessages } from 'containers/App/constants';

export const checkIfQuoteFile = (file, MAX_SIZE, MAX_SIZE_MESSAGE) => {
  let output = 0;
  const fileTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip',
    'application/x-rar-compressed',
  ];

  if (file.size > MAX_SIZE) {
    output = MAX_SIZE_MESSAGE;
  } else if (!includes(fileTypes, file.type)) {
    output = toastMessages.quoteFileType;
  }
  return output;
};
