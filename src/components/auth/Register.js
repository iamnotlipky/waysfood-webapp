import { useState } from "react";
import { Alert, Container, Form, Modal } from "react-bootstrap";
import { API } from "../../config/api";
import { GlobalButton } from "../atoms/GlobalButton";
import { GlobalInput } from "../atoms/GlobalInput";

export const Register = ({ show, setShow, setShowLogin }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [registResponse, setRegistResponse] = useState(null);
  const [regisMessage, setRegisMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [regisData, setRegisData] = useState({
    email: "",
    password: "",
    fullname: "",
    gender: "",
    phone: "",
    role: "",
  });

  const registerHandler = async () => {
    try {
      setIsLoading(true);
      const response = await API.post("/register", regisData);
      setRegistResponse(response.data);
      setShow(false);
      setShowLogin(true);
      setIsLoading(false);
      setRegisData({
        ...regisData,
        email: "",
        password: "",
        fullname: "",
        gender: "",
        phone: "",
        role: "",
      });
      setRegisMessage("");
    } catch (error) {
      setRegisMessage(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="d-flex flex-column justify-content-center align-items-center">
        <Container className="d-flex flex-column gap-4 justify-content-center align-items-center p-4">
          <h2 className="text-warning align-self-start">Register</h2>
          {regisMessage != "" && <Alert variant={regisMessage != "" && "danger"}>{regisMessage != "" && regisMessage}</Alert>}
          <Form className="w-100 d-flex flex-column gap-3">
            <div>
              <GlobalInput
                label="Email"
                type="email"
                placeholder="email"
                name="email"
                value={regisData.email}
                onChange={(e) => {
                  setRegisData({
                    ...regisData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <GlobalInput
                label="Password"
                type="password"
                placeholder="password"
                name="password"
                value={regisData.password}
                onChange={(e) => {
                  setRegisData({
                    ...regisData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <GlobalInput
                label="Full Name"
                type="text"
                placeholder="text"
                name="fullname"
                value={regisData.fullname}
                onChange={(e) => {
                  setRegisData({
                    ...regisData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <Form.Select
                aria-label="Default select example"
                name="gender"
                value={regisData.gender}
                onChange={(e) => {
                  setRegisData({
                    ...regisData,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                <option>Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Select>
              <GlobalInput
                label="Phone"
                type="number"
                placeholder="phone"
                className="mt-3"
                name="phone"
                value={regisData.phone}
                onChange={(e) => {
                  setRegisData({
                    ...regisData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <Form.Select
                aria-label="Default select example"
                name="role"
                value={regisData.role}
                onChange={(e) => {
                  setRegisData({
                    ...regisData,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                <option>Role</option>
                <option value="user">As User</option>
                <option value="partner">As Partner</option>
              </Form.Select>
            </div>
            <GlobalButton
              name="Register"
              bgColor="#433434"
              isLoading={isLoading}
              onClick={() => {
                registerHandler();
              }}
            />
          </Form>
          <p className="text-muted">
            Already have an account ? Click{" "}
            <span
              style={{ cursor: "pointer" }}
              className="text-dark fw-bold cursor-pointer"
              onClick={() => {
                setShow(false);
                setShowLogin(true);
              }}
              clasName="text-primary"
            >
              Here
            </span>
          </p>
        </Container>
      </Modal>
      {/* WHY ? :'))) */}
      {/* <Login show={showLogin} setShow={setShowLogin} /> */}
    </>
  );
};
