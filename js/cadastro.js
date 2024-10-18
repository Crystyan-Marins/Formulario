jQuery(function() {
    jQuery('input[name="idcpf"]').mask('000.000.000-00');
    jQuery('input[name="idcelular"]').mask('+55 (00) 00000-0000');
    jQuery('input[name="idtelefone"]').mask('+55 (00) 0000-0000')
    jQuery('input[name="idcep"]').mask('00.000-000')
});
function criarConta(event){
    const nome=document.querySelector('input[name="name"]').value;
    const cpf= document.querySelector('input[name="idcpf"]').value;
    const genero=document.getElementById('genero').value;
    const data_nascimento=document.querySelector('input[name="iddatenascimento"]').value;
    const nome_materno=document.querySelector('input[name="idmae"]').value;
    const celular= document.querySelector('input[name="idcelular"]').value;
    const telefone= document.querySelector('input[name="idtelefone"]').value;
    const email= document.querySelector('input[name="email"]').value;
    const endereco= document.querySelector('input[name="idendereco"]').value;
    const cep= document.querySelector('input[name="idcep"]').value;
    const numero= document.querySelector('input[name="idnumero"]').value;
    const complemento= document.querySelector('input[name="idcomplemento"]').value;
    const login= document.querySelector('input[name="idlogin"]').value;
    const senha= document.querySelector('input[name="password"]').value;
    const confirmacao=document.querySelector('input[name="confirm"]').value;
    if(!(nome && cpf && genero && data_nascimento && nome_materno && celular && telefone && email && endereco && cep && numero && login && senha && confirmacao)){
        event.preventDefault();
        alert("Os Campos Não Estão Preenchidos Adequadamente");
    }
    else{
        if(confirmacao==senha){
            localStorage.setItem("username",login);
            localStorage.setItem("senha",senha);
            event.preventDefault();
            window.location.href="login.html";
        }
        else{
            alert("Senhas Não Conferem");
        }
    }
}
//bloquear caracteres numéricos em campos como login,nome completo,senha e confirma senha
function verificaValor(event){
    const charCode = event.charCode || event.keyCode;
    // Verifica se o caractere é um número (0-9)
    if (charCode >= 48 && charCode <= 57) {
        event.preventDefault(); // Bloqueia o caractere
    }
}
function verificaNumerico(event){
    const charCode = event.charCode || event.keyCode;
    // Permite apenas números (0-9)
    if (charCode < 48 || charCode > 57) {
        event.preventDefault(); // Bloqueia o caractere
    }
}
document.getElementById('idcep').addEventListener('input', function() {
    const cep = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    // Verifica se o CEP tem 8 dígitos
    if (cep.length === 8) {
        buscarEndereco(cep);
    } 
});
function buscarEndereco(cep){
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado.");
                document.querySelector('input[name="idcep"]').value = "";
            } else {
                /*
                resultadoDiv.innerHTML = `
                    <strong>Endereço:</strong> ${data.logradouro}<br>
                    <strong>Bairro:</strong> ${data.bairro}<br>
                    <strong>Cidade:</strong> ${data.localidade}<br>
                    <strong>Estado:</strong> ${data.uf}
                `;
                */
                const enderecoCompleto = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
                document.querySelector('input[name="idendereco"]').value = enderecoCompleto;

            }
        })
        .catch(error => {
            alert("Erro ao buscar o endereço.")
        });
}
function bloquearDatasFuturas() {
    const hoje = new Date();
        hoje.setDate(hoje.getDate() - 1); // Subtrai um dia para obter a data de ontem
        const dia = String(hoje.getDate()).padStart(2, '0');
        const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Meses começam do zero
        const ano = hoje.getFullYear();
        const dataFormatada = `${ano}-${mes}-${dia}`;

        // Definir o valor máximo do input para a data de ontem
        document.getElementById('data').setAttribute('max', dataFormatada);
}

// Chamar a função ao carregar a página
window.onload = bloquearDatasFuturas;


