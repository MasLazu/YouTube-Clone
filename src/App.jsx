import { Route, Routes, BrowserRouter } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";

import Home from "./page/Home";
import Navigation from "./layout/Navigation";
import Tranding from "./page/Tranding";
import Search from "./page/Search";
import WatchVideo from "./page/WatchVideo";

const App = () => {
  return (
    <>
      <SkeletonTheme baseColor="#aaa" highlightColor="#777">
        <BrowserRouter>
          <Navigation />
          <Routes basename="/index.html">
            <Route path="/" element={<Home />} />
            <Route path="/tranding" element={<Tranding />} />
            <Route path="/search/:keysearch" element={<Search />} />
            <Route path="/watch/:idVideo" element={<WatchVideo />} />
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
    </>
  );
};

export default App;
