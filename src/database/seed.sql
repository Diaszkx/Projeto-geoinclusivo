PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO categorias (id, nome, descricao) VALUES
(1, 'Capitais', 'Perguntas sobre capitais do Brasil e do mundo.'),
(2, 'Biomas', 'Perguntas sobre biomas brasileiros.'),
(3, 'Mapas', 'Perguntas sobre localização e interpretação de mapas.'),
(4, 'Bandeiras', 'Perguntas sobre bandeiras de países.'),
(5, 'Clima', 'Perguntas sobre clima e fenômenos naturais.'),
(6, 'Continentes', 'Perguntas sobre continentes e localização.');

INSERT OR IGNORE INTO usuarios (id, nome, email, tipo) VALUES
(1, 'Aluno Teste', 'aluno@teste.com', 'estudante'),
(2, 'Administrador', 'admin@teste.com', 'admin');

INSERT OR IGNORE INTO perguntas (id, categoria_id, enunciado, dificuldade, ativa) VALUES
(1, 1, 'Qual é a capital do Brasil?', 'facil', 1),
(2, 1, 'Qual é a capital do Rio Grande do Sul?', 'facil', 1),
(3, 1, 'Qual é a capital da Argentina?', 'facil', 1),
(4, 1, 'Qual é a capital da França?', 'facil', 1),
(5, 1, 'Qual é a capital do Japão?', 'medio', 1),

(6, 2, 'Qual bioma ocupa grande parte da região Norte do Brasil?', 'facil', 1),
(7, 2, 'Qual bioma é conhecido por clima semiárido?', 'medio', 1),
(8, 2, 'Qual bioma brasileiro está presente no Rio Grande do Sul?', 'medio', 1),
(9, 2, 'Qual bioma é conhecido por áreas alagadas e grande biodiversidade?', 'medio', 1),
(10, 2, 'Qual bioma possui árvores retorcidas e clima tropical sazonal?', 'medio', 1),

(11, 3, 'Em um mapa, o que a escala representa?', 'medio', 1),
(12, 3, 'Qual instrumento indica os pontos cardeais?', 'facil', 1),
(13, 3, 'Qual ponto cardeal fica onde o Sol nasce aproximadamente?', 'facil', 1),
(14, 3, 'O que é uma legenda em um mapa?', 'facil', 1),
(15, 3, 'Qual linha imaginária divide a Terra em hemisfério Norte e Sul?', 'medio', 1),

(16, 4, 'Qual país tem uma bandeira com uma folha de bordo?', 'facil', 1),
(17, 4, 'A bandeira verde e amarela com círculo azul pertence a qual país?', 'facil', 1),
(18, 4, 'A bandeira com listras vermelhas e brancas e estrelas pertence a qual país?', 'facil', 1),

(19, 5, 'Qual clima é caracterizado por temperaturas elevadas e pouca chuva?', 'medio', 1),
(20, 5, 'Qual camada de gases envolve a Terra?', 'facil', 1),
(21, 5, 'Qual estação do ano costuma ser mais fria?', 'facil', 1),

(22, 6, 'Qual é o maior continente do mundo?', 'facil', 1),
(23, 6, 'Em qual continente fica o Brasil?', 'facil', 1),
(24, 6, 'Qual continente é coberto por gelo e fica no extremo sul do planeta?', 'facil', 1);

INSERT OR IGNORE INTO alternativas (id, pergunta_id, texto, correta) VALUES
(1, 1, 'Brasília', 1), (2, 1, 'São Paulo', 0), (3, 1, 'Rio de Janeiro', 0), (4, 1, 'Salvador', 0),
(5, 2, 'Porto Alegre', 1), (6, 2, 'Canoas', 0), (7, 2, 'Pelotas', 0), (8, 2, 'Caxias do Sul', 0),
(9, 3, 'Buenos Aires', 1), (10, 3, 'Santiago', 0), (11, 3, 'Montevidéu', 0), (12, 3, 'Lima', 0),
(13, 4, 'Paris', 1), (14, 4, 'Londres', 0), (15, 4, 'Roma', 0), (16, 4, 'Madri', 0),
(17, 5, 'Tóquio', 1), (18, 5, 'Pequim', 0), (19, 5, 'Seul', 0), (20, 5, 'Bangkok', 0),

(21, 6, 'Amazônia', 1), (22, 6, 'Pampa', 0), (23, 6, 'Caatinga', 0), (24, 6, 'Pantanal', 0),
(25, 7, 'Caatinga', 1), (26, 7, 'Amazônia', 0), (27, 7, 'Mata Atlântica', 0), (28, 7, 'Pantanal', 0),
(29, 8, 'Pampa', 1), (30, 8, 'Cerrado', 0), (31, 8, 'Amazônia', 0), (32, 8, 'Caatinga', 0),
(33, 9, 'Pantanal', 1), (34, 9, 'Pampa', 0), (35, 9, 'Cerrado', 0), (36, 9, 'Caatinga', 0),
(37, 10, 'Cerrado', 1), (38, 10, 'Pantanal', 0), (39, 10, 'Pampa', 0), (40, 10, 'Amazônia', 0),

(41, 11, 'A relação entre a distância no mapa e a distância real', 1), (42, 11, 'A cor dos países', 0), (43, 11, 'O nome dos rios', 0), (44, 11, 'A quantidade de cidades', 0),
(45, 12, 'Bússola', 1), (46, 12, 'Termômetro', 0), (47, 12, 'Relógio', 0), (48, 12, 'Barômetro', 0),
(49, 13, 'Leste', 1), (50, 13, 'Oeste', 0), (51, 13, 'Sul', 0), (52, 13, 'Norte', 0),
(53, 14, 'Explicação dos símbolos usados no mapa', 1), (54, 14, 'Lista de países', 0), (55, 14, 'Nome do oceano', 0), (56, 14, 'Número de habitantes', 0),
(57, 15, 'Linha do Equador', 1), (58, 15, 'Trópico de Capricórnio', 0), (59, 15, 'Meridiano de Greenwich', 0), (60, 15, 'Círculo Polar Ártico', 0),

(61, 16, 'Canadá', 1), (62, 16, 'Estados Unidos', 0), (63, 16, 'Austrália', 0), (64, 16, 'Nova Zelândia', 0),
(65, 17, 'Brasil', 1), (66, 17, 'Portugal', 0), (67, 17, 'México', 0), (68, 17, 'Itália', 0),
(69, 18, 'Estados Unidos', 1), (70, 18, 'Canadá', 0), (71, 18, 'França', 0), (72, 18, 'Japão', 0),

(73, 19, 'Desértico', 1), (74, 19, 'Polar', 0), (75, 19, 'Temperado', 0), (76, 19, 'Oceânico', 0),
(77, 20, 'Atmosfera', 1), (78, 20, 'Litosfera', 0), (79, 20, 'Hidrosfera', 0), (80, 20, 'Biosfera', 0),
(81, 21, 'Inverno', 1), (82, 21, 'Verão', 0), (83, 21, 'Primavera', 0), (84, 21, 'Outono', 0),

(85, 22, 'Ásia', 1), (86, 22, 'Europa', 0), (87, 22, 'Oceania', 0), (88, 22, 'América do Sul', 0),
(89, 23, 'América do Sul', 1), (90, 23, 'África', 0), (91, 23, 'Europa', 0), (92, 23, 'Ásia', 0),
(93, 24, 'Antártida', 1), (94, 24, 'África', 0), (95, 24, 'Europa', 0), (96, 24, 'Ásia', 0);
