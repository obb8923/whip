import React, { useEffect, useState } from 'react';
import * as style from './styles';
import FullBtn from '../../Button/fullBtn';
import StrokeBtn from '../../Button/strokeBtn';
import Modal from 'react-modal';
import { themeWink, themeFoscar } from '../../Theme/theme';
import axios from 'axios';

export default function SeatModal(props) {
  const [isButtonOpen, setIsButtonOpen] = useState(true);
  const [seatInfo, setSeatInfo] = useState('');
  const club = sessionStorage.getItem('club');
  const token = sessionStorage.getItem('token');

  const getSeat = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/seat/my-seat`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        setSeatInfo(res.data.seatNumber);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const patchSeatReturn = async () => {
    await axios
      .patch(`${process.env.REACT_APP_API_URL}/seat/return`, null, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        props.setUpdateFlag(true);
        alert('반납이 완료되었습니다 !');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const patchSeatRent = async () => {
    await axios
      .patch(
        `${process.env.REACT_APP_API_URL}/seat/rent`,
        { seatNumber: props.mySeatInfo },
        {
          headers: { Authorization: `${token}` },
        },
      )
      .then((res) => {
        props.setUpdateFlag(true);
        alert('배정이 완료되었습니다 !');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseBtn = () => {
    props.setModalOpen(false);
  };

  const handleConfirmBtn = () => {
    if (props.mySeatInfo == seatInfo) {
      patchSeatReturn();
    } else {
      patchSeatRent();
    }

    props.setModalOpen(false);
  };
  useEffect(() => {
    getSeat();
  }, [seatInfo, props.updateFlag]);

  return (
    <>
      <Modal
        isOpen={props.modalOpen}
        onRequestClose={() => props.setModalOpen(false)}
        style={style.customModalStyles}
        ariaHideApp={false}
        contentLabel="seat modal"
        shouldCloseOnOverlayClick={false}
      >
        <style.ModalHeader>
          <style.CloseButton
            src={process.env.PUBLIC_URL + '/Images/All/closeIcon.svg'}
            onClick={() => handleCloseBtn()}
          />
        </style.ModalHeader>
        <style.ModalContent>
          {props.mySeatInfo == seatInfo ? (
            <style.SeatText>
              {props.mySeatInfo}번 좌석을 반납하시겠습니까?
            </style.SeatText>
          ) : props.clubSeatInfo === 'using' ? (
            <div>
              {() => {
                setIsButtonOpen(false);
                return (
                  <style.SeatText>이미 사용 중인 좌석입니다.</style.SeatText>
                );
              }}
            </div>
          ) : (
            <style.SeatText>
              {props.mySeatInfo}번 좌석을 배정하시겠습니까?
            </style.SeatText>
          )}
        </style.ModalContent>
        {isButtonOpen && (
          <style.ModalFooter>
            <FullBtn
              size="small"
              name="확인"
              club={club}
              onClick={() => handleConfirmBtn()}
            />
            <StrokeBtn name="취소" club={club} onClick={handleCloseBtn} />
          </style.ModalFooter>
        )}
      </Modal>
    </>
  );
}
