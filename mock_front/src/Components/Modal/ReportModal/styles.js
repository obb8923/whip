import styled from 'styled-components';

export const customModalStyles = {
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100vh',
    zIndex: '150',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    width: '260px',
    height: '360px',
    zIndex: '150',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    boxShadow: '2px 2px 2px #00000040',
    backgroundColor: 'white',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '24px 12px 0px 12px',
    border: '2px solid #3a70ff',
  },
};

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 700;
`;

export const CloseButton = styled.img`
  cursor: pointer;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const ModalItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  &:last-child {
    flex-direction: column;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 20px;
`;

export const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

export const DateTimeTitle = styled.span`
  font-weight: 700;
`;

export const DateItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TimeItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TimeBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CustomDatePicker = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px 2px;
  width: 128px;
  height: 28px;
  border: 1px solid grey;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
`;
