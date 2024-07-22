import * as style from './styles';
import { useState, useEffect } from 'react';
import SeatModal from '../Modal/SeatModal/seatModal';
import axios from 'axios';

export default function FoscarSeat(props) {
  const [clubSeatInfo, setClubSeatInfo] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);

  const club = 'foscar';
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

  const foscarSeatData = [
    { club: club, monitor: 'true', number: '1' },
    { club: club, monitor: 'true', number: '2' },
    { club: club, monitor: 'true', number: '3' },
    { club: club, monitor: 'true', number: '4' },
    { club: club, monitor: 'false', number: '5' },
    { club: club, monitor: 'false', number: '6' },
    { club: club, monitor: 'true', number: '7' },
    { club: club, monitor: 'false', number: '8' },
  ];

  const foscarSeatDT1 = foscarSeatData.slice(0, 4);
  const foscarSeatDT2 = foscarSeatData.slice(4, 8);

  return (
    <>
      {props.club === 'foscar' ? (
        <style.GroupContainer>
          <style.SeatContainer>
            {foscarSeatDT1.map((item) => {
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
            {foscarSeatDT2.map((item) => {
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
            {foscarSeatDT1.map(() => {
              return <style.BannedSeat />;
            })}
          </style.SeatContainer>
          <style.SeatContainer>
            {foscarSeatDT2.map(() => {
              return <style.BannedSeat />;
            })}
          </style.SeatContainer>
        </style.GroupContainer>
      )}
    </>
  );
}
