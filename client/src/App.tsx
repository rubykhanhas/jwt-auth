import {Route, Routes} from "react-router-dom";
import RequiredAuth from "./containers/RequiredAuth";
import usePrivate from "./hooks/usePrivate";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MyPosts from "./pages/MyPosts";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./views/Layout";

function App() {
  usePrivate();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="myposts"
          element={
            <RequiredAuth fallbackNavigate="/login">
              <MyPosts />
            </RequiredAuth>
          }
        />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
