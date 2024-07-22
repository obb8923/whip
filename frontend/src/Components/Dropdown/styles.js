import styled from 'styled-components';

export const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.gap};
`;

export const DropdownTitleSpan = styled.span`
  font-size: 16px;
  font-weight: 800;
`;

export const DropdownContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid #000000;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: ${(props) => (props.view ? '0px' : '8px')};
  border-bottom-right-radius: ${(props) => (props.view ? '0px' : '8px')};
  font-size: 14px;
  position: relative;
  cursor: pointer;
`;

export const DropdownHeader = styled.div`
  width: ${(props) => (props.isModal ? '80%' : '90%')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const selectedValueItem = styled.div`
  width: 100%;
`;

export const DropdownContent = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1;
  top: 100%;
  border: 1px solid #000000;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const DropdownItem = styled.div`
  padding: 10px;
  background-color: ${(props) => (props.selectedValue ? '#f5f5f5' : '#ffffff')};
  &:first-child {
    border-top: 1px solid #000000;
    border-bottom: 1px solid #000000;
  }
  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  &:hover {
    background-color: #f5f5f5;
  }
`;
