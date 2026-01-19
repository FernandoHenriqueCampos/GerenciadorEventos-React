import styled from "styled-components";

interface StyledButtonProps {
  width?: string;
  margin?: string;
  variant?: 'primary' | 'outline'; 
  backgroundColor?: string;
  color?: string;
  border?: string;
}

export const ButtonContainer = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${props => props.backgroundColor || '#FFFFFF'};
  color: ${props => props.color || '#1E1A1E'};

  width: ${props => props.width || '100%'};
  margin: ${props => props.margin || '0'};
  padding: 12px 20px;
  border-radius: 12px; 
  border: ${props => props.border || 'none'};

  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(0.9); 
  }

  &:active {
    filter: brightness(0.8); 
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
    opacity: 0.5;
  }
`;