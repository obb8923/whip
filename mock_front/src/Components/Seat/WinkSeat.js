import * as style from './styles';
import { useState, useEffect } from 'react';
import SeatModal from '../Modal/SeatModal/seatModal';
import axios from 'axios';

export default function WinkSeat(props) {
  const [clubSeatInfo, setClubSeatInfo] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);

  const club = 'wink';
  const token = sessionStorage.getItem('token');

  const getClubSeatInfo = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/seat/${club}`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        setUpdateFlag(false);
        setClubSeatInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getClubSeatInfo();
  }, [updateFlag]);

  const winkSeatData = [
    { club: club, monitor: 'true', number: '1' },
    { club: club, monitor: 'true', number: '2' },
    { club: club, monitor: 'true', number: '3' },
    { club: club, monitor: 'true', number: '4' },
    { club: club, monitor: 'false', number: '5' },
    { club: club, monitor: 'true', number: '6' },
    { club: club, monitor: 'false', number: '7' },
    { club: club, monitor: 'false', number: '8' },
  ];

  const winkSeatDT1 = winkSeatData.slice(0, 4);
  const winkSeatDT2 = winkSeatData.slice(4, 8);

  return (
    <>
      {props.club === 'wink' ? (
        <style.GroupContainer>
          <style.SeatContainer>
            {winkSeatDT1.map((item) => {
              return (
                <div>
                  <style.UseableSeat
                    club={club}
                    key={item.number}
                    onClick={() =>
                      setModalOpen((prevState) => ({
                        ...prevState,
                        [item.number]: true,
                      }))
                    }
                  >
                    <style.SeatHeader>
                      <span>{item.number}</span>
                      {item.monitor === 'true' && (
                        <>
                          <style.Icon
                            src={
                              process.env.PUBLIC_URL +
                              '/Images/Seat/monitorIcon.svg'
                            }
                            alt="Monitor Icon"
                          />
                        </>
                      )}
                    </style.SeatHeader>
                    {clubSeatInfo[item.number - 1]?.seatStatus === 'using' && (
                      <style.ProfilePic
                        src={clubSeatInfo[item.number - 1]?.memberProfile}
                        alt="profile pic"
                      />
                    )}
                  </style.UseableSeat>
                  <SeatModal
                    clubSeatInfo={clubSeatInfo[item.number]?.seatStatus}
                    mySeatInfo={item.number}
                    modalOpen={modalOpen[item.number]}
                    setModalOpen={setModalOpen}
                    setUpdateFlag={setUpdateFlag}
                    updateFlag={updateFlag}
                  />
                </div>
              );
            })}
          </style.SeatContainer>
          <style.SeatContainer>
            {winkSeatDT2.map((item) => {
              return (
                <div>
                  <style.UseableSeat
                    club={club}
                    key={item.number}
                    onClick={() =>
                      setModalOpen((prevState) => ({
                        ...prevState,
                        [item.number]: true,
                      }))
                    }
                  >
                    <style.SeatHeader>
                      <span>{item.number}</span>
                      {item.monitor === 'true' && (
                        <>
                          <style.Icon
                            src={
                              process.env.PUBLIC_URL +
                              '/Images/Seat/monitorIcon.svg'
                            }
                            alt="Monitor Icon"
                          />
                        </>
                      )}
                    </style.SeatHeader>
                    {clubSeatInfo[item.number - 1]?.seatStatus === 'using' && (
                      <style.ProfilePic
                        src={clubSeatInfo[item.number - 1]?.memberProfile}
                        alt="profile pic"
                      />
                    )}
                  </style.UseableSeat>
                  <SeatModal
                    clubSeatInfo={clubSeatInfo[item.number]?.seatStatus}
                    mySeatInfo={item.number}
                    modalOpen={modalOpen[item.number]}
                    setModalOpen={setModalOpen}
                    setUpdateFlag={setUpdateFlag}
                    updateFlag={updateFlag}
                  />
                </div>
              );
            })}
          </style.SeatContainer>
        </style.GroupContainer>
      ) : (
        <style.GroupContainer>
          <style.SeatContainer>
            {winkSeatDT1.map(() => {
              return <style.BannedSeat />;
            })}
          </style.SeatContainer>
          <style.SeatContainer>
            {winkSeatDT2.map(() => {
              return <style.BannedSeat />;
            })}
          </style.SeatContainer>
        </style.GroupContainer>
      )}
    </>
  );
}
