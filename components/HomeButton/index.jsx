import { useNavigation } from '@react-navigation/core';
import React, {useContext} from 'react';
import { Dimensions, Platform, View } from 'react-native';
import styled from 'styled-components';
import StyleContext from '../../contexts/StyleContext';
const oneThird = Math.round(Dimensions.get('screen').width / 3)
const HomeButton = () => {
  const styleContext = useContext(StyleContext);
  const navigation = useNavigation();
  if(Platform.OS === "ios" && navigation.canGoBack()){
    return (
        <ButtonView onPress={() => navigation.goBack()}>
          <TextColored color={styleContext.primary}>
            Go Back
        </TextColored>
        </ButtonView>
    )
  }
  else{
    return <View></View>
  }
}
export default HomeButton;

const ButtonView = styled.TouchableOpacity`
  justifyContent: center;
  width: 131px
  alignItems: center
`;
const TextColored = styled.Text`
  color: ${({ color }) => color};
  fontSize: ${({ font }) => font || "15px"}
  fontWeight: bold
  ${({styles})=>styles}
`;