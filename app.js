// Xperience Hubs Application JavaScript

// Application state
let currentUser = null;
let cart = [];
let userNFTs = [];

// Application data
const applicationData = {
  "company": {
    "name": "Xperience Hubs",
    "tagline": "Explore nossa 'IA do empreendedor' e avalie o seu negócio",
    "description": "Descubra como valorizar sua empresa e encantar seus clientes de forma rápida e GRATUITA"
  },
  "plans": [
    {
      "id": "start",
      "name": "Start",
      "price": 1500,
      "duration": "3 meses",
      "sessions": "4 sessões: 1 sessão x 2h, 3 sessões x 1h",
      "frequency": "1 sessão/mês",
      "modules": ["MÓDULO 1", "MÓDULO 2"],
      "benefits": ["Mentoria individual", "Acompanhamento personalizado", "Suporte dedicado"],
      "featured": false
    },
    {
      "id": "essencial",
      "name": "Essencial",
      "price": 3000,
      "duration": "3 meses",
      "sessions": "6 sessões: 1 sessão x 2h, 5 sessões x 1h",
      "frequency": "1 sessão/15 dias",
      "modules": ["MÓDULO 1", "MÓDULO 2", "MÓDULO 3"],
      "benefits": ["Mentoria individual", "Acompanhamento personalizado", "Suporte dedicado"],
      "featured": false
    },
    {
      "id": "principal",
      "name": "Principal",
      "price": 6000,
      "duration": "3 meses",
      "sessions": "9 sessões: 1 sessão x 3h, 8 sessões x 1,5h",
      "frequency": "1 sessão/semana",
      "modules": ["MÓDULO 1", "MÓDULO 2", "MÓDULO 3", "MÓDULO 4", "MÓDULO 5"],
      "benefits": ["Mentoria individual", "Acompanhamento personalizado", "Suporte dedicado", "Relatório Xperience", "Mapa do Negócio"],
      "featured": true,
      "badge": "RECOMENDADO"
    },
    {
      "id": "avancada",
      "name": "Avançada",
      "price": 10000,
      "duration": "6 meses",
      "sessions": "25 sessões: 1 sessão x 3h, 24 sessões x 1,5h",
      "frequency": "1 sessão/15 dias",
      "modules": ["MÓDULO 1", "MÓDULO 2", "MÓDULO 3", "MÓDULO 4", "MÓDULO 5"],
      "benefits": ["Mentoria individual", "Acompanhamento personalizado", "Suporte premium", "Relatório Xperience", "Mapa do Negócio", "Relatório SEO"],
      "featured": false
    },
    {
      "id": "premium",
      "name": "Premium",
      "price": 30000,
      "duration": "12 meses",
      "sessions": "Sessões a combinar",
      "frequency": "A combinar",
      "modules": ["MÓDULO 1", "MÓDULO 2", "MÓDULO 3", "MÓDULO 4", "MÓDULO 5", "MÓDULO 6"],
      "benefits": ["Mentoria individual", "Consultoria ilimitada", "Suporte premium", "Todos os relatórios", "Acesso VIP à comunidade", "Desenvolvimento completo"],
      "featured": false
    }
  ]
};

// DOM Elements
const elements = {
  mobileMenu: document.querySelector('.mobile-menu'),
  mobileMenuBtn: document.querySelector('.header__mobile-menu'),
  mobileMenuClose: document.querySelector('.mobile-menu__close'),
  cartBtns: document.querySelectorAll('.cart-btn'),
  cartCounts: document.querySelectorAll('.cart-count'),
  authBtns: document.querySelectorAll('.auth-btn'),
  planBtns: document.querySelectorAll('.plan-card__cta'),
  modals: document.querySelectorAll('.modal'),
  modalCloses: document.querySelectorAll('.modal__close'),
  notification: document.getElementById('notification'),
  navLinks: document.querySelectorAll('.nav-link'),
  heroCtaBtn: document.querySelector('.hero__cta'),
  solutionCtaBtns: document.querySelectorAll('.solution-card__cta'),
  communityCtaBtn: document.querySelector('.community__cta'),
  iaInput: document.querySelector('.ia-chat__input input'),
  iaSendBtn: document.querySelector('.ia-chat__input button'),
  iaMessages: document.querySelector('.ia-chat__messages'),
  contactForm: document.querySelector('.contact .form')
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  loadCartFromStorage();
  setupEventListeners();
  setupScrollToTop();
  setupSmoothScrolling();
  initializeIA();
});

