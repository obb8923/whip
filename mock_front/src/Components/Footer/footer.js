import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as style from './styles';

export default function Footer(props) {
  const navigate = useNavigate();

  return (
    <style.Footer>
      <style.FooterLink>
        {props.title !== '메인' ? (
          <img
            src={process.env.PUBLIC_URL + '/Images/Footer/mainIcon.svg'}
            onClick={() => navigate('/main')}
          />
        ) : (
          <img
            src={process.env.PUBLIC_URL + '/Images/Footer/selectedMainIcon.svg'}
          />
        )}
      </style.FooterLink>
      <style.FooterLink>
        {props.title !== '회의 테이블 배정' ? (
          <img
            src={process.env.PUBLIC_URL + '/Images/Footer/meetingTableIcon.svg'}
            onClick={() => navigate('/meetingTable')}
          />
        ) : (
          <img
            src={
              process.env.PUBLIC_URL +
              '/Images/Footer/selectedMeetingTableIcon.svg'
            }
          />
        )}
      </style.FooterLink>
      <style.FooterLink>
        {props.title !== '일반 좌석 배정' ? (
          <img
            src={process.env.PUBLIC_URL + '/Images/Footer/regularSeatIcon.svg'}
            onClick={() => navigate('/regularSeat')}
          />
        ) : (
          <img
            src={
              process.env.PUBLIC_URL +
              '/Images/Footer/selectedRegularSeatIcon.svg'
            }
          />
        )}
      </style.FooterLink>
      <style.FooterLink>
        {props.title !== '설정' ? (
          <img
            src={process.env.PUBLIC_URL + '/Images/Footer/settingIcon.svg'}
            onClick={() => navigate('/setting')}
          />
        ) : (
          <img
            src={
              process.env.PUBLIC_URL + '/Images/Footer/selectedSettingIcon.svg'
            }
          />
        )}
      </style.FooterLink>
    </style.Footer>
  );
}
