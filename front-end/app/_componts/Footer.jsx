import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className="flex justify-center items-center bg-[var(--bg-blue)] flex-col text-white py-7 px-10">
      <div className="flex justify-center items-center mb-2.5">
        <a
          href="https://www.facebook.com/profile.php?id=100073551673496"
          target="_blank"
          aria-label="Facebook"
        >
          <FontAwesomeIcon
            icon={faFacebook}
            style={{
              color: "#1877F2",
              width: "38px",
              marginLeft: "10px",
              cursor: "pointer",
            }}
          />
        </a>
        <a
          href="https://www.linkedin.com/in/youssef-abdul-rahman-575907321/"
          target="_blank"
          aria-label="Linkedin"
        >
          <FontAwesomeIcon
            icon={faLinkedinIn}
            style={{
              color: "#0A66C2",
              width: "38px",
              marginLeft: "10px",
              cursor: "pointer",
            }}
          />
        </a>
        <a
          href="https://www.youtube.com/@yoska00"
          target="_blank"
          aria-label="Youtube"
        >
          <FontAwesomeIcon
            icon={faYoutube}
            style={{
              color: "#CD201F",
              width: "38px",
              marginLeft: "10px",
              cursor: "pointer",
            }}
          />
        </a>
      </div>
      <hr className="w-1/2  mb-2.5" />
      <h2>صنع بواسطة يوسف</h2>
    </div>
  );
}
