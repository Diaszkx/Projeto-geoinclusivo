PRAGMA foreign_keys = ON;
INSERT OR IGNORE INTO categorias (id, nome, descricao) VALUES
(1, 'Capitais', 'Identifique as capitais dos países e dos estados.'),
(2, 'Biomas', 'Conheça os biomas brasileiros e suas características.'),
(3, 'Mapas', 'Aprenda localização e interpretação de mapas.'),
(4, 'Bandeiras', 'Reconheça bandeiras de países do mundo.'),
(5, 'Clima', 'Aprenda sobre climas e fenômenos naturais.'),
(6, 'Continentes', 'Conheça os continentes e suas características.');

INSERT OR IGNORE INTO usuarios (id, nome, email, tipo) VALUES
(1, 'Aluno Teste', 'aluno@teste.com', 'estudante'),
(2, 'Administrador', 'admin@teste.com', 'admin');

INSERT OR IGNORE INTO perguntas (id, categoria_id, enunciado, dificuldade, ativa) VALUES
(1,1,'Qual é a capital do Brasil?','facil',1),(2,1,'Qual é a capital do Rio Grande do Sul?','facil',1),(3,1,'Qual é a capital da Argentina?','facil',1),(4,1,'Qual é a capital da França?','facil',1),(5,1,'Qual é a capital do Japão?','medio',1),
(6,2,'Qual bioma ocupa grande parte da região Norte do Brasil?','facil',1),(7,2,'Qual bioma é conhecido por vegetação rasteira e clima semiárido?','medio',1),(8,2,'Qual bioma brasileiro está muito presente no Rio Grande do Sul?','medio',1),(9,2,'Qual bioma é conhecido por áreas alagadas e grande biodiversidade?','medio',1),(10,2,'Qual bioma possui árvores retorcidas e clima tropical sazonal?','medio',1),
(11,3,'Em um mapa, o que a escala representa?','medio',1),(12,3,'Qual instrumento indica os pontos cardeais?','facil',1),(13,3,'Qual ponto cardeal fica onde o Sol nasce aproximadamente?','facil',1),(14,3,'O que é uma legenda em um mapa?','facil',1),(15,3,'Qual linha imaginária divide a Terra em hemisfério Norte e Sul?','medio',1),
(16,4,'Qual país tem uma bandeira com uma folha de bordo?','facil',1),(17,4,'A bandeira verde e amarela com círculo azul pertence a qual país?','facil',1),(18,4,'A bandeira com listras vermelhas e brancas e estrelas pertence a qual país?','facil',1),(19,4,'A bandeira branca com um círculo vermelho pertence a qual país?','facil',1),(20,4,'A bandeira azul, branca e vermelha em três faixas verticais pertence a qual país?','medio',1),
(21,5,'Qual clima é caracterizado por temperaturas elevadas e pouca chuva?','medio',1),(22,5,'Qual fenômeno é formado por ventos muito fortes em rotação?','medio',1),(23,5,'Qual camada de gases envolve a Terra?','facil',1),(24,5,'Qual estação do ano costuma ser mais fria?','facil',1),(25,5,'Qual fenômeno ocorre quando não chove por muito tempo?','facil',1),
(26,6,'Qual é o maior continente do mundo?','facil',1),(27,6,'Em qual continente fica o Brasil?','facil',1),(28,6,'Qual continente é conhecido por ter muitos países e grande diversidade cultural?','medio',1),(29,6,'Qual continente é coberto por gelo e fica no extremo sul do planeta?','facil',1),(30,6,'Qual continente abriga o deserto do Saara?','medio',1);

