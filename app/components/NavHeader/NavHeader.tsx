import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";

const SCROLL_OFFSET = 44;

const NavHeader = ({
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
          <img src="back.svg" alt="back-button" />
        </button>
        <div
          className={`text-grey font-bold py-1 ${
            hasScrolled ? "text-xl" : "text-2xl px-4"
          }`}
        >
          {title}
        </div>
      </header>
      <div className="pb-24"></div>
    </>
  );
};

export default NavHeader;
