import styled from "styled-components";
import { useState } from "react";

interface ModalProps {
  link: string;
  content: any;
}

const Modal = ({ link, content }: ModalProps) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <Container>
      <span onMouseOver={toggleModal} onMouseOut={toggleModal}>
        {link}
      </span>
      {showModal && <Tooltip>{content}</Tooltip>}
    </Container>
  );
};

const Container = styled.div`
  color: #d8beff;
  text-decoration: underline;
  text-underline-offset: 5px;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    color: #86f0d1;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  background-color: transparent;
  color: blue;
  border: 3px solid #86f0d1;
  width: 200px;
  height: 100px;
  font-family: BlexMono Nerd Font;
  font-size: 1rem;
  border-radius: 5px;
  z-index: 9999;
  margin-top: 10px;
  margin-left: 10px;
`;

export default Modal;
