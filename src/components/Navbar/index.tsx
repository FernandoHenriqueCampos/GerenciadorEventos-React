import { IoSearchOutline, IoNotificationsOutline, IoLogOutOutline, IoMenuOutline, IoCloseOutline, IoAdd } from 'react-icons/io5';
import { HiOutlineTicket } from 'react-icons/hi2';
import * as S from './style';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import { CreateEventModal } from '../CreateEventModal';

export const Navbar = ({ onSearch }: { onSearch?: (text: string) => void }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const { signOut, user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  }));

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (onSearch) onSearch(text);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      }));
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <S.Container>
      <S.LeftSection>
        <S.Logo>
          <S.Text>Event Manager</S.Text>
        </S.Logo>

        <S.MobileMenuContainer>
          <S.MenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
          </S.MenuButton>

          <S.NavLinks isOpen={isMobileMenuOpen} onMouseLeave={() => setIsMobileMenuOpen(false)}>
            <S.NavItem active onClick={() => setIsMobileMenuOpen(false)}>
              <HiOutlineTicket /> Eventos
            </S.NavItem>
          </S.NavLinks>
        </S.MobileMenuContainer>
      </S.LeftSection>

      <S.RightSection>
        <S.TimeText>{currentTime}</S.TimeText>
        
        <S.CreateButton onClick={() => setIsModalOpen(true)}>
            <S.ButtonIcon><IoAdd /></S.ButtonIcon>
            <S.ButtonText>Criar Evento</S.ButtonText>
        </S.CreateButton>
        
        <S.SearchWrapper ref={searchRef}>
          <S.IconButton onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <IoSearchOutline />
          </S.IconButton>

          {isSearchOpen && (
            <S.SearchDropdown>
              <S.SearchInputContainer>
                <IoSearchOutline color="#888" size={18} />
                <S.SearchInput 
                  placeholder="Filtrar por nome..." 
                  autoFocus
                  value={searchText}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                {searchText.length > 0 && (
                  <S.CloseSearch onClick={() => handleSearch('')}>
                    <IoCloseOutline size={20} />
                  </S.CloseSearch>
                )}
              </S.SearchInputContainer>
            </S.SearchDropdown>
          )}
        </S.SearchWrapper>
        
        <S.NotificationWrapper ref={notificationRef}>
          <S.IconButton onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}>
            <IoNotificationsOutline />
            <S.NotificationBadge />
          </S.IconButton>

          {isNotificationsOpen && (
            <S.NotificationDropdown>
              <S.NotificationHeader>
                <S.TitleNotifications>Notificações</S.TitleNotifications>
                <S.ClearButton onClick={() => setIsNotificationsOpen(false)}>
                  Limpar
                </S.ClearButton>
              </S.NotificationHeader>
              
              <S.NotificationContent>
                <IoNotificationsOutline size={40} color="#30363d" />
                <S.EmptyStateTitle>Tudo limpo por aqui!</S.EmptyStateTitle>
                <S.EmptyStateSubText>
                  Você não tem novas notificações no momento.
                </S.EmptyStateSubText>
              </S.NotificationContent>
            </S.NotificationDropdown>
          )}
        </S.NotificationWrapper>

        <S.ProfileContainer>
          <S.Avatar 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'Felix'}`} 
            alt="User Profile" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />

          {isDropdownOpen && (
            <S.DropdownMenu onMouseLeave={() => setIsDropdownOpen(false)}>
              <S.DropdownItem onClick={signOut}>
                <IoLogOutOutline />
                Sair
              </S.DropdownItem>
            </S.DropdownMenu>
          )}
        </S.ProfileContainer>
      </S.RightSection>
      <CreateEventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </S.Container>
  );
};