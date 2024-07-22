import styled from 'styled-components';

export const ProfileEditContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 75px 0px 21px;
`;

export const UserProfile = styled.div`
  position: relative;
  > img {
    width: 120px;
    height: 120px;
    border-radius: 300px;
  }
`;

export const EditButton = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
`;

export const EditLabel = styled.label`
  cursor: pointer;
`;

export const EditInput = styled.input`
  display: none;
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  :first-child {
    font-size: 16px;
    font-weight: 700;
    margin-right: 10px;
  }
`;
export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 100px 0px 70px 0px;
`;
