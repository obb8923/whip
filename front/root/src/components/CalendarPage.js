import CalendarFragment from "./CalendarFragment";
import GNB from "./GNB";
import styles from "../css/CalendarPage.module.css";
export default function CalendarPage() {
  return (
    <div className="frameBox">
      <div className="contentBox">
        <CalendarFragment />
      </div>

      <GNB></GNB>
    </div>
  );
}
