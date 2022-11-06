import { Container, Image, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import brandImage from "../assets/icon/brand.svg";
import { GlobalButton } from "./atoms/GlobalButton";

import { useContext, useState } from "react";
import { LoginContext } from "../contexts/LoginContext";
import NavProfile from "./atoms/NavProfile";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";

export const Navigation = () => {
  const navigate = useNavigate();

  const { isLogin, setIsLogin } = useContext(LoginContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <Navbar style={{ backgroundColor: "#FFC700" }} >
        <Container fluid className="d-flex justify-content-between mx-5">
          <Link to="/">
            <Image src={brandImage}></Image>
          </Link>
          <div className="d-flex gap-3">
            {!isLogin ? (
              <>
                <GlobalButton style={{ width: 100, backgroundColor: "#433434" }} name="Register" onClick={() => setShowRegister(true)} />
                <GlobalButton
                  style={{ width: 100, backgroundColor: "#433434" }}
                  name="Login"
                  onClick={() => {
                    setShowLogin(true);
                  }}
                  bgColor="#433434"
                />
              </>
            ) : (
              <NavProfile setIsLogin={setIsLogin} role={localStorage.role} />
            )}
          </div>
        </Container>
      </Navbar>
      <Login show={showLogin} setShow={setShowLogin} isLogin={isLogin} setIsLogin={setIsLogin} setShowRegister={setShowRegister} />
      <Register show={showRegister} setShow={setShowRegister} setShowLogin={setShowLogin} />
    </>
  );
};