// Initialize application
function initializeApp() {
  console.log('Xperience Hubs Application Initialized');
  updateCartDisplay();
  updateAuthDisplay();
}

// Load cart from localStorage
function loadCartFromStorage() {
  const savedCart = localStorage.getItem('xperience-cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartDisplay();
  }
}

// Save cart to localStorage
function saveCartToStorage() {
  localStorage.setItem('xperience-cart', JSON.stringify(cart));
}

// Setup event listeners
function setupEventListeners() {
  // Mobile menu
  if (elements.mobileMenuBtn) {
    elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
  if (elements.mobileMenuClose) {
    elements.mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  // Cart buttons
  elements.cartBtns.forEach(btn => {
    btn.addEventListener('click', openCartModal);
  });

  // Auth buttons
  elements.authBtns.forEach(btn => {
    btn.addEventListener('click', handleAuthClick);
  });

  // Plan buttons
  elements.planBtns.forEach(btn => {
    btn.addEventListener('click', handlePlanSelection);
  });

  // Modal closes
  elements.modalCloses.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  // Navigation links
  elements.navLinks.forEach(link => {
    link.addEventListener('click', handleNavigation);
  });

  // Hero CTA
  if (elements.heroCtaBtn) {
    elements.heroCtaBtn.addEventListener('click', startIAChat);
  }

  // Solution CTA buttons
  elements.solutionCtaBtns.forEach(btn => {
    btn.addEventListener('click', handleSolutionCTA);
  });

  // Community CTA
  if (elements.communityCtaBtn) {
    elements.communityCtaBtn.addEventListener('click', openCommunityModal);
  }

  // IA Chat
  if (elements.iaSendBtn) {
    elements.iaSendBtn.addEventListener('click', sendIAMessage);
  }
  if (elements.iaInput) {
    elements.iaInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendIAMessage();
      }
    });
  }

  // Contact form
  if (elements.contactForm) {
    elements.contactForm.addEventListener('submit', handleContactSubmit);
  }

  // Auth providers
  setupAuthProviders();

  // Cart actions
  setupCartActions();

  // Checkout actions
  setupCheckoutActions();

  // Community actions
  setupCommunityActions();

  // Close modals on background click
  elements.modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

// Mobile menu functions
function toggleMobileMenu() {
  elements.mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
  elements.mobileMenu.classList.remove('active');
}

// Modal functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

function closeModal() {
  elements.modals.forEach(modal => {
    modal.classList.remove('active');
  });
}

// Navigation
function handleNavigation(e) {
  e.preventDefault();
  const target = e.target.getAttribute('href');
  if (target && target.startsWith('#')) {
    const section = document.querySelector(target);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      closeMobileMenu();
    }
  }
}

// Auth functions
function handleAuthClick() {
  openModal('authModal');
}

function setupAuthProviders() {
  const providers = document.querySelectorAll('.auth__provider');
  providers.forEach(provider => {
    provider.addEventListener('click', function() {
      const providerName = this.dataset.provider;
      simulateAuth(providerName);
    });
  });
}

