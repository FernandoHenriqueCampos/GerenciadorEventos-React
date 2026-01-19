# EventManager – Interface Administrativa Web

Dashboard administrativo desenvolvido em React para o controle centralizado de eventos. A plataforma oferece uma interface rica, responsiva e com alta fidelidade visual, permitindo que administradores gerenciem o ecossistema de eventos com segurança e eficiência através de navegadores modernos.

---

## Visão Geral

A aplicação fornece:

- Dashboard completo para monitoramento e gestão de eventos
- Sistema de autenticação com suporte a persistência de sessão (Remember Me)
- Interface reativa com atualizações de estado em tempo real
- Fluxos de CRUD (Create, Read, Update, Delete) através de componentes modais
- Sistema de feedback visual baseado em alertas temporizados e animações de transição

---

## Estrutura Técnica

- **Framework:** React.js (Vite / CRA)
- **Linguagem:** TypeScript
- **Estilização:** Styled Components (CSS-in-JS)
- **Animações:** Framer Motion (Transições de rotas e modais)
- **Comunicação:** Axios com interceptação de Token JWT
- **Gerenciamento de Estado:** Context API (Autenticação e Sessão)

---

## Segurança e Gestão de Ambiente

- **Injeção de Token:** Utilização de interceptors do Axios para injetar automaticamente o header `Authorization: Bearer <TOKEN>` em todas as requisições para a API.
- **LocalStorage:** O sistema gerencia a persistência do token de acesso e a preferência do usuário (e-mail salvo) diretamente no armazenamento local do navegador.
- **Variáveis de Ambiente:** Centralização de endpoints sensíveis em arquivos `.env`, isolando a URL da API da lógica de negócio.

---

## Variáveis de Ambiente

Arquivo `.env`:

```env
REACT_APP_API_URL=http://localhost:8081
```
