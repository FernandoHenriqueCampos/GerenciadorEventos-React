import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import * as S from './style';
import api from '../../services/api'; 
import { AlertCard, type AlertVariant } from '../../components/ModalStatus';

interface Evento {
  id: number;
  nome: string;
  data: string;
  localizacao: string;
}

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  evento: Evento | null;
  onUpdate: () => void;
}

export const EditEventModal = ({ isOpen, onClose, evento, onUpdate }: EditEventModalProps) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [alert, setAlert] = useState({ open: false, variant: 'info' as AlertVariant, text: '' });

    useEffect(() => {
        if (evento) {
            setData(evento.data);
            setLocalizacao(evento.localizacao);
        }
    }, [evento]);

    const showAlert = useCallback((variant: AlertVariant, text: string) => {
        setAlert({ open: true, variant, text });
    }, []);

    const handleUpdateEvent = async () => {
        if (!data || !localizacao) {
            return showAlert('warning', "Por favor, preencha a nova data e localização.");
        }

        try {
            setLoading(true);

        await api.put(`/eventos/${evento?.id}`, {
            ...evento,
            data,
            localizacao
        });
        
        showAlert('success', "Evento atualizado com sucesso!");
        
        setTimeout(() => {
            onUpdate();
            onClose();
        }, 1500);

        } catch (error: any) {
            const msg = error.response?.data?.message || "Erro ao atualizar evento.";
        showAlert('error', msg);
        } finally {
        setLoading(false);
        }
    };

    return (
        <AnimatePresence>
        {isOpen && (
            <S.Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
            <S.ModalContainer
                style={{ gridTemplateColumns: '1fr' }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <S.RightSection>
                    <S.TitleInput as="h2" style={{ fontSize: '24px' }}>
                        Editar: {evento?.nome}
                    </S.TitleInput>

                    <S.InputBox>
                        <label>Nova Data</label>
                        <input type="date" value={data} onChange={(e) => setData(e.target.value)} placeholder='dd/mm/aaaa'/>
                    </S.InputBox>

                    <S.InputBox>
                        <label>Nova Localização</label>
                        <input 
                        type="text" 
                        placeholder="Local ou link da reunião" 
                        value={localizacao}
                        onChange={(e) => setLocalizacao(e.target.value)}
                        />
                    </S.InputBox>

                    <S.Footer>
                        <button className="btn-create" onClick={handleUpdateEvent} disabled={loading}>
                        {loading ? "Salvando..." : "Salvar Alterações"}
                        </button>
                    </S.Footer>
                </S.RightSection>

                {alert.open && (
                <AlertCard 
                    variant={alert.variant} 
                    text={alert.text} 
                    onClose={() => setAlert(prev => ({ ...prev, open: false }))} 
                />
                )}
            </S.ModalContainer>
            </S.Overlay>
        )}
        </AnimatePresence>
    );
};