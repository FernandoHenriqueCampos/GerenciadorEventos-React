import styled from "styled-components";

interface StyledProps {
  margin?: string;
  width?: string;
}

export const InputGroup = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  margin-bottom: 15px;
  margin: ${props => props.margin || '0'};
`;

export const Label = styled.label`
  color: #E1E1E1; 
  font-size: 1rem;
  font-weight: bold;
  text-align: left;
`;

export const StyledInput = styled.input<StyledProps>`
  background-color: #211F1F;
  border: 1px solid #3A393D; 
  border-radius: 8px;
  padding: 10px 15px;
  width: ${props => props.width || '15vw'};
  color: #FFFFFF;
  font-size: 16px;
  outline: none;
  width: 100%;

  &::placeholder {
    color: #666666; 
  }

  &:focus {
    border-color: #504E52; 
  }
`;