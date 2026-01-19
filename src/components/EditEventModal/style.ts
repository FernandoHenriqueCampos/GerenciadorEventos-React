import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Overlay = styled(motion.div)`
    position: fixed; 
    top: 0; 
    left: 0; 
    width: 100vw; 
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    display: flex; 
    align-items: center; 
    justify-content: center;
    z-index: 1000;
    padding: 0px;
`;

export const ModalContainer = styled(motion.div)`
    background: #000;
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    border: 1px solid #333;
    position: relative;

    @media (max-width: 768px) {
        max-width: 80vw; 
        border-radius: 20px;
    }
`;

export const RightSection = styled.div`
    padding: 40px; 
    display: flex; 
    flex-direction: column; 
    gap: 24px;

    @media (max-width: 768px) {
        padding: 24px;
        gap: 20px;
    }
`;

export const TitleInput = styled.h2`
    color: #fff;
    font-size: 24px; 
    font-weight: bold; 
    margin-bottom: 8px;
    border-bottom: 1px solid #222;
    padding-bottom: 15px;

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

export const InputBox = styled.div`
    background: #111; 
    padding: 12px 16px; 
    border-radius: 12px;
    display: flex; 
    flex-direction: column; 
    gap: 6px; 
    border: 1px solid #222;
    transition: border-color 0.2s;

    &:focus-within {
        border-color: #444;
    }

    label { 
        color: #666; 
        font-size: 12px; 
        font-weight: 500; 
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    input { 
        background: transparent; 
        border: none; 
        color: #fff; 
        font-size: 16px; 
        outline: none;
        width: 100%;

        &::-webkit-calendar-picker-indicator {
        filter: invert(1); 
        cursor: pointer;
        }
    }
`;

export const Footer = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .btn-create {
        width: 100%; 
        padding: 16px; 
        border-radius: 12px; 
        border: none;
        background: #fff; 
        color: #000; 
        font-weight: bold; 
        font-size: 16px;
        cursor: pointer;
        transition: transform 0.1s, background 0.2s;

        &:hover { background: #e0e0e0; }
        &:active { transform: scale(0.98); }
        &:disabled { opacity: 0.5; cursor: not-allowed; }
    }

    .btn-cancel {
        background: transparent;
        color: #666;
        border: none;
        font-size: 14px;
        cursor: pointer;
        padding: 8px;
        &:hover { color: #fff; }
    }
`;