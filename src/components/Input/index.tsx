import * as S from './style';

interface InputProps {
    label: string;
    placeholder: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    width?: string;
    margin?: string;
}

export const Input = ({label, placeholder, type, onChange, width, margin}: InputProps) => {
    return (
        <S.InputGroup margin={margin}>
            <S.Label>{label || 'Label'}</S.Label>
            <S.StyledInput 
                placeholder={placeholder || 'Placeholder'} 
                type={type || 'text'}
                onChange={onChange} 
                width={width}
            />
        </S.InputGroup>
    );
};