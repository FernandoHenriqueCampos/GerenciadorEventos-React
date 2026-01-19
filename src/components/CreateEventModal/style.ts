import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Overlay = styled(motion.div)`
  position: fixed; 
  top: 0; left: 0; 
  width: 100vw; height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex; 
  align-items: center; 
  justify-content: center;
  z-index: 999;
  padding: 20px;
`;

export const ModalContainer = styled(motion.div)`
  background: #000;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  border-radius: 24px;
  display: grid; 
  grid-template-columns: 1fr 1.2fr;
  overflow-y: auto;
  border: 1px solid #333;
  overflow-x: hidden;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    max-width: 85vw;
  }
`;

export const LeftSection = styled.div`
  padding: 24px; 
  background: #0a0a0a;
  display: flex; 
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 16px;
    height: 250px;
  }
`;

export const ImagePreview = styled.div<{ $hasImage: boolean }>`
  width: 100%; 
  height: 100%; 
  border-radius: 16px;
  background-color: #1a1a1a;
  background-size: cover; 
  background-position: center;
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center;
  border: 2px dashed ${props => props.$hasImage ? 'transparent' : '#333'};
  color: #666;
  cursor: pointer;
  text-align: center;
  padding: 10px;
`;

export const PreviewLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const UrlInput = styled.input`
  margin-top: 15px; 
  width: 85%; 
  background: #222; 
  border: none;
  padding: 10px; 
  border-radius: 8px; 
  color: #fff; 
  font-size: 12px;
  outline: none;
  &:focus { border: 1px solid #444; }
`;

export const RightSection = styled.div`
  padding: 40px; 
  display: flex; 
  flex-direction: column; 
  gap: 24px;

  @media (max-width: 768px) {
    padding: 20px;
    gap: 16px;
  }
`;

export const TitleInput = styled.input`
  background: transparent; 
  border: none; 
  color: #fff;
  font-size: 32px; 
  font-weight: bold; 
  outline: none;
  &::placeholder { color: #333; }

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const InputBox = styled.div`
  background: #111; 
  padding: 12px 16px; 
  border-radius: 12px;
  display: flex; 
  flex-direction: column; 
  gap: 4px; 
  border: 1px solid #222;
`;

export const LabelText = styled.label`
  color: #666; 
  font-size: 12px; 
  font-weight: 500; 
`;

export const BaseInput = styled.input`
  background: transparent; 
  border: none; 
  color: #fff; 
  font-size: 16px; 
  outline: none; 
  &::-webkit-calendar-picker-indicator {
    filter: invert(1); 
  }
`;

export const Footer = styled.div`
  margin-top: auto;
`;

export const CreateBtn = styled.button`
  width: 100%; 
  padding: 16px; 
  border-radius: 12px; 
  border: none;
  background: #fff; 
  color: #000; 
  font-weight: bold; 
  cursor: pointer;
  transition: 0.2s;
  
  &:hover { background: #e0e0e0; }
  &:disabled { 
    opacity: 0.5; 
    cursor: not-allowed;
  }
`;