import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    background-color: #1E1A1E;
    justify-content: center;
    align-items: center;
    height: 100vh; 
    width: 100vw;
    overflow: hidden; 
`;

export const ContainerLogin = styled.div`
    background-color: #262324;
    border: 1px solid #3A393D;
    border-radius: 15px;
    transform: translateY(-20%);
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 42vh;
    width: 18vw;
    padding: 10px;

    @media (max-width: 1439px) {
        width: 30vw;
    }

    @media (max-width: 768px) {
        width: 85vw;
        transform: translateY(-10%);
        min-height: auto; 
        padding: 20px 10px;
    }
`

export const Icon = styled.img`
    width: 30px;
    height: 30px;
    transform: translateX(-10%);
`

export const ContainerCircle = styled.div`
    border-radius: 50%;
    background-color: #373435;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-start;
    margin: 15px 0 10px 15px;

    @media (max-width: 768px) {
        margin: 5px 0 10px 10px;
    }
`

export const Text = styled.p`
    font-size: 1.4rem;
    font-weight: 600;
    color: #FFFFFF;
    margin: 0;

    @media (max-width: 480px) {
        font-size: 1.2rem;
    }
`

export const SubText = styled.p`
    margin: 0;
    font-size: 0.95rem;
    font-weight: 400;
    color: #afaeaeff;

    @media (max-width: 480px) {
        font-size: 0.85rem;
    }
`

export const ContainerText = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    margin-left: 15px;
    gap: 5px;
    width: 93.5%;

    @media (max-width: 768px) {
        width: 90%;
        margin-left: 10px;
    }
`

export const RememberMeContainer = styled.div`
    display: flex;
    align-items: center; 
    justify-content: flex-start; 
    width: 100%; 
    padding-left: 5px; 
    margin: 5px 0px 15px 25px;
    cursor: pointer;
    user-select: none;
    gap: 5px;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

export const StyledCheckbox = styled.div<{ checked: boolean }>`
    width: 18px;
    height: 18px;
    background: ${props => (props.checked ? '#007AFF' : 'transparent')};
    border: 2px solid ${props => (props.checked ? '#007AFF' : '#3A393D')};
    border-radius: 4px;
    transition: all 150ms;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
        content: '✓';
        display: ${props => (props.checked ? 'block' : 'none')};
        color: #1E1A1E;
        font-size: 12px;
        font-weight: bold;
    }
`;

export const RememberLabel = styled.label`
    color: #afaeae;
    font-size: 0.9rem;
    cursor: pointer;
`;