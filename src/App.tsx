/*
 * @Author: liszter <liszter@qq.com>
 * @Date: 2023-08-29 10:48:37
 * @LastEditTime: 2023-09-01 09:08:32
 * @LastEditors: lishutao
 * @Description: 暂无
 * @FilePath: \electron-vite-project\src\App.tsx
 */
import { HashRouter, Routes, Route } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Clock from "./pages/Clock/Clock"


function App() {


  return (
    <HashRouter>
      <Routes>
        <Route path="/">
             <Route index element={<Home />} />
             <Route path="about" element={<About />} />
             <Route path="NotFound" element={<NotFound />} />
             <Route path="Clock" element={<Clock />} />

        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App
