import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";

export default function Donation() {
  return (
    <div className="flex justify-center items-center flex-col bg-[var(--bg-section)] py-8 px-10 ">
      <h2 className="text-5xl headerSectionAnimation mb-5">تبرع لنا</h2>
      <FontAwesomeIcon
        icon={faHeart}
        style={{
          color: "var(--green-normal)",
          width: "50px",
          background: "white",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
        }}
      />
      <Button
        href="https://paypal.me/yoska00?country.x=EG&locale.x=ar_EG"
        target="_blank"
        variant="contained"
        sx={{
          color: "white",
          background: "var(--green-normal )",
        }}
      >
        تبرع لنا
      </Button>
    </div>
  );
}
