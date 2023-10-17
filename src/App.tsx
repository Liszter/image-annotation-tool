/*
 * @Author: liszter <liszter@qq.com>
 * @Date: 2023-10-17 10:37:43
 * @LastEditTime: 2023-10-17 10:51:44
 * @LastEditors: lishutao
 * @Description: 暂无
 * @FilePath: \image-annotation-tool\src\App.tsx
 */
import { HashRouter, Routes, Route } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Clock from "./pages/Clock/Clock";

import Markpage from "./pages/MarkPage/Markpage";

function App() {


  return (
    <HashRouter>
      <Routes>
        <Route path="/">
             <Route index element={<Home />} />
             <Route path="about" element={<About />} />
             <Route path="NotFound" element={<NotFound />} />
             <Route path="Clock" element={<Clock />} />
             <Route path="Markpage" element={<Markpage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App
