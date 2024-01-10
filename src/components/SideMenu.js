import React, { useEffect, useState } from "react";
import logo from "../assets/logo/Icon2.png";
import user from "../assets/logo/user.png";

import MenuItem from "./MenuItem";
import { reportsDataDummy } from "../datasets/reports";
import { getAllReports, login, menuItemsTest, tokentest } from "../utils";
import { useMsal } from "@azure/msal-react";

/**
 * @author
 * @function SideMenu
 **/

// added more menuItems for testing
// export const menuItems = [
//   {
//     name: "Workspace",
//     exact: true,
//     to: "/",
//     iconClassName: "bi bi-speedometer2",
//   },
//   {
//     name: "Reports",
//     exact: true,
//     to: `/report`,
//     iconClassName: "bi bi-speedometer2",
//     subMenus: [
//       { name: "Courses", to: "/report/courses" },
//       { name: "Videos", to: "/report/videos" },
//     ],
//   },
//   { name: "Dashboard", to: `/dashboard`, iconClassName: "bi bi-vector-pen" },
//   {
//     name: "Tiles",
//     exact: true,
//     to: `/tiles`,
//     iconClassName: "bi bi-speedometer2",
//     subMenus: [
//       { name: "Courses", to: "/tiles/courses" },
//       { name: "Videos", to: "/tiles/videos" },
//     ],
//   }
//   // { name: "Design 2", to: `/design-2`, iconClassName: "bi bi-vector-pen" },
//   // { name: "Design 3", to: `/design-3`, iconClassName: "bi bi-vector-pen" },
//   // { name: "Design 4", to: `/design-4`, iconClassName: "bi bi-vector-pen" },
// ];

const SideMenu = (props) => {
  const [inactive, setInactive] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [allReportsData, setAllReportsData] = useState(props.allReportsData);
  const [selMenu, setSelMenu] = useState()
  let selectedWorkspces = sessionStorage.getItem("selectedWorkspaces")?.split(",");
  useEffect(() => {
    if(!Number.isInteger(sessionStorage.getItem("selectedWorkspaces"))) {
      let ans = sessionStorage.getItem("selectedWorkspaces") && getAllReports(sessionStorage.getItem("selectedWorkspaces")).then((data) => {
        setAllReportsData([...data?.value]);
        return data;
      });
    }
  

  },[sessionStorage.getItem("selectedWorkspaces")]);
  let menuItems = menuItemsTest(allReportsData);
 
  const handleToggle = () => {
    setIsChecked(!isChecked); // Toggle the value
  };


  const handleMenuSel = (menuItem) => {
    setSelMenu(menuItem)
  }

  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }
    props.onCollapse(inactive);
  }, [inactive]);

  useEffect(() => {
    props.handleToggle(isChecked);
  }, [isChecked]);

  //just an improvment and it is not recorded in video :(
  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  /*just a little improvement over click function of menuItem
    Now no need to use expand state variable in MenuItem component
  */
  useEffect(() => {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems && menuItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove("active"));
        el.classList.toggle("active");
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, [props.allReportsData]);

  return (
    <div
      className={`side-menu ${inactive ? "inactive" : ""}`}
      style={{ backgroundColor: `${isChecked ? "black" : "white"}` }}
    >
      <div className="top-section">
        <div className="logo">
          <img src={logo} alt="webscript" />
        </div>
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (
            <i class="bi bi-arrow-right-square-fill"></i>
          ) : (
            <i class="bi bi-arrow-left-square-fill"></i>
          )}
        </div>
      </div>

      {/* <div className="search-controller">
        <button className="search-btn">
          <i class="bi bi-search"></i>
        </button>

        <input type="text" placeholder="search" />
      </div> */}

      <div className="divider"></div>

      <div className="main-menu">
        <ul>
          {menuItems && menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              exact={menuItem.exact}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
              iconClassName={menuItem.iconClassName}
              isChecked={isChecked}
              onClick={(e) => {
                if (inactive) {
                  setInactive(false);
                }
                handleMenuSel(menuItem)
              }}
            />
          ))}

          {/* <li>
            <a className="menu-item">
              <div className="menu-icon">
                <i class="bi bi-speedometer2"></i>
              </div>
              <span>Dashboard</span>
            </a>
          </li>
          <MenuItem
            name={"Content"}
            subMenus={[{ name: "Courses" }, { name: "Videos" }]}
          />
          <li>
            <a className="menu-item">
              <div className="menu-icon">
                <i class="bi bi-vector-pen"></i>
              </div>
              <span>Design</span>
            </a>
          </li> */}
        </ul>
      </div>
      <div></div>
      <div
        className="footer"
        style={{ color: `${isChecked ? "#6B6C6Fff" : "black"}` }}
      >
        {/* <div className="side-menu-footer">
          <div className={`avatar${inactive ? "inactive" : ""}`}>
            <img src={user} alt="user" />
          </div>
          <div className={`user-info${inactive ? "inactive" : ""}`}>
            <h5>User Name</h5>
            <p>username@mail.com</p>
          </div>
          <button onClick={handleSignIn}>
            {" "}
            <i class="bi bi-box-arrow-right"></i>
          </button>
        </div> */}
        {/* <div className="divider"></div> */}

        <div className="side-menu-footer-theme">
          <div className={`avatar${inactive ? "inactive" : ""}`}>
            {/* <img src={user} alt="user" /> */}
            <i class="bi bi-moon"></i>
          </div>
          <div className={`content${inactive ? "inactive" : ""}`}>
            {/* <img src={user} alt="user" /> */}
            {/* <i class="bi bi-moon"></i> */}
            <h5>Dark/Light Mode </h5>
          </div>
          <div className="dark_light_theme">
            <label class="switch">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleToggle}
              />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
