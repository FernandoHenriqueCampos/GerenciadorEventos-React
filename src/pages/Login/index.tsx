import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as S from './style';
import IconEntrar from '../../assets/icons/entrar.png';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { authService } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AlertCard, type AlertVariant } from '../../components/ModalStatus';

export const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [gravarSenha, setGravarSenha] = useState(false)
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const { signIn } = useAuth();

    const [alertState, setAlertState] = useState<{
        open: boolean;
        variant: AlertVariant;
        text: string;
    }>({
        open: false,
        variant: 'info',
        text: ''
    });

    useEffect(() => {
        const savedEmail = localStorage.getItem('@EventManager:savedEmail');
        if (savedEmail) {
        setEmail(savedEmail);
        setGravarSenha(true);
        }
    }, []);

    const showAlert = useCallback((variant: AlertVariant, text: string) => {
        setAlertState({ open: true, variant, text });
    }, []);

    const handleLogin = async () => {
        if (!email || !senha) {
            return showAlert('warning', "Por favor, preencha todos os campos para acessar sua conta.");
        }

        try {
            setLoading(true);

            const data = await authService.login({ email, senha, gravarSenha });

            if (gravarSenha) {
                localStorage.setItem('@EventManager:savedEmail', email);
            } else {
                localStorage.removeItem('@EventManager:savedEmail');
            }

            signIn(data.token, { email }); 

            showAlert('success', "Acesso autorizado! Redirecionando...");

            setTimeout(() => {
                navigate('/home');
            }, 1200);

        } catch (error: any) {
            const status = error.response?.status;
            
            if (status === 401) {
                showAlert('error', "E-mail ou senha incorretos. Por favor, verifique seus dados.");
            } else if (status === 404) {
                showAlert('error', "Usuário não encontrado em nossa base de dados.");
            } else if (status === 403) {
                showAlert('error', "Sua conta está restrita. Entre em contato com o suporte.");
            } else {
                showAlert('error', "Ocorreu um erro no servidor. Tente novamente mais tarde.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        if (!nome || !email || !senha || !confirmarSenha) {
            return showAlert('warning', "Para criar sua conta, todos os campos são obrigatórios.");
        }

        if (senha !== confirmarSenha) {
            return showAlert('warning', "As senhas digitadas não coincidem.");
        }

        setLoading(true);
        try {
            const payload = { nome, email, senha, confirmarSenha };
            await authService.register(payload);
            
            showAlert('success', "Sua conta foi criada com sucesso! Agora você já pode entrar.");
            setIsLogin(true); 
            
        } catch (error: any) {
            showAlert('error', "Houve um problema ao processar seu cadastro. Verifique os dados ou tente outro e-mail.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <S.Container>
            <AnimatePresence mode="wait">
                {isLogin ? (
                    <motion.div
                        key="login"
                        initial={{ x: -900, opacity: 0 }} 
                        animate={{ x: 0, opacity: 1 }}    
                        exit={{ x: 900, opacity: 0 }}     
                        transition={{ duration: 0.5 }}
                    >
                        <S.ContainerLogin style={{transform: 'translatey(-10%)'}}>
                            <S.ContainerCircle>
                                <S.Icon src={IconEntrar} alt="Icone Entrar" />
                            </S.ContainerCircle>
                            <S.ContainerText>
                                <S.Text>Bem vindo</S.Text>
                                <S.SubText>Realize o login para gerenciar seus eventos.</S.SubText>
                            </S.ContainerText>
                        
                            <S.ContainerText>
                                <Input label="Email" placeholder="voce@email.com" type="email" onChange={(e) => setEmail(e.target.value)} margin="15px 0" />
                                <Input label="Senha" placeholder="********" type="password" onChange={(e) => setSenha(e.target.value)} margin="0 0 10px" />
                            </S.ContainerText>

                            <S.RememberMeContainer onClick={() => setGravarSenha(!gravarSenha)}>
                                <S.HiddenCheckbox 
                                    id="remember" 
                                    checked={gravarSenha} 
                                    onChange={(e) => setGravarSenha(e.target.checked)} 
                                />
                                <S.StyledCheckbox checked={gravarSenha} />
                                <S.RememberLabel htmlFor="remember">
                                    Lembrar e-mail
                                </S.RememberLabel>
                            </S.RememberMeContainer>

                            <S.ContainerText>
                                <Button title="Entrar" onClick={handleLogin} loading={loading}/>
                                <Button
                                    title="Não tenho conta? Cadastrar"
                                    backgroundColor="transparent"
                                    color="#afaeae"
                                    onClick={() => setIsLogin(false)}
                                />
                            </S.ContainerText>
                        </S.ContainerLogin>
                    </motion.div>
                ) : (
                    <motion.div
                        key="register"
                        initial={{ x: 900, opacity: 0 }} 
                        animate={{ x: 0, opacity: 1 }}   
                        exit={{ x: -900, opacity: 0 }}    
                        transition={{ duration: 0.5 }}
                    >
                        <S.ContainerLogin style={{transform: 'translatey(-10%)'}}> 
                            <S.ContainerCircle>
                                <S.Icon src={IconEntrar} alt="Icone Cadastro" />
                            </S.ContainerCircle>
                            <S.ContainerText>
                                <S.Text>Crie sua conta</S.Text>
                                <S.SubText>Cadastre-se para começar a criar eventos.</S.SubText>
                            </S.ContainerText>

                            <S.ContainerText>
                                <Input label="Nome" placeholder="Seu nome" type="text" onChange={(e) => setNome(e.target.value)} margin="15px 0" />
                                <Input label="Email" placeholder="voce@email.com" type="email" onChange={(e) => setEmail(e.target.value)} margin="0 0 10px" />
                                <Input label="Senha" placeholder="abc123456" type="password" onChange={(e) => setSenha(e.target.value)} margin="0 0 10px" />
                                <Input label="Confirmar Senha" placeholder="abc123456" type="password" onChange={(e) => setConfirmarSenha(e.target.value)} margin="0 0 10px" />
                            </S.ContainerText>

                            <S.ContainerText>
                                <Button title="Criar Conta"  onClick={handleRegister}/>
                                <Button
                                    title="Já tenho conta? Login"
                                    backgroundColor="transparent"
                                    color="#afaeae"
                                    onClick={() => setIsLogin(true)}
                                />
                            </S.ContainerText>
                        </S.ContainerLogin>
                    </motion.div>
                )}
            </AnimatePresence>
            {alertState.open && (
                <AlertCard
                variant={alertState.variant}
                text={alertState.text}
                onClose={() => setAlertState(prev => ({ ...prev, open: false }))}
                />
            )}
        </S.Container>
    );
};