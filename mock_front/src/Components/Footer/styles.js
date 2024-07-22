import styled from 'styled-components';

export const Footer = styled.div`
  position: fixed;
  max-width: 480px;
  width: 100%;
  height: 50px;
  bottom: 0;
  z-index: 100;
  background-color: #ffffff;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid #f1f1f5;
`;

export const FooterLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  > img {
    width: 25px;
    cursor: pointer;
  }
`;
