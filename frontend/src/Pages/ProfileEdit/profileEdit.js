import React, { useState, useEffect, useRef } from 'react';
import Header from '../../Components/Header/header';
import Footer from '../../Components/Footer/footer';
import * as style from './styles';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../Components/Input/input';
import FullBtn from '../../Components/Button/fullBtn';
import Dropdown from '../../Components/Dropdown/dropdown';
import axios from 'axios';

export default function ProfileEdit() {
  const title = '프로필 수정';

  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = location.state.userInfo;

  const token = sessionStorage.getItem('token');

  const [name, setName] = useState(userInfo.name);
  const [club, setClub] = useState(userInfo.club);
  const [studentId, setStudentId] = useState(userInfo.studentId);
  const [profile, setProfile] = useState(userInfo.profile);

  const imageInputRef = useRef('');

  const patchUser = async (formData) => {
    await axios
      .patch(`${process.env.REACT_APP_API_URL}/user/update`, formData, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        navigate('/setting');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleProfileChange = (e) => {
    let reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const previewImgUrl = reader.result;
      if (previewImgUrl) {
        setProfile(previewImgUrl);
      }
    };
  };

  const createItem = async () => {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('studentID', studentId);
    formData.append('club', club);

    if (imageInputRef.current && imageInputRef.current.files[0]) {
      formData.append('profile', imageInputRef.current.files[0]);
    }
    try {
      await patchUser(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header title={title} />
      <style.ProfileEditContainer>
        <style.UserProfile>
          {profile ? (
            <img src={profile} alt="프로필 사진" />
          ) : (
            <img
              src={process.env.PUBLIC_URL + '/Images/Setting/profile.svg'}
              alt="프로필 사진"
            />
          )}
          <style.EditButton>
            <style.EditLabel htmlFor="imageUpload">
              <img
                src={process.env.PUBLIC_URL + '/Images/All/pencil.svg'}
                alt="프로필 수정 버튼"
              />
            </style.EditLabel>
            <style.EditInput
              id="imageUpload"
              type="file"
              accept="image/*"
              ref={imageInputRef}
              onChange={handleProfileChange}
            />
          </style.EditButton>
        </style.UserProfile>
        <style.InputWrapper>
          <Input
            content={'이름'}
            type={'text'}
            width={'180px'}
            height={'15px'}
            placeholder={userInfo.name}
            onChange={(e) => setName(e.target.value)}
          />
          <Dropdown
            gap={'29px'}
            club={'wink'}
            content={'소속'}
            width={'202px'}
            height={'29px'}
            onChange={(value) => setClub(value)}
          />
          <Input
            content={'학번'}
            type={'text'}
            width={'180px'}
            height={'15px'}
            placeholder={userInfo.studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </style.InputWrapper>
        <FullBtn
          size="big"
          club={userInfo.club}
          name="확인"
          onClick={createItem}
        />
      </style.ProfileEditContainer>
      <Footer title={title} />
    </>
  );
}
