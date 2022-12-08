import { Link, useLocation } from "react-router-dom";
import { Navbar, Dropdown } from "flowbite-react";
import { useState } from "react";
import { scrollTop } from "../function/scrollTop.js";

import youtubeLogo from "../assets/YouTube-Logo.webp";

const Navigation = () => {
  const [keySearch, setKeySearch] = useState();
  const location = useLocation();

  return (
    <Navbar
      fluid={true}
      rounded={false}
      className="shadow-md sticky top-0 z-50"
    >
      <Navbar.Brand>
        <img src={youtubeLogo} className="w-32" />
      </Navbar.Brand>
      <div className="search lg:w-[52vw] w-[40vw] md:flex hidden">
        <input
          type="text"
          className="h-9 rounded-l-lg lg:w-[44vw] w-[36vw]"
          onChange={(e) => setKeySearch(e.target.value)}
          id="lageSearchBar"
        ></input>
        <Link to={"/search/" + keySearch} onClick={scrollTop}>
          <button className="w-[6vw] bg-[#1a56db] rounded-r-lg grid place-content-center h-9">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="white"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </Link>
      </div>
      <div className="flex md:order-2">
        <Dropdown arrowIcon={false} inline={true}></Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <div className="search flex justify-center place-content-center md:hidden">
          <input
            type="text"
            className="h-8 mb-2 w-[87vw] rounded-l-md"
            onChange={(e) => setKeySearch(e.target.value)}
          ></input>
          <Link to={"/search/" + keySearch} onClick={scrollTop}>
            <button className="w-[10vw] bg-[#1a56db] h-8 flex justify-center items-center rounded-r-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="white"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Link>
        </div>
        <Link to={"/"} onClick={scrollTop}>
          <Navbar.Link className="rounded-md" active={location.pathname == "/"}>
            Branda
          </Navbar.Link>
        </Link>
        <Link to={"/tranding"} onClick={scrollTop}>
          <Navbar.Link
            className="rounded-md"
            active={location.pathname == "/tranding"}
          >
            Tranding
          </Navbar.Link>
        </Link>
        <Navbar.Link className="rounded-md text-gray-400">
          Coming Soon
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
