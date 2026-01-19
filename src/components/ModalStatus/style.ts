import styled from 'styled-components';

interface ContainerProps {
  $bgColor: string;
}

export const AlertContainer = styled.div<ContainerProps>`
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20000;
  display: flex;
  align-items: center;
  gap: 15px;
  width: 90%;
  max-width: 600px;
  padding: 16px 20px;
  padding-right: 50px;
  border-radius: 6px;
  background-color: ${props => props.$bgColor};  
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  opacity: 1;
  transition: opacity 0.3s ease-in-out;

  @media (max-width: 500px) {
    max-width: 75%;
  }
`;

export const IconImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  flex-shrink: 0;
`;

export const AlertText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  font-family: sans-serif;
  line-height: 1.4;
  font-weight: 400;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: rgba(0, 0, 0, 0.3);
  font-size: 28px;
  font-weight: 700;
  font-family: Arial, sans-serif;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: rgba(0, 0, 0, 0.7);
  }
  &:focus {
    outline: none;
  }
`;