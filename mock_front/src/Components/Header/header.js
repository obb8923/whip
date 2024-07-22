import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as style from './styles';
import ReportModal from '../Modal/ReportModal/reportModal';

export default function Header(props) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <style.Header>
      <img
        src={process.env.PUBLIC_URL + '/Images/Header/backIcon.svg'}
        onClick={() => navigate(-1)}
      />
      <span>{props.title}</span>
      {props.title === '회의 테이블 배정' ? (
        <style.ButtonBlock>
          <button onClick={() => props.onClick()}>
            <span>예약하기</span>
          </button>
        </style.ButtonBlock>
      ) : props.title === '일반 좌석 배정' ? (
        <style.ButtonBlock>
          <button onClick={() => setModalOpen(!modalOpen)}>
            <span>신고하기</span>
          </button>
          <ReportModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </style.ButtonBlock>
      ) : null}
    </style.Header>
  );
}
