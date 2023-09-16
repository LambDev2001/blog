import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEnvelope, faBell } from "@fortawesome/free-solid-svg-icons";

import { updateMenu } from "../../redux/actions/menuAction";

const Header = () => {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menuReducer);

  const handleMenu = () => {
    dispatch(updateMenu(!menu));
  };

  return (
    <nav
      className="navbar navbar-expand space-x-4 justify-between sticky top-0 rounded-lg shadow-md bg-gray-200 mb-2 h-[58px]"
      style={{ zIndex: 999 }}>
      <div>
        <FontAwesomeIcon
          icon={faBars}
          className="w-[30px] h-[30px] py-2 px-3"
          onClick={handleMenu}
        />
      </div>
      <div>
        <FontAwesomeIcon icon={faBell} className="w-[30px] h-[30px] py-2 px-3" />
        <FontAwesomeIcon
          icon={faEnvelope}
          className="w-[30px] h-[30px] py-2 px-3"
          style={{ "--fa-secondary-opacity": "0.6" }}
        />
      </div>
    </nav>
  );
};

export default Header;
