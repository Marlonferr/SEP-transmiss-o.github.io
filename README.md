# SEP-transmiss
<h1>SEP(SISTEMA ELETRICO DE POTENCIA)</h1>
Maquete Didatica de Sistema Eletrico de Potencia (SEP)

Este projeto consiste em uma maquete didatica que representa, em escala reduzida, as principais etapas de um Sistema Eletrico de Potencia: geracao, transmissao, subestacoes, distribuicao e consumo final. O objetivo e permitir que estudantes e interessados visualizem e compreendam de forma pratica como a energia eletrica sai da usina e chega ate as residencias, comercios e industrias.
Objetivo

Demonstrar, de maneira clara e segura, o caminho percorrido pela energia eletrica desde a geracao ate o consumidor final, destacando os principais componentes e conceitos de SEP, como:

    Usinas geradoras (hidreletrica, termica, eolica, etc.)

    Linhas de transmissao em alta tensao

    Subestacoes e transformadores (elevacao e rebaixamento de tensao)

    Redes de distribuicao em media e baixa tensao

    Cargas representativas (casas, industrias, iluminacao publica)

Componentes principais da maquete

A maquete e composta por elementos que simulam cada etapa do SEP:

    Geracao: modelo de usina (por exemplo, hidreletrica) representando a fonte de energia.

    Elevacao de tensao: transformador elevador que simula o aumento da tensao para transmissao (ex.: 13,8 kV -> 138 kV ou mais, em escala conceitual).

    Transmissao: torres e linhas de transmissao em alta tensao, mostrando o transporte de energia por longas distancias.

    Subestacao abaixadora: transformador que reduz a tensao para niveis de distribuicao (ex.: 138 kV -> 13,8 kV).

    Distribuicao: rede de media tensao alimentando transformadores de distribuicao.

    Transformadores de distribuicao: rebaixamento para baixa tensao (ex.: 220/127 V) para uso final.

    Cargas: miniaturas de casas, comercios, industrias e postes de iluminacao, representando os consumidores finais.

Em alguns projetos didaticos, tambem sao incluidas divisorias ou modulos que simulam etapas especificas, como entrada de alta tensao, disjuntores, transformadores e paineis de distribuicao, para reforcar a sequencia logica do sistema.
Materiais e tecnologias tipicas

Dependendo do nivel de detalhe e recursos disponiveis, a maquete pode usar:

    Estrutura fisica: MDF, madeira, acrilico ou impressao 3D para pecas como torres, transformadores e edificacoes.

    Circuitos eletricos didaticos: fontes de baixa tensao (ex.: 12-24 V DC), LEDs, resistores e chaves para simular cargas e estados do sistema.

    Iluminacao e sinalizacao: LEDs para representar linhas energizadas, subestacoes em operacao e pontos de consumo.

    Opcional: microcontroladores (Arduino, ESP32) para simular medicoes, falhas (curto-circuito), ou automacao basica, integrando conceitos de IoT e instrumentacao.

Aplicacoes didaticas

A maquete pode ser usada para:

    Aulas de Sistemas Eletricos de Potencia, Instalacoes Eletricas e Protecao de Sistemas.

    Demonstracoes em feiras de ciencia, semanas academicas e eventos de eletrotecnica.

    Apoio a atividades praticas de calculo de demanda, escolha de transformadores e dimensionamento de redes.

    Integracao com simulacoes em software (OpenDSS, MATLAB) para comparar resultados teoricos com o comportamento do modelo fisico.

Como usar a maquete

    Apresentar o diagrama unifilar do SEP e explicar cada bloco (geracao, transmissao, distribuicao).

    Mostrar na maquete a sequencia fisica correspondente a cada bloco do diagrama.

    Explicar o papel dos transformadores na elevacao e rebaixamento de tensao e por que isso e feito (reducao de perdas, seguranca, niveis de utilizacao).

    Simular cenarios simples, como:

        Ligacao/desligamento de cargas.

        Falha em um trecho de linha (com indicacao visual de "sem energia").

        Diferentes tipos de consumidores (residencial, comercial, industrial).

Possiveis melhorias e extensoes

    Adicionar sensores de tensao/corrente (com circuitos de baixa tensao) e exibir medicoes em um display ou dashboard web (com ESP32, por exemplo).

    Implementar simulacao de curtos-circuitos e analise de correntes de falta, integrando com modelos em OpenDSS/MATLAB.

    Criar uma versao 3D digital do SEP para complementar a maquete fisica, permitindo visualizacao em software CAD.

Autores

    [Seu Nome Aqui] - Desenvolvedor do projeto

Licenca

Este projeto esta sob a licenca [MIT/outra licenca que voce escolher].