function simulateAuth(provider) {
  showNotification('Autenticando...', 'info');
  
  setTimeout(() => {
    currentUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Usuário ${provider}`,
      email: `usuario@${provider}.com`,
      provider: provider,
      avatar: `https://via.placeholder.com/40?text=${provider.charAt(0).toUpperCase()}`
    };
    
    updateAuthDisplay();
    closeModal();
    showNotification(`Bem-vindo, ${currentUser.name}!`, 'success');
  }, 1500);
}

function updateAuthDisplay() {
  elements.authBtns.forEach(btn => {
    if (currentUser) {
      btn.textContent = currentUser.name;
      btn.onclick = logout;
    } else {
      btn.textContent = 'Login';
      btn.onclick = handleAuthClick;
    }
  });
}

function logout() {
  currentUser = null;
  userNFTs = [];
  updateAuthDisplay();
  showNotification('Logout realizado com sucesso!', 'success');
}

// Plan selection
function handlePlanSelection(e) {
  const planId = e.target.dataset.plan;
  const plan = applicationData.plans.find(p => p.id === planId);
  
  if (plan) {
    addToCart(plan);
  }
}

function addToCart(plan) {
  const existingItem = cart.find(item => item.id === plan.id);
  
  if (existingItem) {
    showNotification('Este plano já está no seu carrinho!', 'info');
    return;
  }
  
  cart.push({
    id: plan.id,
    name: plan.name,
    price: plan.price,
    duration: plan.duration,
    type: 'plan'
  });
  
  saveCartToStorage();
  updateCartDisplay();
  showNotification(`${plan.name} adicionado ao carrinho!`, 'success');
}

function updateCartDisplay() {
  const itemCount = cart.length;
  elements.cartCounts.forEach(count => {
    count.textContent = itemCount;
  });
}

// Cart modal
function openCartModal() {
  updateCartModal();
  openModal('cartModal');
}

function updateCartModal() {
  const cartItems = document.querySelector('.cart__items');
  const cartTotal = document.querySelector('.cart__total-amount');
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="cart__empty">Seu carrinho está vazio</div>';
    cartTotal.textContent = '0';
    return;
  }
  
  let total = 0;
  cartItems.innerHTML = '';
  
  cart.forEach(item => {
    total += item.price;
    const itemElement = document.createElement('div');
    itemElement.className = 'cart__item';
    itemElement.innerHTML = `
      <div class="cart__item-info">
        <h4>${item.name}</h4>
        <p>${item.duration}</p>
      </div>
      <div class="cart__item-price">R$ ${item.price.toLocaleString()}</div>
      <button class="cart__item-remove" onclick="removeFromCart('${item.id}')">&times;</button>
    `;
    cartItems.appendChild(itemElement);
  });
  
  cartTotal.textContent = total.toLocaleString();
}

function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  saveCartToStorage();
  updateCartDisplay();
  updateCartModal();
  showNotification('Item removido do carrinho!', 'success');
}

function setupCartActions() {
  const checkoutBtn = document.querySelector('.cart__checkout');
  const clearBtn = document.querySelector('.cart__clear');
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', proceedToCheckout);
  }
  
  if (clearBtn) {
    clearBtn.addEventListener('click', clearCart);
  }
}

function proceedToCheckout() {
  if (cart.length === 0) {
    showNotification('Seu carrinho está vazio!', 'error');
    return;
  }
  
  if (!currentUser) {
    showNotification('Faça login para continuar!', 'error');
    closeModal();
    openModal('authModal');
    return;
  }
  
  closeModal();
  openCheckoutModal();
}

function clearCart() {
  cart = [];
  saveCartToStorage();
  updateCartDisplay();
  updateCartModal();
  showNotification('Carrinho limpo!', 'success');
}

// Checkout modal
function openCheckoutModal() {
  updateCheckoutModal();
  openModal('checkoutModal');
}