INSERT OR IGNORE INTO alternativas (id, pergunta_id, texto, correta) VALUES
(1,1,'Brasília',1),(2,1,'São Paulo',0),(3,1,'Rio de Janeiro',0),(4,1,'Salvador',0),(5,2,'Porto Alegre',1),(6,2,'Canoas',0),(7,2,'Pelotas',0),(8,2,'Caxias do Sul',0),(9,3,'Buenos Aires',1),(10,3,'Santiago',0),(11,3,'Montevidéu',0),(12,3,'Lima',0),(13,4,'Paris',1),(14,4,'Londres',0),(15,4,'Roma',0),(16,4,'Madri',0),(17,5,'Tóquio',1),(18,5,'Pequim',0),(19,5,'Seul',0),(20,5,'Bangkok',0),
(21,6,'Amazônia',1),(22,6,'Pampa',0),(23,6,'Caatinga',0),(24,6,'Pantanal',0),(25,7,'Caatinga',1),(26,7,'Amazônia',0),(27,7,'Mata Atlântica',0),(28,7,'Pantanal',0),(29,8,'Pampa',1),(30,8,'Cerrado',0),(31,8,'Amazônia',0),(32,8,'Caatinga',0),(33,9,'Pantanal',1),(34,9,'Pampa',0),(35,9,'Cerrado',0),(36,9,'Caatinga',0),(37,10,'Cerrado',1),(38,10,'Pantanal',0),(39,10,'Pampa',0),(40,10,'Amazônia',0),
(41,11,'A relação entre a distância no mapa e a distância real',1),(42,11,'A cor dos países',0),(43,11,'O nome dos rios',0),(44,11,'A quantidade de cidades',0),(45,12,'Bússola',1),(46,12,'Termômetro',0),(47,12,'Relógio',0),(48,12,'Barômetro',0),(49,13,'Leste',1),(50,13,'Oeste',0),(51,13,'Sul',0),(52,13,'Norte',0),(53,14,'Explicação dos símbolos usados no mapa',1),(54,14,'Lista de países',0),(55,14,'Nome do oceano',0),(56,14,'Número de habitantes',0),(57,15,'Linha do Equador',1),(58,15,'Trópico de Capricórnio',0),(59,15,'Meridiano de Greenwich',0),(60,15,'Círculo Polar Ártico',0),
(61,16,'Canadá',1),(62,16,'Estados Unidos',0),(63,16,'Austrália',0),(64,16,'Nova Zelândia',0),(65,17,'Brasil',1),(66,17,'Portugal',0),(67,17,'México',0),(68,17,'Itália',0),(69,18,'Estados Unidos',1),(70,18,'Canadá',0),(71,18,'França',0),(72,18,'Japão',0),(73,19,'Japão',1),(74,19,'China',0),(75,19,'Coreia do Sul',0),(76,19,'Índia',0),(77,20,'França',1),(78,20,'Alemanha',0),(79,20,'Brasil',0),(80,20,'Argentina',0),
(81,21,'Desértico',1),(82,21,'Polar',0),(83,21,'Temperado',0),(84,21,'Oceânico',0),(85,22,'Tornado',1),(86,22,'Geada',0),(87,22,'Neblina',0),(88,22,'Orvalho',0),(89,23,'Atmosfera',1),(90,23,'Litosfera',0),(91,23,'Hidrosfera',0),(92,23,'Biosfera',0),(93,24,'Inverno',1),(94,24,'Verão',0),(95,24,'Primavera',0),(96,24,'Outono',0),(97,25,'Seca',1),(98,25,'Enchente',0),(99,25,'Neve',0),(100,25,'Granizo',0),
(101,26,'Ásia',1),(102,26,'Europa',0),(103,26,'Oceania',0),(104,26,'América do Sul',0),(105,27,'América do Sul',1),(106,27,'África',0),(107,27,'Europa',0),(108,27,'Ásia',0),(109,28,'Europa',1),(110,28,'Antártida',0),(111,28,'Oceania',0),(112,28,'América do Norte',0),(113,29,'Antártida',1),(114,29,'África',0),(115,29,'Europa',0),(116,29,'Ásia',0),(117,30,'África',1),(118,30,'Europa',0),(119,30,'Oceania',0),(120,30,'América do Sul',0);
