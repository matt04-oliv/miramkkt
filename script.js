// Aguarda o DOM estar pronto para executar TUDO
document.addEventListener('DOMContentLoaded', () => {

    // Ativa os ícones Lucide
    try {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        } else {
            console.error("Lucide icons não carregado.");
        }
    } catch (e) {
        console.error("Erro ao iniciar Lucide icons:", e);
    }

    // Lógica do Menu Mobile
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) { // Adiciona verificação para evitar erros se os elementos não existirem
        const menuIcon = menuBtn.querySelector('i'); // Pega o ícone dentro do botão

        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Alterna o ícone
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.setAttribute('data-lucide', 'menu');
            } else {
                menuIcon.setAttribute('data-lucide', 'x');
            }
            
            // Recria o ícone Lucide após a troca
            if (typeof lucide !== 'undefined') {
                lucide.createIcons(); 
            }
        });

        // Fecha o menu mobile ao clicar em um link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.setAttribute('data-lucide', 'menu');
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            });
        });
    }
    
    // Lógica do Header com sombra no scroll
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('shadow-lg', 'shadow-mira-red/20');
            } else {
                header.classList.remove('shadow-lg', 'shadow-mira-red/20');
            }
        });
    }

    // Configuração do ScrollReveal
    try {
        if (typeof ScrollReveal !== 'undefined') {
            const sr = ScrollReveal({
                distance: '50px',
                duration: 800,
                easing: 'cubic-bezier(0.5, 0, 0, 1)',
                reset: false, // Anima apenas uma vez
                mobile: true,
            });

            // Aplica a animação aos elementos com as classes
            const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-right');
            
            revealElements.forEach(el => {
                sr.reveal(el, {
                    // Adicionamos 'beforeReveal' para forçar o estado inicial correto
                    // antes do ScrollReveal aplicar a transição.
                    beforeReveal: (domEl) => {
                        domEl.style.opacity = '1';
                        if (domEl.classList.contains('reveal-fade-up')) {
                            domEl.style.transform = 'translateY(0)';
                        }
                        if (domEl.classList.contains('reveal-fade-right')) {
                            domEl.style.transform = 'translateX(0)';
                        }
                    }
                });
            });
        } else {
            console.error("ScrollReveal não carregado.");
        }
    } catch (e) {
        console.error("Erro ao iniciar ScrollReveal:", e);
    }
});