function updateCheckoutModal() {
  const checkoutItems = document.querySelector('.checkout__items');
  const checkoutTotal = document.querySelector('.checkout__total-amount');
  
  let total = 0;
  checkoutItems.innerHTML = '';
  
  cart.forEach(item => {
    total += item.price;
    const itemElement = document.createElement('div');
    itemElement.className = 'checkout__item';
    itemElement.innerHTML = `
      <span>${item.name}</span>
      <span>R$ ${item.price.toLocaleString()}</span>
    `;
    checkoutItems.appendChild(itemElement);
  });
  
  checkoutTotal.textContent = total.toLocaleString();
}

function setupCheckoutActions() {
  const generatePixBtn = document.querySelector('.pix__generate');
  
  if (generatePixBtn) {
    generatePixBtn.addEventListener('click', generatePixCode);
  }
}

function generatePixCode() {
  const qrContainer = document.querySelector('.pix__qr-code');
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  
  showNotification('Gerando código PIX...', 'info');
  
  setTimeout(() => {
    // Generate QR code (simulation)
    qrContainer.innerHTML = `
      <div class="pix__qr-image">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <rect width="200" height="200" fill="white"/>
          <rect x="10" y="10" width="20" height="20" fill="black"/>
          <rect x="40" y="10" width="20" height="20" fill="black"/>
          <rect x="70" y="10" width="20" height="20" fill="black"/>
          <rect x="130" y="10" width="20" height="20" fill="black"/>
          <rect x="160" y="10" width="20" height="20" fill="black"/>
          <rect x="10" y="40" width="20" height="20" fill="black"/>
          <rect x="100" y="40" width="20" height="20" fill="black"/>
          <rect x="190" y="40" width="20" height="20" fill="black"/>
          <rect x="40" y="70" width="20" height="20" fill="black"/>
          <rect x="70" y="70" width="20" height="20" fill="black"/>
          <rect x="130" y="70" width="20" height="20" fill="black"/>
          <rect x="10" y="100" width="20" height="20" fill="black"/>
          <rect x="40" y="100" width="20" height="20" fill="black"/>
          <rect x="100" y="100" width="20" height="20" fill="black"/>
          <rect x="160" y="100" width="20" height="20" fill="black"/>
          <rect x="70" y="130" width="20" height="20" fill="black"/>
          <rect x="130" y="130" width="20" height="20" fill="black"/>
          <rect x="190" y="130" width="20" height="20" fill="black"/>
          <rect x="10" y="160" width="20" height="20" fill="black"/>
          <rect x="100" y="160" width="20" height="20" fill="black"/>
          <rect x="160" y="160" width="20" height="20" fill="black"/>
          <rect x="40" y="190" width="20" height="20" fill="black"/>
          <rect x="70" y="190" width="20" height="20" fill="black"/>
          <rect x="130" y="190" width="20" height="20" fill="black"/>
        </svg>
      </div>
      <p style="margin-top: 16px; text-align: center;">
        <strong>Valor: R$ ${total.toLocaleString()}</strong><br>
        <small>Escaneie com seu app de banco</small>
      </p>
    `;
    
    showNotification('Código PIX gerado! Efetue o pagamento.', 'success');
    
    // Simulate payment confirmation after 10 seconds
    setTimeout(() => {
      confirmPayment();
    }, 10000);
  }, 2000);
}

function confirmPayment() {
  showNotification('Pagamento confirmado! Processando NFT...', 'success');
  
  setTimeout(() => {
    mintNFT();
  }, 3000);
}

function mintNFT() {
  cart.forEach(item => {
    const nft = {
      id: Math.random().toString(36).substr(2, 9),
      planId: item.id,
      planName: item.name,
      mintDate: new Date().toISOString(),
      owner: currentUser.id,
      metadata: {
        name: `Xperience ${item.name} NFT`,
        description: `NFT de acesso ao plano ${item.name}`,
        attributes: [
          { trait_type: 'Plan', value: item.name },
          { trait_type: 'Duration', value: item.duration },
          { trait_type: 'Price', value: item.price }
        ]
      }
    };
    
    userNFTs.push(nft);
  });
  
  // Clear cart after successful purchase
  cart = [];
  saveCartToStorage();
  updateCartDisplay();
  
  closeModal();
  showNotification('NFT criado com sucesso! Você agora tem acesso à comunidade.', 'success');
}

