import styled from 'styled-components';

export const SmallFullButton = styled.button`
  background: ${(props) => props.theme.color}; // theme color
  padding: 8px;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
`;

export const BigFullButton = styled.button`
  width: 200px;
  height: 33px;
  background: ${(props) => props.theme.color}; // theme
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
`;

export const StrokeButton = styled.button`
  color: ${(props) => props.theme.color}; // theme
  background: white;
  border: 2px solid;
  border-color: ${(props) => props.theme.color}; // theme
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
`;

export const SmallFullSquareButton = styled.button`
  width: 57px;
  height: 57px;
  background: ${(props) => props.theme.color};
  border: 3px solid;
  border-color: ${(props) => props.theme.color}; // theme
  border-radius: 10px;
  cursor: pointer;
`;

export const BigFullSquareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: ${(props) => props.theme.color};
  border: 5px solid;
  border-color: ${(props) => props.theme.color}; // theme
  border-radius: 30px;
  cursor: pointer;
`;

export const SmallStrokeSquareButton = styled.button`
  width: 19px;
  height: 19px;
  background: white;
  border: 1px solid;
  border-color: ${(props) => props.theme.color}; // theme
  border-radius: 5px;
  cursor: pointer;
`;

export const MiddleStrokeSquareButton = styled.button`
  width: 57px;
  height: 57px;
  background: white;
  border: 3px solid;
  border-color: ${(props) => props.theme.color}; // theme
  border-radius: 10px;
  cursor: pointer;
`;

export const BigStrokeSquareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: white;
  border: 5px solid;
  border-color: ${(props) => props.theme.color}; // theme
  border-radius: 30px;
  cursor: pointer;
`;

export const ImageForSquare = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;
