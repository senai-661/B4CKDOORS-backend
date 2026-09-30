import type { Product } from '../types'

export const products: Product[] = [
  {
    id: 'camisa-real-2526', name: 'Camisa Real Madrid Home 25/26', category: 'futebol', categoryLabel: 'Futebol',
    team: 'Real Madrid', price: 279.90, oldPrice: 329.90, rating: 4.9, reviews: 128,
    image: '/products/jersey-white.svg', badge: 'MAIS VENDIDO', featured: true,
    description: 'Camisa inspirada no uniforme titular do Real Madrid. Tecido leve, confortável e ideal para torcer ou jogar.',
    sizes: ['P', 'M', 'G', 'GG', '2G'], colors: ['Branco']
  },
  {
    id: 'camisa-brasil-2026', name: 'Camisa Seleção Brasil 2026', category: 'futebol', categoryLabel: 'Futebol',
    team: 'Brasil', price: 249.90, oldPrice: 289.90, rating: 4.8, reviews: 96,
    image: '/products/jersey-yellow.svg', badge: 'LANÇAMENTO', featured: true,
    description: 'Mostre sua paixão pela Seleção com uma camisa vibrante, confortável e com ótimo caimento.',
    sizes: ['P', 'M', 'G', 'GG'], colors: ['Amarelo']
  },
  {
    id: 'camisa-santos-retro', name: 'Camisa Santos Retrô 2011', category: 'futebol', categoryLabel: 'Futebol',
    team: 'Santos', price: 219.90, rating: 4.7, reviews: 74, image: '/products/jersey-white.svg',
    description: 'Uma homenagem a uma temporada marcante. Modelo retrô para colecionadores e torcedores.',
    sizes: ['P', 'M', 'G', 'GG'], colors: ['Branco']
  },
  {
    id: 'camisa-flamengo-2526', name: 'Camisa Flamengo Home 25/26', category: 'futebol', categoryLabel: 'Futebol',
    team: 'Flamengo', price: 269.90, oldPrice: 299.90, rating: 4.9, reviews: 151,
    image: '/products/jersey-red.svg', badge: 'OFERTA', featured: true,
    description: 'Listras rubro-negras clássicas em uma camisa feita para acompanhar cada lance.',
    sizes: ['P', 'M', 'G', 'GG', '2G'], colors: ['Vermelho e preto']
  },
  {
    id: 'camisa-sao-paulo', name: 'Camisa São Paulo FC 25/26', category: 'futebol', categoryLabel: 'Futebol',
    team: 'São Paulo', price: 239.90, rating: 4.6, reviews: 51, image: '/products/jersey-white.svg',
    description: 'Modelo tricolor com visual clássico para os dias de jogo.',
    sizes: ['P', 'M', 'G', 'GG'], colors: ['Branco']
  },
  {
    id: 'camisa-palmeiras', name: 'Camisa Palmeiras Home 25/26', category: 'futebol', categoryLabel: 'Futebol',
    team: 'Palmeiras', price: 259.90, rating: 4.8, reviews: 82, image: '/products/jersey-green.svg',
    description: 'Camisa verde para torcer com conforto dentro e fora do estádio.',
    sizes: ['P', 'M', 'G', 'GG'], colors: ['Verde']
  },
  {
    id: 'tenis-court-white', name: 'Tênis Nike Court Vision — Masculino', category: 'calcados', categoryLabel: 'Calçados',
    price: 399.90, oldPrice: 449.90, rating: 4.8, reviews: 89, image: '/products/shoe-white.svg', badge: 'DESTAQUE',
    description: 'Tênis casual de visual esportivo, fácil de combinar e confortável para a rotina.',
    sizes: ['38', '39', '40', '41', '42', '43'], colors: ['Branco'], featured: true
  },
  {
    id: 'chuteira-campo-preta', name: 'Chuteira de Campo Pro — Preta', category: 'calcados', categoryLabel: 'Calçados',
    price: 329.90, rating: 4.7, reviews: 63, image: '/products/cleat-black.svg',
    description: 'Chuteira para gramado natural com ajuste firme e solado com travas.',
    sizes: ['38', '39', '40', '41', '42'], colors: ['Preto']
  },
  {
    id: 'tenis-running', name: 'Tênis Mizuno Wave — Masculino', category: 'calcados', categoryLabel: 'Calçados',
    price: 322.90, oldPrice: 369.90, rating: 4.6, reviews: 45, image: '/products/shoe-blue.svg',
    description: 'Tênis de corrida com estrutura leve e amortecimento para treinos diários.',
    sizes: ['38', '39', '40', '41', '42', '43'], colors: ['Branco e azul']
  },
  {
    id: 'chuteira-laranja', name: 'Chuteira Puma Future — Campo', category: 'calcados', categoryLabel: 'Calçados',
    price: 299.90, rating: 4.8, reviews: 37, image: '/products/cleat-orange.svg',
    description: 'Chuteira de campo com visual marcante e ajuste pensado para agilidade.',
    sizes: ['38', '39', '40', '41', '42'], colors: ['Laranja']
  },
  {
    id: 'moletom-grena', name: 'Moletom GRENÁ Essentials', category: 'roupas', categoryLabel: 'Roupas',
    price: 189.90, rating: 4.7, reviews: 34, image: '/products/hoodie-black.svg',
    description: 'Moletom confortável com identidade GRENÁ para usar antes e depois do treino.',
    sizes: ['P', 'M', 'G', 'GG'], colors: ['Preto']
  },
  {
    id: 'shorts-treino', name: 'Shorts Esportivo Dry Fit', category: 'roupas', categoryLabel: 'Roupas',
    price: 89.90, rating: 4.5, reviews: 22, image: '/products/shorts-black.svg',
    description: 'Shorts leve para academia, corrida e atividades ao ar livre.',
    sizes: ['P', 'M', 'G', 'GG'], colors: ['Preto']
  },
  {
    id: 'regata-basquete', name: 'Regata Basquete Court', category: 'basquete', categoryLabel: 'Basquete',
    price: 139.90, rating: 4.6, reviews: 19, image: '/products/jersey-blue.svg',
    description: 'Regata inspirada nas quadras, com tecido leve para jogar com liberdade.',
    sizes: ['P', 'M', 'G', 'GG'], colors: ['Azul']
  },
  {
    id: 'bola-basquete', name: 'Bola de Basquete Indoor/Outdoor', category: 'basquete', categoryLabel: 'Basquete',
    price: 119.90, rating: 4.8, reviews: 42, image: '/products/ball-orange.svg',
    description: 'Bola com textura aderente para treinos e partidas recreativas.',
    sizes: ['Único'], colors: ['Laranja']
  },
  {
    id: 'garrafa-sport', name: 'Garrafa Sport 750 ml', category: 'acessorios', categoryLabel: 'Acessórios',
    price: 39.90, rating: 4.4, reviews: 18, image: '/products/bottle.svg',
    description: 'Garrafa reutilizável para manter a hidratação durante o treino.',
    sizes: ['Único'], colors: ['Preto']
  },
  {
    id: 'luva-goleiro', name: 'Luva de Goleiro Training', category: 'acessorios', categoryLabel: 'Acessórios',
    price: 99.90, rating: 4.7, reviews: 27, image: '/products/gloves.svg',
    description: 'Luva para treinos com palma aderente e fechamento ajustável.',
    sizes: ['8', '9', '10', '11'], colors: ['Preto e vermelho']
  },
  {
    id: 'whey-protein', name: 'Whey Protein Performance 900 g', category: 'suplementos', categoryLabel: 'Suplementos',
    price: 119.90, rating: 4.6, reviews: 58, image: '/products/supplement.svg',
    description: 'Suplemento alimentar em pó. Consulte o rótulo e as orientações de uso antes de consumir.',
    sizes: ['900 g'], colors: ['Chocolate']
  },
  {
    id: 'meia-esportiva', name: 'Kit 3 Meias Esportivas', category: 'acessorios', categoryLabel: 'Acessórios',
    price: 49.90, rating: 4.5, reviews: 16, image: '/products/socks.svg',
    description: 'Kit com três pares de meias para acompanhar seus treinos e o dia a dia.',
    sizes: ['39–43'], colors: ['Branco']
  }
]