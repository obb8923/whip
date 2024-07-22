import styled from 'styled-components';

export const GroupContainer = styled.div`
  // 세로 좌석 8개 1묶음들에 대한 배치
  width: 200px;
  height: 351px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

export const SeatContainer = styled.div`
  //좌석 4개 - 1묶음으로
  width: 160px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const UseableSeat = styled.div`
  display: flex;
  flex-direction: column;
  width: 64px;
  height: 64px;
  background: #ffffff;
  border: 3px solid
    ${(props) => (props.club === 'wink' ? '#3a70ff' : '#35405a')};
  margin: 5px;
  span {
    margin-left: 1px;
  }
`;

export const SeatHeader = styled.div`
  display: flex;
`;

export const Icon = styled.img`
  margin-left: 5px;
`;

export const BannedSeat = styled.div`
  width: 64px;
  height: 64px;
  background: #808080;
  border: 3px solid #808080;
  margin: 5px;
`;

export const ProfilePic = styled.img`
  display: flex;
  align-self: flex-end;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
