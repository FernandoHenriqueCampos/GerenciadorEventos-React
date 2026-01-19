import * as S from './style';

interface ButtonProps {
  title: string;
  width?: string;
  margin?: string;
  loading?: boolean;
  backgroundColor?: string;
  color?: string;
  border?: string;
  onClick?: () => void;
}

export const Button = ({ title, width, margin, loading, backgroundColor, border, color, onClick, ...rest }: ButtonProps) => {
  return (
    <S.ButtonContainer 
      width={width} 
      margin={margin} 
      disabled={loading} 
      backgroundColor={backgroundColor}
      color={color}
      border={border}
      onClick={onClick}
      {...rest}
    >
      {loading ? 'Carregando...' : title}
    </S.ButtonContainer>
  );
};