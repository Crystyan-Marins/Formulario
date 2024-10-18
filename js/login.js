let toastBox=document.getElementById('toastBox');
function showSnackBar(){
    let toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = '<i class="fa-solid fa-xmark"></i>Login ou Senha Incorretos';
    toast.classList.add('error'); // Adiciona a classe de erro
    toastBox.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('error'); // Remova a classe de erro se quiser
        toast.remove();
    }, 5000); // Mantém a toast por 5 segundos
}
function entrar(event){
    const login= document.querySelector('input[name="login"]').value;
    const senha= document.querySelector('input[name="password"]').value;
    
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('senha');
    
    if(!(login && senha)){
        alert("Os Campos Não Estão Preenchidos Adequadamente");
    }
    else{
        if(login == storedUsername && senha==storedPassword){
            event.preventDefault();
            window.location.href="home.html";
        }
        else{
            event.preventDefault();
            showSnackBar();
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
function acessarCadastro(event){
    event.preventDefault();
    window.location.href='cadastro.html';
}