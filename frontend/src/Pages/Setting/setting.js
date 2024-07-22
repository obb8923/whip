import React, { useEffect, useState } from 'react';
import * as style from './styles';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/header';
import Footer from '../../Components/Footer/footer';
import Box from '../../Components/Box/box';
import FullBtn from '../../Components/Button/fullBtn';
import axios from 'axios';
import SeatModal from '../../Components/Modal/SeatModal/seatModal';

export default function Setting() {
  const title = '설정';

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [seatInfo, setSeatInfo] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const token = sessionStorage.getItem('token');

  const getUser = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/user/update`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        setUserInfo(res.data.member);
        setSeatInfo(res.data.seatNumber);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Header title={title} />
      <style.SettingContainer>
        <style.Title>나의 프로필</style.Title>
        <style.UserInfoContainer>
          <style.UserInfoWrapper>
            <style.UserProfile>
              {userInfo.profile ? (
                <img src={userInfo.profile} alt="프로필 사진" />
              ) : (
                <img
                  src={process.env.PUBLIC_URL + '/Images/Setting/profile.svg'}
                  alt="프로필 사진"
                />
              )}
            </style.UserProfile>
            <style.UserInfoBox>
              <style.UserInfo>
                <span>이름</span>
                <span>{userInfo.name}</span>
              </style.UserInfo>
              <style.UserInfo>
                <span>소속</span>
                <span>{userInfo.club}</span>
              </style.UserInfo>
              <style.UserInfo>
                <span>학번</span>
                <span>{userInfo.studentId}</span>
              </style.UserInfo>
            </style.UserInfoBox>
          </style.UserInfoWrapper>
          <FullBtn
            size="big"
            club={userInfo.club}
            name="프로필 수정하기"
            onClick={() => {
              navigate('/profileEdit', { state: { userInfo } });
            }}
          />
        </style.UserInfoContainer>
        <style.Title>나의 예약</style.Title>
        <style.ReservationContainer>
          <Box
            width={'320px'}
            height={'90px'}
            borderColor={'#3A70FF'}
            pageName={'main'}
            src={process.env.PUBLIC_URL + '/Images/All/winkSeatIcon.svg'}
            content={
              seatInfo
                ? seatInfo + '번 좌석 사용 중'
                : '이용 중인 좌석이 없습니다.'
            }
            onClick={() => setModalOpen(true)}
          />
          {seatInfo && (
            <SeatModal
              mySeatInfo={seatInfo}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            />
          )}
        </style.ReservationContainer>
      </style.SettingContainer>
      <Footer title={title} />
    </>
  );
}
