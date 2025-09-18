import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import './Footer.css'

dayjs.extend(utc);
dayjs.extend(timezone);

function Footer(){
  const userTimezone = dayjs.tz.guess();
  const offset = dayjs().tz(userTimezone).format('Z');

  return(
    <footer className="footer-container">
      <p className="timezone">{userTimezone} {offset}</p>
      <p className="copyright">© {dayjs().year()} My Clock App. All rights  reserved.</p>
    </footer>
  )
}

export default Footer;