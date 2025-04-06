// Função para selecionar elementos por classe ou ID
function getElementBySelector<T extends HTMLElement>(selector: string): T {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Elemento com o seletor ${selector} não encontrado.`);
    }
    return element as T;
}

// Selecionar elementos
const loginForm = getElementBySelector<HTMLDivElement>('.login');
const cadastroForm = getElementBySelector<HTMLDivElement>('.cadastro');
const btnLoginLog = getElementBySelector<HTMLButtonElement>('#btn-login-log');
const btnLoginCad = getElementBySelector<HTMLButtonElement>('#btn-login-cad');
const btnCadastroLog = getElementBySelector<HTMLButtonElement>('#btn-cadastro-log');
const btnCadastroCad = getElementBySelector<HTMLButtonElement>('#btn-cadastro-cad');

// Função para alternar entre Login e Cadastro
function toggleForms(showLogin: boolean) {
    if (showLogin) {
        loginForm.style.display = 'flex';
        cadastroForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        cadastroForm.style.display = 'flex';
    }
}

// Inicializar na tela de login
loginForm.classList.add('active');

// Event listeners para alternar entre as telas
btnLoginLog.addEventListener('click', () => toggleForms(true));
btnLoginCad.addEventListener('click', () => toggleForms(false));
btnCadastroLog.addEventListener('click', () => toggleForms(true));
btnCadastroCad.addEventListener('click', () => toggleForms(false));

// Inicializar na tela de login
toggleForms(true);

// Função para alternar o modo dark em todos os elementos relevantes
function toggleDarkMode() {
    document.body.classList.toggle('dark');
    document.querySelector('.painel')?.classList.toggle('dark');

    // Aplicar a classe 'dark' para todos os inputs
    document.querySelectorAll('input').forEach(input => {
        input.classList.toggle('dark');
    });

    // Garantir que o tema escuro se aplique tanto ao login quanto ao cadastro
    document.querySelectorAll('.login, .cadastro').forEach(form => {
        form.classList.toggle('dark');
    });

    // Garantir que o tema escuro se aplique tanto ao login quanto ao cadastro
    document.querySelectorAll('.navegar').forEach(form => {
        form.classList.toggle('dark');
    });
}

// Alternância de tema claro/escuro ao clicar no checkbox
document.getElementById('check')?.addEventListener('change', toggleDarkMode);

const cep = document.getElementById('cep') as HTMLInputElement;
const cid = document.getElementById("cidade") as HTMLInputElement;
const bairro = document.getElementById("bairro") as HTMLInputElement;
const rua = document.getElementById("rua") as HTMLInputElement;

cep?.addEventListener("blur", (e) => {
    let Cep = cep.value;
    let procurar = cep.value.replace("-", ""); // Corrigido para remover o traço
    fetch(`https://viacep.com.br/ws/${procurar}/json/`).then((Response) =>
        Response.json().then(data => {
            console.log(data);
            cid.value = data.localidade;
            bairro.value = data.bairro;
            rua.value = data.logradouro;
        })
    );
});

// Função para salvar os dados do formulário
function saveCadastroData() {
    // Obtém os valores dos campos
    const nome = (document.getElementById('nome') as HTMLInputElement).value;
    const email = (document.getElementById('email-cadastro') as HTMLInputElement).value;
    const cep = (document.getElementById('cep') as HTMLInputElement).value;
    const cidade = (document.getElementById('cidade') as HTMLInputElement).value;
    const bairro = (document.getElementById('bairro') as HTMLInputElement).value;
    const rua = (document.getElementById('rua') as HTMLInputElement).value;
    const senha = (document.getElementById('password-cadastro') as HTMLInputElement).value;

    // Cria um objeto com os dados do formulário
    const cadastroData = {
        nome: nome,
        email: email,
        cep: cep,
        cidade: cidade,
        bairro: bairro,
        rua: rua,
        senha: senha
    };

    // Salva os dados no localStorage
    localStorage.setItem('cadastroData', JSON.stringify(cadastroData));
}

// Seleciona o botão de cadastrar
const botaoCadastrar = document.getElementById('botao-cadastrar') as HTMLButtonElement;

// Adiciona o manipulador de eventos para o botão de cadastrar
botaoCadastrar.addEventListener('click', (event) => {
    event.preventDefault(); // Impede o envio do formulário
    saveCadastroData(); // Salva os dados
    alert('Dados cadastrados com sucesso!'); // Exibe uma mensagem de sucesso
});

// Função para preencher os dados do formulário
function populateCadastroForm() {
    const cadastroData = localStorage.getItem('cadastroData');

    if (cadastroData) {
        const data = JSON.parse(cadastroData);

        // Preenche os campos do formulário com os dados salvos
        (document.getElementById('nome') as HTMLInputElement).value = data.nome;
        (document.getElementById('email-cadastro') as HTMLInputElement).value = data.email;
        (document.getElementById('cep') as HTMLInputElement).value = data.cep;
        (document.getElementById('password-cadastro') as HTMLInputElement).value = data.senha;
    }
}

// Chama a função para preencher os dados ao carregar a página
populateCadastroForm();

// Função para verificar o login
function verifyLogin() {
    // Obtém os valores dos campos de login
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const senha = (document.getElementById('password') as HTMLInputElement).value;

    // Obtém os dados armazenados
    const cadastroData = localStorage.getItem('cadastroData');

    if (cadastroData) {
        const data = JSON.parse(cadastroData);

        // Verifica se os dados inseridos correspondem aos dados armazenados
        if (email === data.email && senha === data.senha) {
            alert('Conectado com sucesso!');
        } else {
            alert('Email ou senha incorretos!');
        }
    } else {
        alert('Nenhum dado de cadastro encontrado!');
    }
}

// Seleciona o botão de login
const botaoLogin = document.getElementById('botao-entrar') as HTMLButtonElement;

// Adiciona o manipulador de eventos para o botão de login
botaoLogin.addEventListener('click', (event) => {
    event.preventDefault(); // Impede o envio do formulário
    verifyLogin(); // Verifica o login
});
