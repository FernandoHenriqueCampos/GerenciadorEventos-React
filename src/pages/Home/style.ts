import styled from 'styled-components';

export const Container = styled.div`
    width: 100%; 
    min-height: 100vh;
    background-color: #0a0a0a; 
    color: #fff;
    display: flex; 
    flex-direction: column;
    overflow-x: hidden;
`;

export const Content = styled.main`
    max-width: 60vw; 
    width: 100%; 
    margin: 0 auto; 
    padding: 40px 20px;

    @media (max-width: 768px) {
        max-width: 90vw;
        padding: 20px 15px; 
    }
`;

export const Header = styled.div`
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-bottom: 50px;

    @media (max-width: 768px) {
        flex-direction: column; 
        align-items: flex-start;
        gap: 20px;
        margin-bottom: 30px;
    }
`;

export const Title = styled.h1` 
    font-size: 32px; 
    font-weight: bold; 
`;

export const FilterGroup = styled.div`
    background: #1a1a1a; 
    padding: 4px; 
    border-radius: 12px; 
    display: flex;
`;

export const FilterBtn = styled.button<{ active: boolean }>`
    padding: 8px 16px; 
    border-radius: 8px; 
    border: none; 
    font-size: 14px;
    background: ${props => props.active ? '#333' : 'transparent'};
    color: ${props => props.active ? '#fff' : '#888'};
    cursor: pointer; 
    transition: 0.2s;
`;

export const Timeline = styled.div` 
    display: flex; 
    flex-direction: column; 
    gap: 30px; 
`;

export const EventRow = styled.div`
    display: flex; 
    gap: 40px; 
    position: relative;

    @media (max-width: 768px) {
        flex-direction: column; 
        gap: 12px;
    }
`;

export const DateInfo = styled.div`
    min-width: 120px; 
    display: flex; 
    flex-direction: column;

    @media (max-width: 768px) {
        flex-direction: row; 
        align-items: baseline;
        gap: 8px;
    }
`;

export const DateDay = styled.span`
    font-weight: bold; 
    font-size: 18px; 

    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

export const DateWeekday = styled.span`
    color: #666; 
    text-transform: lowercase; 

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

export const EventCard = styled.div`
    flex: 1; 
    max-width: 81%;
    background: rgba(255,255,255,0.05); 
    border: 1px solid #333; 
    border-radius: 20px;
    padding: 24px; 
    display: flex; 
    justify-content: space-between;
    transition: border-color 0.3s;
    
    &:hover { border-color: #444; }

    @media (max-width: 1480px) { max-width: 75%; }
    @media (max-width: 1024px) { max-width: 65%; }

    @media (max-width: 768px) {
        max-width: 100%;
        min-width: 100%;
    }

    @media (max-width: 480px) {
        padding: 16px;
        flex-direction: column-reverse; 
    }
`;

export const CardContent = styled.div`
    display: flex; 
    flex-direction: column; 
`;

export const EventTime = styled.span`
    color: #888; 
    font-size: 14px; 
`;

export const EventName = styled.h3`
    font-size: 22px; 
    margin: 5px 0 0 0;
`;

export const LocationRow = styled.div`
    display: flex;
    align-items: center;
    color: #E5C072; 
    font-size: 1rem; 
    font-weight: 600;
    margin: 10px 0 5px;
    svg { flex-shrink: 0; }
`;

export const LocationText = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 4px;
`;

export const ActionGroup = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 15px;
    flex-wrap: wrap;
`;

export const ManageBtn = styled.button`
    background: #222; 
    color: #fff; 
    border: none; 
    padding: 8px 16px; 
    border-radius: 8px; 
    cursor: pointer;
    font-weight: 500;
    &:hover { background: #333; }
`;

export const DeleteBtn = styled.button`
    background: rgba(255, 70, 70, 0.1);
    color: #ff4646;
    border: 1px solid rgba(255, 70, 70, 0.2);
    padding: 8px 16px; 
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        background: #ff4646;
        color: #fff;
    }
`;

export const EventImage = styled.img`
    width: 120px; 
    height: 120px; 
    border-radius: 12px; 
    object-fit: cover;

    @media (max-width: 480px) {
        width: 100%; 
        height: 160px;
        margin-bottom: 15px;
    }
`;

export const EmptyState = styled.div`
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center;
    margin-top: 80px; 
    text-align: center;
`;

export const IconBox = styled.div`
    position: relative; 
    color: #333; 
    margin-bottom: 20px;
`;

export const Badge = styled.span`
    position: absolute; 
    top: 0; 
    right: -5px; 
    background: #444; 
    padding: 2px 8px; 
    border-radius: 10px; 
    color: #000; 
    font-weight: bold; 
    font-size: 12px;
`;

export const EmptyTitle = styled.h2`
    font-size: 24px; 
    margin-bottom: 8px; 
`;

export const EmptyDescription = styled.p`
    color: #666; 
    margin-bottom: 24px; 
`;

export const EmptyCreateBtn = styled.button`
    background: #1a1a1a; 
    color: #fff; 
    border: 1px solid #333; 
    padding: 12px 24px;
    border-radius: 12px; 
    display: flex; 
    align-items: center; 
    gap: 8px; 
    cursor: pointer;
    &:hover { background: #222; }
`;

export const DeleteOverlay = styled.div`
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.8);
    display: flex; align-items: center; justify-content: center;
    z-index: 2000;
`;

export const DeleteModalContent = styled.div`
    background: #1a1a1a;
    padding: 30px;
    border-radius: 20px;
    border: 1px solid #333;
    width: 90%;
    max-width: 400px;
    text-align: center;
`;

export const DeleteTitle = styled.h3` 
    color: #fff; 
    margin-bottom: 10px; 
`;

export const DeleteDescription = styled.p` 
    color: #888; 
    margin-bottom: 25px; 
`;

export const ModalActions = styled.div`
    display: flex;
    gap: 12px;
`;

export const ModalBtn = styled.button<{ variant: 'cancel' | 'confirm' }>`
    flex: 1;
    padding: 12px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    background: ${props => props.variant === 'confirm' ? '#ff4646' : '#333'};
    color: #fff;
    transition: filter 0.2s;
    &:hover { filter: brightness(1.2); }
`;