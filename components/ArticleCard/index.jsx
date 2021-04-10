import React, { useContext } from 'react';
import styled from 'styled-components/native';
import StyleContext from '../../contexts/StyleContext';

const ArticleCard = (props) => {
  const styleContext = useContext(StyleContext)
  return (
    <Card 
      onPress={()=>alert("second")}
      background={styleContext.background}
      secondary={styleContext.primary}
      mode={styleContext.currentTheme}
    >
      {props.children}
    </Card>
  );
};
export default ArticleCard;
const Card = styled.View`
  background: ${({ background }) => background};
  display: flex;
  margin: 10px 0;
  padding: 20px 10px;
  justify-content: center;
  align-items: center;
  shadow-opacity: 0.75;
  shadow-radius: 15px;
  shadow-color: black;
  shadow-offset: 10px 10px;
  elevation:10;
  ${({mode, secondary})=>mode === "lightTheme"|| "borderColor: " + secondary + "; borderWidth: 2px"}
`;
