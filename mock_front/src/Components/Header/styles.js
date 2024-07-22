import styled from 'styled-components';

export const Header = styled.div`
  position: sticky;
  height: 50px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #f1f1f5;
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  background-color: #ffffff;
  z-index: 100;
  > img {
    width: 20px;
    height: 20px;
    &:first-child {
      left: 20px;
      float: left;
      position: absolute;
    }
    &:last-child {
      right: 20px;
      float: right;
      position: absolute;
    }
  }
`;

export const ButtonBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10%;
  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 25px;
    font-size: 15px;
    font-weight: 600;
    background-color: #3a70ff;
    color: #ffffff;
    border: none;
    border-radius: 10px;
    > span {
      margin-top: 2px;
    }
  }
`;
