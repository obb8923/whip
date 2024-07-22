import Box from '../../Components/Box/box';
import TitleBox from '../../Components/Box/titleBox';
import Header from '../../Components/Header/header';
import Footer from '../../Components/Footer/footer';
import * as style from './styles';
import WinkSeat from '../../Components/Seat/WinkSeat';
import FoscarSeat from '../../Components/Seat/FoscarSeat';

export default function RegularSeat() {
  const club = sessionStorage.getItem('club');

  return (
    <>
      <Header title="일반 좌석 배정" />
      <style.RegularSeat>
        <style.TotalSeat>
          <FoscarSeat club={club} />
          <WinkSeat club={club} />
        </style.TotalSeat>
        <style.Titlecontainer>
          <TitleBox club="wink" title="좌석 배정 및 반납 방법" />
        </style.Titlecontainer>
        <Box
          width="351px"
          height="167px"
          pageName="regularSeat"
          borderColor="#3A70FF"
          title1="좌석 배정"
          content1={'1. 빈 좌석을 부른다.\n 2. 배정 확인 버튼을 부른다.'}
          title2="좌석 반납"
          content2={
            '1. 현재 자신이 사용중인 좌석을 누른다.\n 2. 반납 확인 버튼을 누른다.'
          }
        />
      </style.RegularSeat>
      <Footer title="일반 좌석 배정" />
    </>
  );
}
