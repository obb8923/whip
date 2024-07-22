import styled from 'styled-components';

export const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 21px;
`;

export const UserInfoContainer = styled.div`
  margin-bottom: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

export const Title = styled.div`
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: 600;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 90px;
`;

export const UserProfile = styled.div`
  > img {
    width: 120px;
    height: 120px;
    border-radius: 300px;
  }
`;

export const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const UserInfo = styled.div`
  font-size: 16px;
  :first-child {
    font-weight: 700;
    margin-right: 10px;
  }
`;

export const ReservationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;
