import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";

const SCROLL_OFFSET = 44;

const Header = ({
  title,
  onClickBack
}: {
  title: string;
  onClickBack?: () => void;
}) => {
  // Scrolled beyond set offset
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.floor(window.scrollY);

      if (currentScrollY > SCROLL_OFFSET) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();
  const goBack = () => {
    if (onClickBack) {
      onClickBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 flex w-full transition-all duration-100 backdrop-blur-md ${
          hasScrolled ? "flex-row items-center" : "flex-col items-start"
        } `}
      >
        <button onClick={goBack} className="px-4 py-4">
          <img src="/back.svg" alt="back-button" />
        </button>
        <div
          className={`flex justify-between w-full text-grey ${
            hasScrolled ? "py-2" : "px-4 py-1"
          }`}
        >
          <div>
            <div className={`text-grey ${hasScrolled ? "text-xs" : "text-sm"}`}>
              31st Thu, 2024 between 7:30am - 10:00am
            </div>
            <div
              className={`text-primary font-bold ${
                hasScrolled ? "text-sm" : "text-base"
              }`}
            >
              MBNR Bus stand <span className="text-grey">to</span> Gachibowli
              Circle
            </div>
            <div className={`text-xs ${hasScrolled ? "hidden" : ""}`}>
              4 rides found
            </div>
          </div>
          {/* Hidden the edit for now */}
          <button className={`hidden ${hasScrolled ? "mr-4" : ""}`}>
            <img src="/pen.svg" alt="edit icon" />
          </button>
        </div>
      </header>
      <div className="pb-32"></div>
    </>
  );
};

export default Header;
