import styled from 'styled-components';

export const Container = styled.nav`
    max-width: 100vw;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
`;

export const Text = styled.span`
    color: #f8fafc; 
    font-size: 1.1rem;
    font-weight: 700; 
    letter-spacing: -0.5px;
    white-space: nowrap; 

    @media (max-width: 768px) {
        display: none;
    }
`;

export const MenuButton = styled.button`
    display: none;
    background: transparent;
    border: none;
    color: #f8fafc;
    font-size: 24px;
    cursor: pointer;
    padding: 5px 10px 5px;

    @media (max-width: 768px) {
        display: block;
    }
`;

export const LeftSection = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
`;

export const NavLinks = styled.div<{ isOpen?: boolean }>`
    display: flex;
    align-items: center;
    gap: 32px;
    margin-left: 40px;

    @media (max-width: 768px) {
        display: ${props => props.isOpen ? 'flex' : 'none'};
        flex-direction: column;
        position: absolute;
        top: 45px;
        left: 0;
        border: 1px solid #334155;
        background-color: rgba(0, 0, 0, 0.8);
        border-radius: 8px;
        padding: 8px;
        min-width: 180px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
        z-index: 100;
        margin-left: 0;
        gap: 0; 
    }
`;

export const NavItem = styled.div<{ active?: boolean }>`
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${props => props.active ? '#f8fafc' : '#94a3b8'};
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    @media (max-width: 768px) {
        width: 100%;
        padding: 10px 12px;
        border-radius: 4px;
        color: #f8fafc;

        &:hover {
            background: #334155;
        }
    }

    &:hover {
        color: #f8fafc;
    }
    svg { font-size: 18px; }
`;

export const RightSection = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    @media (max-width: 480px) {
        ${() => TimeText} {
            display: none;
        }
    }
`;

export const TimeText = styled.span`
    color: #94a3b8;
    font-size: 14px;
`;

export const CreateButton = styled.button`
    background: transparent;
    color: #f8fafc;
    border: 1px solid #334155;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #1e293b;
        border-color: #475569;
    }

    @media (max-width: 768px) {
        padding: 8px 12px;
    }
`;

export const ButtonIcon = styled.span`
    display: none;
    font-size: 18px;
    font-weight: bold;

    @media (max-width: 768px){
        display: block;
    }
`;

export const ButtonText = styled.span`
    @media (max-width: 768px) {
        display: none;
    }
`;

export const IconButton = styled.button`
    background: transparent;
    border: none;
    color: #94a3b8;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
        color: #f8fafc;
    }
`;

export const Avatar = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid #334155;
`;

export const ProfileContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

export const DropdownMenu = styled.div`
    position: absolute;
    top: 45px;
    right: 0;
    background-color: transparent;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 8px;
    min-width: 150px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
    z-index: 100;
    display: flex;
    flex-direction: column;

    &:hover {
        background: #334155;
    }
`;

export const DropdownItem = styled.button`
    background: transparent;
    border: none;
    color: #f8fafc;
    padding: 10px 12px;
    text-align: left;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: background 0.2s;

    svg {
        font-size: 16px;
        color: #ef4444; 
    }
`;

export const MobileMenuContainer = styled.div`
    position: relative;
    display: flex;

    @media (max-width: 768px) {
        display: flex;
        align-items: center;
    }
`;

export const SearchWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

export const SearchDropdown = styled.div`
    position: absolute;
    top: 45px;
    right: 0;
    width: 300px;
    z-index: 9999;
    padding: 10px;
    border-radius: 12px;
    animation: slideIn 0.2s ease-out;

    @keyframes slideIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 480px) {
        width: 250px;
        position: fixed;
        top: 60px;
        right: 16px;
    }
`;

export const SearchInputContainer = styled.div`
    display: flex;
    align-items: center;
    background: #0d1117;
    height: 40px;
    border-radius: 8px;
    padding: 0 10px;
    border: 1px solid #30363d;
`;

export const SearchInput = styled.input`
    flex: 1;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 14px;
    margin-left: 8px;
    outline: none;

    &::placeholder {
        color: #484f58;
    }
`;

export const CloseSearch = styled.button`
    background: transparent;
    border: none;
    color: #888;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 50%;
    transition: all 0.2s;

    &:hover {
        color: #f8fafc;
        background-color: rgba(255, 255, 255, 0.1);
    }

    svg {
        display: block;
    }
`;