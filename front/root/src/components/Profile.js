import React from "react";
import GNB from "./GNB";
import styles from "../css/Profile.module.css";
import ProfileForm from "./ProfileForm";

export default function Profile() {
  return (
    <div className="frameBox" style={{ height: '100%', paddingBottom: '6vh' }}>
      <div className="contentBox" style={{ height: 'auto', minHeight: '94vh', paddingTop: '3vh', paddingBottom: '3vh' }}>
        <ProfileForm />
      </div>
      <GNB />
    </div>
  );
}