// Community modal
function openCommunityModal() {
  if (!currentUser) {
    showNotification('Faça login para acessar a comunidade!', 'error');
    openModal('authModal');
    return;
  }
  
  checkCommunityAccess();
  openModal('communityModal');
}

function checkCommunityAccess() {
  const resultContainer = document.querySelector('.community__access-result');
  
  if (userNFTs.length === 0) {
    resultContainer.className = 'community__access-result error';
    resultContainer.innerHTML = `
      <h4>Acesso Negado</h4>
      <p>Você precisa ter um plano ativo para acessar a comunidade.</p>
      <p>Adquira um plano e receba seu NFT de acesso!</p>
    `;
  } else {
    resultContainer.className = 'community__access-result success';
    resultContainer.innerHTML = `
      <h4>Acesso Liberado!</h4>
      <p>Bem-vindo à comunidade Xperience Hubs!</p>
      <div class="community__content-access">
        <h4>Seus NFTs:</h4>
        <ul>
          ${userNFTs.map(nft => `<li>${nft.metadata.name}</li>`).join('')}
        </ul>
        <h4>Conteúdo disponível:</h4>
        <ul>
          <li>Fórum de discussão</li>
          <li>Biblioteca de recursos</li>
          <li>Webinars exclusivos</li>
          <li>Networking com outros empreendedores</li>
          <li>Suporte prioritário</li>
        </ul>
      </div>
    `;
  }
}

function setupCommunityActions() {
  // Community actions will be set up here
}

// IA Chat functionality
function initializeIA() {
  // Initialize IA chat state
  window.iaState = {
    currentStep: 0,
    userResponses: [],
    questions: [
      "Qual é o seu ramo de atuação?",
      "Há quanto tempo você atua neste mercado?",
      "Qual é o seu principal desafio no negócio?",
      "Quantos clientes você atende por mês?",
      "Como você divulga seu negócio atualmente?"
    ],
    responses: [
      "Perfeito! Vou analisar seu setor.",
      "Entendo. Experiência é fundamental.",
      "Esse é um desafio comum. Vamos trabalhar nisso.",
      "Ótimo! Isso me dá uma base do seu volume.",
      "Interessante! Vou avaliar suas estratégias."
    ],
    finalMessage: "Análise concluída! Baseado nas suas respostas, identifiquei várias oportunidades de crescimento. Nossos planos de mentoria podem te ajudar a alcançar seus objetivos. Quer conhecer as soluções personalizadas?"
  };
}

function startIAChat() {
  const iaSection = document.querySelector('.ia-chat');
  iaSection.scrollIntoView({ behavior: 'smooth' });
  
  // Focus on input
  setTimeout(() => {
    if (elements.iaInput) {
      elements.iaInput.focus();
    }
  }, 500);
}

function sendIAMessage() {
  if (!elements.iaInput || !elements.iaMessages) return;
  
  const message = elements.iaInput.value.trim();
  if (!message) return;
  
  // Add user message
  addIAMessage(message, 'user');
  elements.iaInput.value = '';
  
  // Store user response
  window.iaState.userResponses.push(message);
  
  // Simulate typing
  setTimeout(() => {
    if (window.iaState.currentStep < window.iaState.questions.length) {
      const response = window.iaState.responses[window.iaState.currentStep];
      addIAMessage(response, 'ia');
      
      window.iaState.currentStep++;
      
      // Ask next question or conclude
      setTimeout(() => {
        if (window.iaState.currentStep < window.iaState.questions.length) {
          const nextQuestion = window.iaState.questions[window.iaState.currentStep];
          addIAMessage(nextQuestion, 'ia');
        } else {
          // Conclude analysis
          setTimeout(() => {
            addIAMessage(window.iaState.finalMessage, 'ia');
            
            // Add CTA buttons
            setTimeout(() => {
              const ctaElement = document.createElement('div');
              ctaElement.className = 'ia-message ia-cta';
              ctaElement.innerHTML = `
                <div style="display: flex; gap: 8px; margin-top: 12px;">
                  <button class="btn btn--primary btn--sm" onclick="scrollToPlans()">Ver Planos</button>
                  <button class="btn btn--outline btn--sm" onclick="restartIA()">Nova Análise</button>
                </div>
              `;
              elements.iaMessages.appendChild(ctaElement);
              elements.iaMessages.scrollTop = elements.iaMessages.scrollHeight;
            }, 1000);
          }, 2000);
        }
      }, 1000);
    }
  }, 1500);
}

