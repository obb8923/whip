import styled from 'styled-components';

export const Box = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 3px solid ${(props) => props.borderColor};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

export const BoxTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  white-space: pre-line;
`;

export const BoxContent = styled.div`
  font-size: 16px;
  font-weight: 400;
  img {
    margin-right: 40px;
  }
  white-space: pre-line;
  display: flex;
  align-items: center;
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.pageName === 'main' ? '160px' : 'max-content')};
  height: ${(props) => (props.pageName === 'main' ? '60px' : '25px')};
  border: none;
  border-radius: 10px;
  padding: 4px 10px;
  background: ${(props) => props.theme.color}; // theme color
  box-shadow: 5px 5px 5px gray;
  color: white; // theme color
  font-size: 16px;
  font-weight: 400;
  text-align: center;
`;
