import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { X } from "lucide-react";

// ✨ Smooth fade-out animation
const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-10px); }
`;

const MessageBar = styled.div`
//   background: linear-gradient(90deg, #3498db, #5dade2);
  color: #ffffff;
  text-align: center;
  font-weight: 600;
  font-size: 0.5rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  padding: 12px 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);

  &.fade-out {
    animation: ${fadeOut} 0.4s ease forwards;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 40px;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 8px 36px;
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  cursor: pointer;
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  backdrop-filter: blur(4px);

  &:hover {
    background: rgba(255, 255, 255, 0.35);
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 480px) {
    right: 10px;
    padding: 5px;
  }
`;

const HeaderMessage = () => {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const isHidden = localStorage.getItem("hideMessageBar");
    if (isHidden === "true") setVisible(false);
  }, []);

  const handleClose = () => {
    setFade(true);
    setTimeout(() => {
      setVisible(false);
      localStorage.setItem("hideMessageBar", "true");
    }, 400); // Wait for fade-out animation
  };

  if (!visible) return null;

  return (
    <MessageBar className={fade ? "fade-out" : ""}>
        You’re exploring the Beta Build. You may experience some experimental features.
      <CloseButton onClick={handleClose} aria-label="Close message">
        <X size={18} />
      </CloseButton>
    </MessageBar>
  );
};

export default HeaderMessage;
