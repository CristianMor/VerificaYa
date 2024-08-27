import React from 'react';
import { Image, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { ICONS } from '../../global';
import { Icon, IconElement, Input, Text } from '@ui-kitten/components';

const InputPassword = ({ value, label, placeholder, onChangeText }) => {

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Image 
        {...props}
        source={secureTextEntry ? ICONS.EYE_OFF : ICONS.EYE}
      />
    </TouchableWithoutFeedback>
  );

  return (
    <Input
      value={value}
      label={label}
      placeholder={placeholder}
      accessoryRight={renderIcon}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
    />
  );
};

export default InputPassword;

const styles = StyleSheet.create({
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    //fontFamily: 'opensans-regular',
    color: '#8F9BB3',
  },
});