function addIAMessage(message, type) {
  const messageElement = document.createElement('div');
  messageElement.className = `ia-message ${type === 'user' ? 'user-message' : ''}`;
  messageElement.innerHTML = `<p>${message}</p>`;
  
  if (type === 'user') {
    messageElement.style.background = 'var(--color-primary)';
    messageElement.style.color = 'var(--color-btn-primary-text)';
    messageElement.style.marginLeft = '20%';
  }
  
  elements.iaMessages.appendChild(messageElement);
  elements.iaMessages.scrollTop = elements.iaMessages.scrollHeight;
}

function scrollToPlans() {
  const plansSection = document.getElementById('plans');
  if (plansSection) {
    plansSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function restartIA() {
  window.iaState.currentStep = 0;
  window.iaState.userResponses = [];
  elements.iaMessages.innerHTML = `
    <div class="ia-message">
      <p>Olá! Sou a IA do Empreendedor. Vou ajudar você a avaliar seu negócio em poucos minutos.</p>
    </div>
    <div class="ia-message">
      <p>Para começar, me conte: qual é o seu ramo de atuação?</p>
    </div>
  `;
}

// Solution CTA handling
function handleSolutionCTA(e) {
  const button = e.target;
  const solutionCard = button.closest('.solution-card');
  const solutionTitle = solutionCard.querySelector('h3').textContent;
  
  if (solutionTitle === 'IA do Empreendedor') {
    startIAChat();
  } else {
    showNotification(`Funcionalidade "${solutionTitle}" disponível nos planos pagos!`, 'info');
    setTimeout(() => {
      scrollToPlans();
    }, 2000);
  }
}

// Contact form handling
function handleContactSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  
  showNotification('Enviando mensagem...', 'info');
  
  setTimeout(() => {
    showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
    e.target.reset();
  }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = elements.notification;
  const messageElement = notification.querySelector('.notification__message');
  
  messageElement.textContent = message;
  notification.className = `notification notification--${type} active`;
  
  setTimeout(() => {
    notification.classList.remove('active');
  }, 5000);
}

// Setup notification close
if (elements.notification) {
  const closeBtn = elements.notification.querySelector('.notification__close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      elements.notification.classList.remove('active');
    });
  }
}

// Scroll to top functionality
function setupScrollToTop() {
  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.innerHTML = '↑';
  scrollBtn.title = 'Voltar ao topo';
  document.body.appendChild(scrollBtn);
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
}

// Smooth scrolling for all internal links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Expose functions to global scope for onclick handlers
window.removeFromCart = removeFromCart;
window.scrollToPlans = scrollToPlans;
window.restartIA = restartIA;

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    console.log('Page hidden');
  } else {
    console.log('Page visible');
  }
});

// Error handling
window.addEventListener('error', function(e) {
  console.error('Application error:', e.error);
  showNotification('Ocorreu um erro inesperado. Tente novamente.', 'error');
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
  showNotification('Ocorreu um erro inesperado. Tente novamente.', 'error');
});

console.log('Xperience Hubs Application Loaded Successfully!');