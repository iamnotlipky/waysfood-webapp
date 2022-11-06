import AOS from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect, useState } from "react";
import { Card, Image } from "react-bootstrap";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { LoginContext } from "../contexts/LoginContext";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";

export const NearRestaurantList = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const { data: partner, refetch } = useQuery("nearRestaurentCache", async () => {
    const response = await API.get("/users?role=partner");
    console.log(response.data.data);
    return response.data.data;
  });

  // animation & re-fetch
  useEffect(() => {
    refetch();
    AOS.init();
  }, []);
  return (
    <>
      {partner?.map((item) => {
        return (
          <Card
            key={item.id}
            className="w-25 shadow-sm d-flex align-items-center border-0"
            style={{ height: "221px", cursor: "pointer" }}
            onClick={() => {
              !isLogin ? setShowLoginModal(true) : navigate(`/menu/list/${item.fullName}/${item.id}`);
            }}
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <Card.Header className="border-0">
              <Image src={item.image} className="bg-primary "></Image>
            </Card.Header>
            <Card.Body className="align-self-start">
              <h1 className="fs-6">{item.fullName}</h1>
              <p>{"0,2 km"}</p>
            </Card.Body>
          </Card>
        );
      })}
      <Login show={showLoginModal} setShow={setShowLoginModal} isLogin={isLogin} setIsLogin={setIsLogin} setShowRegister={setShowRegisterModal} />
      <Register show={showRegisterModal} setShow={setShowRegisterModal} setShowLogin={setShowLoginModal} />
    </>
  );
};
