// src/data/catalogoFiltros.ts
// Dados dos filtros (marca, gênero, esporte, idade, cores, tamanhos e promoção) dos 200 produtos do catálogo GRENÁ.
// Usado por DatabaseModel.migrar() para preencher esses campos nos produtos que já estão no banco
// (só onde ainda estiverem vazios — nada que você editou é sobrescrito).

export interface ItemCatalogoFiltros {
    nome: string;
    marca: string;
    genero: string;
    esporte: string;
    faixaEtaria: string;
    desconto: number;
    precoAnterior: number | null;
    promocao: boolean;
    cores: string[];
    tamanhos: string[];
}

export const MARCAS_INICIAIS: string[] = [
    "Adidas",
    "Asics",
    "Black Skull",
    "Fila",
    "GRENÁ",
    "Growth Supplements",
    "Integralmédica",
    "Kappa",
    "Lupo",
    "Max Titanium",
    "Mikasa",
    "Mizuno",
    "New Balance",
    "Nike",
    "Oakley",
    "Olympikus",
    "Penalty",
    "Probiótica",
    "Puma",
    "Reebok",
    "Spalding",
    "Speedo",
    "Topper",
    "Umbro",
    "Under Armour",
    "Wilson"
];

export const CATALOGO_FILTROS: ItemCatalogoFiltros[] = [
    {
        "nome": "Camisa I 2025/26 Torcedor Flamengo",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Vermelho",
            "Preto"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Flamengo",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Vermelho",
            "Preto"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Flamengo",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Vermelho",
            "Preto"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Flamengo",
        "marca": "Adidas",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Vermelho",
            "Preto"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Palmeiras",
        "marca": "Puma",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Verde",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Palmeiras",
        "marca": "Puma",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Verde",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Palmeiras",
        "marca": "Puma",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Verde",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Palmeiras",
        "marca": "Puma",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Verde",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Corinthians",
        "marca": "Nike",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Branco",
            "Preto"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Corinthians",
        "marca": "Nike",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Branco",
            "Preto"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Corinthians",
        "marca": "Nike",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Branco",
            "Preto"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Corinthians",
        "marca": "Nike",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Branco",
            "Preto"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor São Paulo",
        "marca": "New Balance",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Branco",
            "Vermelho",
            "Preto"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor São Paulo",
        "marca": "New Balance",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Branco",
            "Vermelho",
            "Preto"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 São Paulo",
        "marca": "New Balance",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Branco",
            "Vermelho",
            "Preto"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 São Paulo",
        "marca": "New Balance",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Branco",
            "Vermelho",
            "Preto"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Santos",
        "marca": "Umbro",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Branco",
            "Preto"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Santos",
        "marca": "Umbro",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Branco",
            "Preto"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Santos",
        "marca": "Umbro",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Branco",
            "Preto"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Santos",
        "marca": "Umbro",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Branco",
            "Preto"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Vasco da Gama",
        "marca": "Kappa",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Preto",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Vasco da Gama",
        "marca": "Kappa",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Preto",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Vasco da Gama",
        "marca": "Kappa",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Preto",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Vasco da Gama",
        "marca": "Kappa",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Preto",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Grêmio",
        "marca": "Umbro",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Azul",
            "Preto",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Grêmio",
        "marca": "Umbro",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Azul",
            "Preto",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Grêmio",
        "marca": "Umbro",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Azul",
            "Preto",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Grêmio",
        "marca": "Umbro",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Azul",
            "Preto",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Internacional",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Vermelho",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Internacional",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Vermelho",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Internacional",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Vermelho",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Internacional",
        "marca": "Adidas",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Vermelho",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Atlético Mineiro",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Preto",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Atlético Mineiro",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Preto",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Atlético Mineiro",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Preto",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Atlético Mineiro",
        "marca": "Adidas",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Preto",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Cruzeiro",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Azul",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Cruzeiro",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Azul",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Cruzeiro",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Azul",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Cruzeiro",
        "marca": "Adidas",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Azul",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Botafogo",
        "marca": "Reebok",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Preto",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Botafogo",
        "marca": "Reebok",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Preto",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Botafogo",
        "marca": "Reebok",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Preto",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Botafogo",
        "marca": "Reebok",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Preto",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Fluminense",
        "marca": "Umbro",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Grená",
            "Verde",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Fluminense",
        "marca": "Umbro",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Grená",
            "Verde",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Fluminense",
        "marca": "Umbro",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Grená",
            "Verde",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Fluminense",
        "marca": "Umbro",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Grená",
            "Verde",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Bahia",
        "marca": "Puma",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Azul",
            "Vermelho",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Bahia",
        "marca": "Puma",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Azul",
            "Vermelho",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Bahia",
        "marca": "Puma",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Azul",
            "Vermelho",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Bahia",
        "marca": "Puma",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Azul",
            "Vermelho",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Real Madrid",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Branco",
            "Dourado"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Real Madrid",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Branco",
            "Dourado"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Real Madrid",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Branco",
            "Dourado"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Real Madrid",
        "marca": "Adidas",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Branco",
            "Dourado"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Barcelona",
        "marca": "Nike",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Azul",
            "Grená"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Barcelona",
        "marca": "Nike",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Azul",
            "Grená"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Barcelona",
        "marca": "Nike",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Azul",
            "Grená"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Barcelona",
        "marca": "Nike",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Azul",
            "Grená"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Manchester City",
        "marca": "Puma",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Azul",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Manchester City",
        "marca": "Puma",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Azul",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Manchester City",
        "marca": "Puma",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Azul",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Manchester City",
        "marca": "Puma",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Azul",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Liverpool",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Vermelho"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Liverpool",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Vermelho"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Liverpool",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Vermelho"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Liverpool",
        "marca": "Adidas",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Vermelho"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Paris Saint-Germain",
        "marca": "Nike",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Azul-marinho",
            "Vermelho"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Paris Saint-Germain",
        "marca": "Nike",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Azul-marinho",
            "Vermelho"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Paris Saint-Germain",
        "marca": "Nike",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Azul-marinho",
            "Vermelho"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Paris Saint-Germain",
        "marca": "Nike",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Azul-marinho",
            "Vermelho"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Juventus",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Preto",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Juventus",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Preto",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Juventus",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Preto",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Juventus",
        "marca": "Adidas",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Preto",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Milan",
        "marca": "Puma",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Vermelho",
            "Preto"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Milan",
        "marca": "Puma",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Vermelho",
            "Preto"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Milan",
        "marca": "Puma",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Vermelho",
            "Preto"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Milan",
        "marca": "Puma",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Vermelho",
            "Preto"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Bayern de Munique",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Vermelho",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Bayern de Munique",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Vermelho",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Bayern de Munique",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Vermelho",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Bayern de Munique",
        "marca": "Adidas",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Vermelho",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Boca Juniors",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Azul",
            "Amarelo"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Boca Juniors",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Azul",
            "Amarelo"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Boca Juniors",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Azul",
            "Amarelo"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Boca Juniors",
        "marca": "Adidas",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Azul",
            "Amarelo"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Seleção Brasileira",
        "marca": "Nike",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Amarelo",
            "Verde",
            "Azul"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Seleção Brasileira",
        "marca": "Nike",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Amarelo",
            "Verde",
            "Azul"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Seleção Brasileira",
        "marca": "Nike",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Amarelo",
            "Verde",
            "Azul"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Seleção Brasileira",
        "marca": "Nike",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Amarelo",
            "Verde",
            "Azul"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Seleção Argentina",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Azul",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Seleção Argentina",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Azul",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Seleção Argentina",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Azul",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Seleção Argentina",
        "marca": "Adidas",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Azul",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa I 2025/26 Torcedor Seleção de Portugal",
        "marca": "Nike",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Vermelho",
            "Verde"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa II 2025/26 Torcedor Seleção de Portugal",
        "marca": "Nike",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Vermelho",
            "Verde"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa III 2025/26 Seleção de Portugal",
        "marca": "Nike",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 447.05,
        "promocao": true,
        "cores": [
            "Vermelho",
            "Verde"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Camisa de Treino 2025/26 Seleção de Portugal",
        "marca": "Nike",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 312.49,
        "promocao": true,
        "cores": [
            "Vermelho",
            "Verde"
        ],
        "tamanhos": [
            "P",
            "M",
            "G",
            "GG",
            "XG"
        ]
    },
    {
        "nome": "Chuteira Nike Mercurial Vapor 16 Academy Campo",
        "marca": "Nike",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 705.87,
        "promocao": true,
        "cores": [
            "Branco",
            "Laranja"
        ],
        "tamanhos": [
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Chuteira Nike Phantom GX II Club Society",
        "marca": "Nike",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Verde",
            "Amarelo"
        ],
        "tamanhos": [
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Chuteira Nike Tiempo Legend 10 Academy Campo",
        "marca": "Nike",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Preto",
            "Branco"
        ],
        "tamanhos": [
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Chuteira Adidas Predator League Campo",
        "marca": "Adidas",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Laranja",
            "Azul"
        ],
        "tamanhos": [
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Chuteira Adidas F50 League Society",
        "marca": "Adidas",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Amarelo",
            "Azul"
        ],
        "tamanhos": [
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Chuteira Adidas Copa Pure 2 Club Futsal",
        "marca": "Adidas",
        "genero": "Unissex",
        "esporte": "Futsal",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Laranja",
            "Verde"
        ],
        "tamanhos": [
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Chuteira Puma Future 7 Play Campo",
        "marca": "Puma",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 444.43,
        "promocao": true,
        "cores": [
            "Branco",
            "Verde"
        ],
        "tamanhos": [
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Chuteira Puma Ultra 5 Play Society",
        "marca": "Puma",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Amarelo",
            "Laranja"
        ],
        "tamanhos": [
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Chuteira Mizuno Morelia Neo IV Pro Campo",
        "marca": "Mizuno",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 1058.81,
        "promocao": true,
        "cores": [
            "Branco",
            "Amarelo"
        ],
        "tamanhos": [
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Chuteira Umbro Pro 5 Bump Futsal",
        "marca": "Umbro",
        "genero": "Unissex",
        "esporte": "Futsal",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Preto",
            "Verde"
        ],
        "tamanhos": [
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Chuteira Penalty Bravo Y-3 Society",
        "marca": "Penalty",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Verde",
            "Laranja"
        ],
        "tamanhos": [
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Chuteira Topper Maestro TD Campo",
        "marca": "Topper",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 211.75,
        "promocao": true,
        "cores": [
            "Laranja",
            "Amarelo"
        ],
        "tamanhos": [
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Chuteira Kappa Player Base Futsal",
        "marca": "Kappa",
        "genero": "Unissex",
        "esporte": "Futsal",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Azul",
            "Amarelo"
        ],
        "tamanhos": [
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Chuteira New Balance Furon V7 Dispatch Campo",
        "marca": "New Balance",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 533.32,
        "promocao": true,
        "cores": [
            "Verde",
            "Amarelo"
        ],
        "tamanhos": [
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Chuteira Nike Mercurial Superfly 10 Club Infantil",
        "marca": "Nike",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Infantil",
        "desconto": 15,
        "precoAnterior": 352.93,
        "promocao": true,
        "cores": [
            "Preto",
            "Azul"
        ],
        "tamanhos": [
            "28",
            "29",
            "30",
            "31",
            "32",
            "33",
            "34",
            "35",
            "36"
        ]
    },
    {
        "nome": "Tênis Nike Pegasus 41",
        "marca": "Nike",
        "genero": "Feminino",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 888.88,
        "promocao": true,
        "cores": [
            "Preto",
            "Laranja"
        ],
        "tamanhos": [
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Tênis Nike Vomero 18",
        "marca": "Nike",
        "genero": "Masculino",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 1111.1,
        "promocao": true,
        "cores": [
            "Rosa",
            "Preto"
        ],
        "tamanhos": [
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Tênis Nike Revolution 7",
        "marca": "Nike",
        "genero": "Unissex",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Rosa",
            "Verde"
        ],
        "tamanhos": [
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Tênis Adidas Ultraboost 5",
        "marca": "Adidas",
        "genero": "Feminino",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 25,
        "precoAnterior": 1466.65,
        "promocao": true,
        "cores": [
            "Verde",
            "Branco"
        ],
        "tamanhos": [
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Tênis Adidas Adizero SL2",
        "marca": "Adidas",
        "genero": "Unissex",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 777.77,
        "promocao": true,
        "cores": [
            "Preto",
            "Rosa"
        ],
        "tamanhos": [
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Tênis Adidas Duramo SL",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Preto",
            "Azul"
        ],
        "tamanhos": [
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Tênis Asics Gel-Nimbus 27",
        "marca": "Asics",
        "genero": "Masculino",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Branco",
            "Rosa"
        ],
        "tamanhos": [
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Tênis Asics Gel-Kayano 31",
        "marca": "Asics",
        "genero": "Unissex",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 25,
        "precoAnterior": 1466.65,
        "promocao": true,
        "cores": [
            "Cinza",
            "Preto"
        ],
        "tamanhos": [
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Tênis Asics Novablast 5",
        "marca": "Asics",
        "genero": "Masculino",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 1124.99,
        "promocao": true,
        "cores": [
            "Branco",
            "Laranja"
        ],
        "tamanhos": [
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Tênis Mizuno Wave Rider 28",
        "marca": "Mizuno",
        "genero": "Unissex",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 25,
        "precoAnterior": 1199.99,
        "promocao": true,
        "cores": [
            "Branco",
            "Azul"
        ],
        "tamanhos": [
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Tênis Mizuno Wave Prophecy 13",
        "marca": "Mizuno",
        "genero": "Unissex",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 25,
        "precoAnterior": 1999.99,
        "promocao": true,
        "cores": [
            "Cinza",
            "Branco"
        ],
        "tamanhos": [
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Tênis Olympikus Corre 4",
        "marca": "Olympikus",
        "genero": "Unissex",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 555.54,
        "promocao": true,
        "cores": [
            "Laranja",
            "Branco"
        ],
        "tamanhos": [
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Tênis Olympikus Veloz 2",
        "marca": "Olympikus",
        "genero": "Unissex",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 374.99,
        "promocao": true,
        "cores": [
            "Laranja",
            "Azul"
        ],
        "tamanhos": [
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Tênis New Balance Fresh Foam 1080v14",
        "marca": "New Balance",
        "genero": "Unissex",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Cinza",
            "Preto"
        ],
        "tamanhos": [
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Tênis New Balance 520v9",
        "marca": "New Balance",
        "genero": "Masculino",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 25,
        "precoAnterior": 599.99,
        "promocao": true,
        "cores": [
            "Azul",
            "Preto"
        ],
        "tamanhos": [
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Tênis Fila Racer Carbon 2",
        "marca": "Fila",
        "genero": "Masculino",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Rosa",
            "Branco"
        ],
        "tamanhos": [
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Tênis Puma Velocity Nitro 3",
        "marca": "Puma",
        "genero": "Unissex",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Laranja",
            "Preto"
        ],
        "tamanhos": [
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Tênis Under Armour Charged Pursuit 3",
        "marca": "Under Armour",
        "genero": "Masculino",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Verde",
            "Azul"
        ],
        "tamanhos": [
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Tênis Puma Deviate Nitro 3",
        "marca": "Puma",
        "genero": "Masculino",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 1499.99,
        "promocao": true,
        "cores": [
            "Azul",
            "Laranja"
        ],
        "tamanhos": [
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Tênis Fila Float Elite",
        "marca": "Fila",
        "genero": "Unissex",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 25,
        "precoAnterior": 799.99,
        "promocao": true,
        "cores": [
            "Branco",
            "Laranja"
        ],
        "tamanhos": [
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40",
            "41",
            "42",
            "43",
            "44"
        ]
    },
    {
        "nome": "Shorts Nike Dri-FIT Challenger 7\"",
        "marca": "Nike",
        "genero": "Masculino",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 222.21,
        "promocao": true,
        "cores": [
            "Cinza",
            "Branco"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Shorts Adidas Own The Run",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Cinza",
            "Branco"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Shorts Puma Run Favorite Velocity",
        "marca": "Puma",
        "genero": "Feminino",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Vinho",
            "Cinza"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Bermuda Under Armour Tech Graphic",
        "marca": "Under Armour",
        "genero": "Masculino",
        "esporte": "Treino",
        "faixaEtaria": "Adulto",
        "desconto": 30,
        "precoAnterior": 242.84,
        "promocao": true,
        "cores": [
            "Cinza",
            "Verde"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Regata Nike Dri-FIT Miler",
        "marca": "Nike",
        "genero": "Masculino",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 30,
        "precoAnterior": 228.56,
        "promocao": true,
        "cores": [
            "Vinho",
            "Verde"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Regata Adidas Train Essentials",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Academia",
        "faixaEtaria": "Adulto",
        "desconto": 30,
        "precoAnterior": 185.7,
        "promocao": true,
        "cores": [
            "Preto",
            "Cinza"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Camiseta Asics Core Run",
        "marca": "Asics",
        "genero": "Masculino",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Verde",
            "Preto"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Camiseta Under Armour Tech 2.0",
        "marca": "Under Armour",
        "genero": "Masculino",
        "esporte": "Treino",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 155.54,
        "promocao": true,
        "cores": [
            "Branco",
            "Rosa"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Camiseta Mizuno Run Spark",
        "marca": "Mizuno",
        "genero": "Unissex",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Cinza",
            "Branco"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Camiseta Olympikus Essential",
        "marca": "Olympikus",
        "genero": "Unissex",
        "esporte": "Treino",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 88.88,
        "promocao": true,
        "cores": [
            "Branco",
            "Preto"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Top Nike Swoosh Medium Support",
        "marca": "Nike",
        "genero": "Feminino",
        "esporte": "Fitness",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Verde",
            "Rosa"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Top Adidas Powerimpact",
        "marca": "Adidas",
        "genero": "Feminino",
        "esporte": "Fitness",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Vinho",
            "Rosa"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Legging Nike One High-Waisted",
        "marca": "Nike",
        "genero": "Feminino",
        "esporte": "Fitness",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Verde",
            "Branco"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Legging Adidas Optime 7/8",
        "marca": "Adidas",
        "genero": "Feminino",
        "esporte": "Yoga",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Cinza",
            "Verde"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Legging Lupo Sport Max",
        "marca": "Lupo",
        "genero": "Feminino",
        "esporte": "Academia",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Cinza",
            "Preto"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Jaqueta Corta-Vento Nike Windrunner",
        "marca": "Nike",
        "genero": "Masculino",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Preto",
            "Cinza"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Jaqueta Adidas Tiro 24 Treino",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Verde",
            "Cinza"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Agasalho Puma TeamRISE",
        "marca": "Puma",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 529.4,
        "promocao": true,
        "cores": [
            "Vinho",
            "Verde"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Calça Adidas Tiro 24",
        "marca": "Adidas",
        "genero": "Masculino",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Vinho",
            "Cinza"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Calça Nike Club Fleece Jogger",
        "marca": "Nike",
        "genero": "Unissex",
        "esporte": "Lifestyle",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Azul-marinho",
            "Branco"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Moletom Reebok Identity Fleece",
        "marca": "Reebok",
        "genero": "Unissex",
        "esporte": "Lifestyle",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Vinho",
            "Rosa"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Camiseta Reebok Workout Ready",
        "marca": "Reebok",
        "genero": "Masculino",
        "esporte": "Crossfit",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Azul-marinho",
            "Preto"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Bermuda Fila Basic Sports",
        "marca": "Fila",
        "genero": "Masculino",
        "esporte": "Treino",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 117.64,
        "promocao": true,
        "cores": [
            "Cinza",
            "Rosa"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Camiseta Penalty X Treino",
        "marca": "Penalty",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Preto",
            "Rosa"
        ],
        "tamanhos": [
            "PP",
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
        "nome": "Kit Infantil Umbro Treino Camisa + Shorts",
        "marca": "Umbro",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Infantil",
        "desconto": 15,
        "precoAnterior": 176.46,
        "promocao": true,
        "cores": [
            "Branco",
            "Preto"
        ],
        "tamanhos": [
            "4",
            "6",
            "8",
            "10",
            "12",
            "14"
        ]
    },
    {
        "nome": "Bola de Futebol Campo Nike Premier League Flight",
        "marca": "Nike",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 999.99,
        "promocao": true,
        "cores": [
            "Branco",
            "Multicolorido"
        ],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Bola de Futebol Campo Adidas UCL League",
        "marca": "Adidas",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Branco",
            "Multicolorido"
        ],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Bola de Futebol Society Penalty Matis",
        "marca": "Penalty",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 166.66,
        "promocao": true,
        "cores": [
            "Branco",
            "Multicolorido"
        ],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Bola de Futsal Penalty Max 1000",
        "marca": "Penalty",
        "genero": "Unissex",
        "esporte": "Futsal",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 255.54,
        "promocao": true,
        "cores": [
            "Branco",
            "Multicolorido"
        ],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Bola de Futsal Umbro Neo Liga",
        "marca": "Umbro",
        "genero": "Unissex",
        "esporte": "Futsal",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Branco",
            "Multicolorido"
        ],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Bola de Basquete Spalding NBA Street",
        "marca": "Spalding",
        "genero": "Unissex",
        "esporte": "Basquete",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Branco",
            "Multicolorido"
        ],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Bola de Basquete Wilson NBA DRV Pro",
        "marca": "Wilson",
        "genero": "Unissex",
        "esporte": "Basquete",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 277.77,
        "promocao": true,
        "cores": [
            "Branco",
            "Multicolorido"
        ],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Bola de Vôlei Mikasa V200W",
        "marca": "Mikasa",
        "genero": "Unissex",
        "esporte": "Vôlei",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 666.66,
        "promocao": true,
        "cores": [
            "Branco",
            "Multicolorido"
        ],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Bola de Vôlei Penalty Pro 8.0",
        "marca": "Penalty",
        "genero": "Unissex",
        "esporte": "Vôlei",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Branco",
            "Multicolorido"
        ],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Bola de Tênis Wilson US Open (tubo c/ 3)",
        "marca": "Wilson",
        "genero": "Unissex",
        "esporte": "Tênis",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Branco",
            "Multicolorido"
        ],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Meião Nike Classic II",
        "marca": "Nike",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 62.49,
        "promocao": true,
        "cores": [
            "Branco",
            "Azul"
        ],
        "tamanhos": [
            "P",
            "M",
            "G"
        ]
    },
    {
        "nome": "Meia Lupo Sport Cano Médio (kit 3)",
        "marca": "Lupo",
        "genero": "Unissex",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 66.66,
        "promocao": true,
        "cores": [
            "Azul",
            "Grená"
        ],
        "tamanhos": [
            "P",
            "M",
            "G"
        ]
    },
    {
        "nome": "Caneleira Adidas Tiro Club",
        "marca": "Adidas",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Preto",
            "Grená"
        ],
        "tamanhos": [
            "P",
            "M",
            "G"
        ]
    },
    {
        "nome": "Caneleira Nike Mercurial Lite",
        "marca": "Nike",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 111.1,
        "promocao": true,
        "cores": [
            "Cinza",
            "Branco"
        ],
        "tamanhos": [
            "P",
            "M",
            "G"
        ]
    },
    {
        "nome": "Luva de Goleiro Puma Ultra Grip 3",
        "marca": "Puma",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Azul",
            "Preto"
        ],
        "tamanhos": [
            "7",
            "8",
            "9",
            "10"
        ]
    },
    {
        "nome": "Luva de Goleiro Adidas Predator Training",
        "marca": "Adidas",
        "genero": "Unissex",
        "esporte": "Futebol",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 287.49,
        "promocao": true,
        "cores": [
            "Azul",
            "Branco"
        ],
        "tamanhos": [
            "7",
            "8",
            "9",
            "10"
        ]
    },
    {
        "nome": "Mochila Nike Brasilia 24L",
        "marca": "Nike",
        "genero": "Unissex",
        "esporte": "Treino",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 277.77,
        "promocao": true,
        "cores": [
            "Azul",
            "Preto"
        ],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Mochila Adidas Power VII",
        "marca": "Adidas",
        "genero": "Unissex",
        "esporte": "Treino",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Branco",
            "Azul"
        ],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Mochila Under Armour Hustle 5.0",
        "marca": "Under Armour",
        "genero": "Unissex",
        "esporte": "Treino",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 388.88,
        "promocao": true,
        "cores": [
            "Cinza",
            "Branco"
        ],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Garrafa Térmica GRENÁ 750ml",
        "marca": "GRENÁ",
        "genero": "Unissex",
        "esporte": "Academia",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 99.99,
        "promocao": true,
        "cores": [
            "Cinza",
            "Branco"
        ],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Boné Nike Dri-FIT Club",
        "marca": "Nike",
        "genero": "Unissex",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 166.66,
        "promocao": true,
        "cores": [
            "Azul",
            "Grená"
        ],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Viseira Oakley Sport",
        "marca": "Oakley",
        "genero": "Unissex",
        "esporte": "Corrida",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 144.43,
        "promocao": true,
        "cores": [
            "Preto",
            "Grená"
        ],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Óculos Oakley Sutro Lite",
        "marca": "Oakley",
        "genero": "Unissex",
        "esporte": "Ciclismo",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Preto",
            "Azul"
        ],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Óculos de Natação Speedo Vanquisher 3.0",
        "marca": "Speedo",
        "genero": "Unissex",
        "esporte": "Natação",
        "faixaEtaria": "Adulto",
        "desconto": 20,
        "precoAnterior": 187.49,
        "promocao": true,
        "cores": [
            "Branco",
            "Grená"
        ],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Touca de Natação Speedo Silicone",
        "marca": "Speedo",
        "genero": "Unissex",
        "esporte": "Natação",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [
            "Preto",
            "Cinza"
        ],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Whey Protein Concentrado Growth 1kg",
        "marca": "Growth Supplements",
        "genero": "Unissex",
        "esporte": "Academia",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Creatina Monohidratada Growth 250g",
        "marca": "Growth Supplements",
        "genero": "Unissex",
        "esporte": "Academia",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Whey Protein 100% Pure Integralmédica 900g",
        "marca": "Integralmédica",
        "genero": "Unissex",
        "esporte": "Academia",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 199.99,
        "promocao": true,
        "cores": [],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Creatina Hardcore Integralmédica 300g",
        "marca": "Integralmédica",
        "genero": "Unissex",
        "esporte": "Academia",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Whey 3W Max Titanium 900g",
        "marca": "Max Titanium",
        "genero": "Unissex",
        "esporte": "Academia",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Creatina Max Titanium 300g",
        "marca": "Max Titanium",
        "genero": "Unissex",
        "esporte": "Academia",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Pré-Treino Black Skull Bone Crusher 300g",
        "marca": "Black Skull",
        "genero": "Unissex",
        "esporte": "Academia",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Whey Protein Black Skull 900g",
        "marca": "Black Skull",
        "genero": "Unissex",
        "esporte": "Academia",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Whey Protein Isolado Probiótica 900g",
        "marca": "Probiótica",
        "genero": "Unissex",
        "esporte": "Academia",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Barra de Proteína Probiótica Crisp (caixa 12)",
        "marca": "Probiótica",
        "genero": "Unissex",
        "esporte": "Academia",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "BCAA 2400 Max Titanium 100 caps",
        "marca": "Max Titanium",
        "genero": "Unissex",
        "esporte": "Academia",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 70.58,
        "promocao": true,
        "cores": [],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Glutamina Integralmédica 300g",
        "marca": "Integralmédica",
        "genero": "Unissex",
        "esporte": "Academia",
        "faixaEtaria": "Adulto",
        "desconto": 15,
        "precoAnterior": 117.64,
        "promocao": true,
        "cores": [],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Hipercalórico Growth 3kg",
        "marca": "Growth Supplements",
        "genero": "Unissex",
        "esporte": "Academia",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Termogênico Black Skull Thermo Flame 60 caps",
        "marca": "Black Skull",
        "genero": "Unissex",
        "esporte": "Academia",
        "faixaEtaria": "Adulto",
        "desconto": 0,
        "precoAnterior": null,
        "promocao": false,
        "cores": [],
        "tamanhos": [
            "Único"
        ]
    },
    {
        "nome": "Coqueteleira GRENÁ 600ml",
        "marca": "GRENÁ",
        "genero": "Unissex",
        "esporte": "Academia",
        "faixaEtaria": "Adulto",
        "desconto": 10,
        "precoAnterior": 44.43,
        "promocao": true,
        "cores": [],
        "tamanhos": [
            "Único"
        ]
    }
];
