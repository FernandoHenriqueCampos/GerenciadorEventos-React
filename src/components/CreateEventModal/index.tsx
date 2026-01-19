import { useState, useCallback, useRef } from 'react'; 
import { AnimatePresence } from 'framer-motion';
import * as S from './style';
import api from '../../services/api'; 
import { AlertCard, type AlertVariant } from '../../components/ModalStatus';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; 
}

export const CreateEventModal = ({ isOpen, onClose, onSuccess }: CreateEventModalProps) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null); 

  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [imagem, setImagem] = useState('');

  const [alert, setAlert] = useState({ open: false, variant: 'info' as AlertVariant, text: '' });

  const showAlert = useCallback((variant: AlertVariant, text: string) => {
    setAlert({ open: true, variant, text });
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagem(reader.result as string); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateEvent = async () => {
    if (!nome || !data || !localizacao) {
      return showAlert('warning', "Por favor, preencha o nome, data e local do evento.");
    }

    try {
      setLoading(true);

      const payload = {
        nome,
        data, 
        localizacao,
        imagem: imagem || "https://umaimagem.com"
      };

      await api.post('/eventos', payload);
      
      showAlert('success', "Evento criado com sucesso! Redirecionando...");
      
      setTimeout(() => {
        onClose();
        onSuccess?.();
        setNome(''); setData(''); setLocalizacao(''); setImagem('');
      }, 1500);

    } catch (error: any) {
      const msg = error.response?.data?.message || "Não foi possível criar o evento no momento.";
      showAlert('error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <S.Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <S.ModalContainer
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <S.LeftSection>
              <S.ImagePreview 
                $hasImage={!!imagem} 
                style={{ backgroundImage: `url(${imagem})` }}
                onClick={() => fileInputRef.current?.click()} 
              >
                {!imagem && <S.PreviewLabel>Clique para subir imagem ou cole a URL abaixo</S.PreviewLabel>}

                <S.HiddenInput 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileUpload} 
                  accept="image/*" 
                />

                <S.UrlInput 
                   placeholder="Cole a URL da imagem aqui" 
                   value={imagem}
                   onClick={(e) => e.stopPropagation()} 
                   onChange={(e) => setImagem(e.target.value)}
                />
              </S.ImagePreview>
            </S.LeftSection>

            <S.RightSection>
              <S.TitleInput 
                placeholder="Nome do Evento" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              <S.InputBox>
                <S.LabelText>Quando será?</S.LabelText>
                <S.BaseInput type="date" value={data} onChange={(e) => setData(e.target.value)} />
              </S.InputBox>

              <S.InputBox>
                <S.LabelText>Onde será?</S.LabelText>
                <S.BaseInput 
                  type="text" 
                  placeholder="Local ou link da reunião" 
                  value={localizacao}
                  onChange={(e) => setLocalizacao(e.target.value)}
                />
              </S.InputBox>

              <S.Footer>
                <S.CreateBtn onClick={handleCreateEvent} disabled={loading}>
                  {loading ? "Processando..." : "Criar Evento"}
                </S.CreateBtn>
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