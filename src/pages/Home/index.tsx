import { useState, useEffect, useMemo } from 'react';
import * as S from './style';
import { Navbar } from '../../components/Navbar';
import api from '../../services/api';
import { IoCalendarClearOutline, IoAdd, IoLocationOutline, IoTrashOutline } from 'react-icons/io5';
import { CreateEventModal } from '../../components/CreateEventModal';
import { EditEventModal } from '../../components/EditEventModal';

interface Evento {
    id: number;
    nome: string;
    data: string; 
    localizacao: string;
    imagem: string;
}

export const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [filtro, setFiltro] = useState<'proximos' | 'passados'>('proximos');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<number | null>(null);

    const handleOpenDelete = (id: number) => {
        setEventToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteEvent = async () => {
        if (!eventToDelete) return;
        try {
            await api.delete(`/eventos/${eventToDelete}`);
            setIsDeleteModalOpen(false);
            fetchEventos(); 
        } catch (error) {
            console.error("Erro ao excluir evento");
        }
    };

    useEffect(() => {
        fetchEventos();
    }, []);

    const handleOpenEdit = (evento: Evento) => {
        setSelectedEvento(evento);
        setIsEditModalOpen(true);
    };

    const fetchEventos = async () => {
        try {
        const response = await api.get('/eventos');
        setEventos(response.data);
        } catch (error) {
        console.error("Não foi possível carregar os eventos.");
        }
    };

    const eventosFiltrados = useMemo(() => {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        return eventos.filter(evento => {
            const dataEvento = new Date(evento.data);

            const matchesDate = filtro === 'proximos' ? dataEvento >= hoje : dataEvento < hoje;

            const matchesSearch = 
                evento.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                evento.localizacao.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesDate && matchesSearch;
        }).sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
    }, [eventos, filtro, searchTerm]);

    return (
        <S.Container>
            <Navbar onSearch={(text) => setSearchTerm(text)} />
            <S.Content>
                <S.Header>
                    <S.Title>Eventos</S.Title>
                    <S.FilterGroup>
                        <S.FilterBtn 
                            active={filtro === 'proximos'} 
                            onClick={() => setFiltro('proximos')}
                        >
                            Próximos
                        </S.FilterBtn>
                        <S.FilterBtn 
                            active={filtro === 'passados'} 
                            onClick={() => setFiltro('passados')}
                        >
                            Passado
                        </S.FilterBtn>
                    </S.FilterGroup>
                </S.Header>

                {eventosFiltrados.length > 0 ? (
                    <S.Timeline>
                        {eventosFiltrados.map(evento => (
                            <S.EventRow key={evento.id}>
                                <S.DateInfo>
                                    <S.DateDay>
                                        {new Date(evento.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', timeZone: 'UTC' })}
                                    </S.DateDay>
                                    <S.DateWeekday>
                                        {new Date(evento.data).toLocaleDateString('pt-BR', { weekday: 'long', timeZone: 'UTC' })}
                                    </S.DateWeekday>
                                </S.DateInfo>
                                
                                <S.EventCard>
                                    <S.CardContent>
                                        <S.EventTime>00:00</S.EventTime>
                                        <S.EventName>{evento.nome}</S.EventName>
                                        <S.LocationRow>
                                            <IoLocationOutline size={18} />
                                            <S.LocationText>{evento.localizacao || 'Localização Ausente'}</S.LocationText>
                                        </S.LocationRow>
                                        <S.ActionGroup>
                                            <S.ManageBtn onClick={() => handleOpenEdit(evento)}>
                                                Gerenciar Evento
                                            </S.ManageBtn>
                                            <S.DeleteBtn onClick={() => handleOpenDelete(evento.id)}>
                                                <IoTrashOutline size={18} /> Excluir Evento
                                            </S.DeleteBtn>
                                        </S.ActionGroup>
                                    </S.CardContent>
                                    <S.EventImage src={evento.imagem} />
                                </S.EventCard>
                            </S.EventRow>
                        ))}
                    </S.Timeline>
                ) : (
                    <S.EmptyState>
                        <S.IconBox>
                            <IoCalendarClearOutline size={80} />
                            <S.Badge>0</S.Badge>
                        </S.IconBox>

                        <S.EmptyTitle>Nenhum Evento {filtro === 'proximos' ? 'Futuro' : 'Passado'}</S.EmptyTitle>
                        <S.EmptyDescription>Você não tem eventos {filtro === 'proximos' ? 'futuros' : 'passados'}. Que tal organizar um?</S.EmptyDescription>
                        
                        <S.EmptyCreateBtn onClick={() => setIsModalOpen(true)}>
                            <IoAdd /> Criar Evento
                        </S.EmptyCreateBtn>
                    </S.EmptyState>
                )}
            </S.Content>

            <CreateEventModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSuccess={() => { 
                    setIsModalOpen(false); 
                    fetchEventos(); 
                }}
            />
            
            <EditEventModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                evento={selectedEvento} 
                onUpdate={fetchEventos} 
            />

            {isDeleteModalOpen && (
                <S.DeleteOverlay>
                    <S.DeleteModalContent>
                        <S.DeleteTitle>Excluir Evento?</S.DeleteTitle>
                        <S.DeleteDescription>Esta ação não pode ser desfeita. Deseja continuar?</S.DeleteDescription>
                        <S.ModalActions>
                            <S.ModalBtn variant="cancel" onClick={() => setIsDeleteModalOpen(false)}>Cancelar</S.ModalBtn>
                            <S.ModalBtn variant="confirm" onClick={handleDeleteEvent}>Excluir</S.ModalBtn>
                        </S.ModalActions>
                    </S.DeleteModalContent>
                </S.DeleteOverlay>
            )}
        </S.Container>
    );
};