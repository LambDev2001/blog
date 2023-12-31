import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { updateMenu } from "../../redux/actions/menuAction";

const Header = ({ content = "" }) => {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menuReducer);
  const color = useSelector((state) => state.themeReducer.themeColor);
  const user = useSelector((state) => state.authReducer.user);

  const handleMenu = () => {
    dispatch(updateMenu(!menu));
  };

  return (
    <nav
      className={`navbar navbar-expand space-x-4 justify-between sticky top-0 rounded-lg shadow-md ${color.outside} mb-2 h-[58px]`}
      style={{ zIndex: 999 }}>
      <div>
        <FontAwesomeIcon
          icon={faBars}
          className={`${!user && "hidden"} w-[30px] h-[30px] py-2 px-3 cursor-pointer`}
          onClick={handleMenu}
        />
      </div>

      <div className="text-2xl font-serif">{content}</div>
      <div></div>
      {/* <div>
        <FontAwesomeIcon icon={faBell} className="w-[30px] h-[30px] py-2 px-3" />
        <FontAwesomeIcon
          icon={faEnvelope}
          className="w-[30px] h-[30px] py-2 px-3"
          style={{ "--fa-secondary-opacity": "0.6" }}
        />
      </div> */}
    </nav>
  );
};

export default Header;
