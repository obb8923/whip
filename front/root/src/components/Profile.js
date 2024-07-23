import GNB from "./GNB";
import styles from "../css/Profile.module.css";
import ProfileForm from "./ProfileForm";
export default function Profile() {
  return (
    <div className="frameBox">
      <div className="contentBox">
        <ProfileForm></ProfileForm>
      </div>
      <GNB></GNB>
    </div>
  );
}
