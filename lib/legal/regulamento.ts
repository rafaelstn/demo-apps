export type BlocoRegulamento =
  | { tipo: "p"; texto: string }
  | { tipo: "lista"; itens: string[] };

export type SecaoRegulamento = {
  n: number;
  titulo: string;
  blocos: BlocoRegulamento[];
};

export const REGULAMENTO_VIGENCIA = "Versão 1.0, 2 de julho de 2026";

export const REGULAMENTO_INTRO =
  "Este Regulamento estabelece os termos e as condições comerciais da oferta de desenvolvimento de aplicativos nativos veiculada em campanhas e anúncios da Damatech. Ao contratar, solicitar orçamento ou aprovar proposta, o cliente declara ter lido e concordado com as regras aqui descritas. As condições específicas de cada projeto são detalhadas na proposta comercial correspondente.";

export const REGULAMENTO: SecaoRegulamento[] = [
  {
    n: 1,
    titulo: "Identificação da contratada e do objeto da oferta",
    blocos: [
      { tipo: "p", texto: "A contratada é Rafael Damasceno Santana Soluções em Tecnologia Ltda, nome fantasia Damatech (Damatech Solutions), inscrita no CNPJ sob o número 22.364.409/0001-20, com sede em Guarulhos, São Paulo, doravante denominada \"Damatech\"." },
      { tipo: "p", texto: "O objeto desta oferta é o desenvolvimento de aplicativos nativos sob medida para os sistemas Android e iOS, incluindo concepção de interface, desenvolvimento e entrega, nos termos definidos na proposta específica de cada projeto." },
      { tipo: "p", texto: "Esta oferta refere-se exclusivamente a aplicativos nativos. Não estão incluídos, salvo contratação específica e separada, aplicações web, sites, sistemas web responsivos, PWAs ou plataformas acessadas por navegador. Necessidades desse tipo constituem escopo distinto, com orçamento próprio." },
    ],
  },
  {
    n: 2,
    titulo: "Natureza do valor \"a partir de R$ 5.000,00\"",
    blocos: [
      { tipo: "p", texto: "O valor de R$ 5.000,00 (cinco mil reais) divulgado na oferta é um valor inicial e de referência, correspondente ao ponto de entrada da oferta. Não se trata de preço fechado, fixo ou final para qualquer projeto." },
      { tipo: "p", texto: "O preço final de cada aplicativo depende do escopo efetivamente contratado (funcionalidades, integrações, complexidade, telas, prazos e demais requisitos) e é definido em proposta ou orçamento específico, apresentado por escrito ao cliente antes do início dos trabalhos." },
      { tipo: "p", texto: "Projetos com escopo mais amplo que o escopo mínimo de referência terão valor superior a R$ 5.000,00, informado de forma clara na proposta correspondente." },
    ],
  },
  {
    n: 3,
    titulo: "Definição do escopo e regime de aditivos",
    blocos: [
      { tipo: "p", texto: "O escopo de cada projeto é definido a partir de briefing e proposta aprovados por escrito pelo cliente (por e-mail, mensagem, assinatura ou outro meio que comprove a concordância). A proposta aprovada delimita o que será entregue." },
      { tipo: "p", texto: "Somente o que estiver expressamente descrito na proposta aprovada faz parte do escopo contratado. Qualquer funcionalidade, tela, integração, alteração, serviço ou requisito não previsto na proposta é considerado fora do escopo." },
      { tipo: "p", texto: "Itens fora do escopo poderão ser executados mediante aditivo, com orçamento e prazo próprios, acordados por escrito antes da execução. A Damatech não está obrigada a executar itens não previstos sem aditivo aprovado." },
      { tipo: "p", texto: "Mudanças solicitadas pelo cliente após a aprovação do escopo podem impactar prazo e valor, e serão tratadas pelo regime de aditivos deste artigo." },
    ],
  },
  {
    n: 4,
    titulo: "Condições de pagamento",
    blocos: [
      { tipo: "p", texto: "Para início dos trabalhos, é exigida uma entrada mínima de R$ 2.000,00 (dois mil reais), a título de sinal." },
      { tipo: "p", texto: "O sinal caracteriza o compromisso de contratação e a reserva de agenda e recursos da Damatech para o projeto. A partir da confirmação do sinal, os trabalhos têm início conforme o cronograma da proposta." },
      { tipo: "p", texto: "O saldo remanescente (diferença entre o valor total do projeto e a entrada) é negociável, com condições de parcelamento e prazos de pagamento definidos na proposta específica de cada projeto." },
      { tipo: "p", texto: "A entrega final do aplicativo e a transferência definitiva do código-fonte estão condicionadas à quitação integral do valor acordado, conforme o artigo 12." },
      { tipo: "p", texto: "Atrasos de pagamento por parte do cliente podem suspender a execução e os prazos, sem prejuízo das condições previstas na proposta." },
    ],
  },
  {
    n: 5,
    titulo: "O que está incluso no escopo padrão",
    blocos: [
      { tipo: "p", texto: "Salvo disposição diferente na proposta, o escopo padrão da oferta inclui:" },
      { tipo: "lista", itens: [
        "UI/UX completo: concepção e desenvolvimento da interface e da experiência de uso do aplicativo.",
        "Código-fonte incluso: entregue ao cliente após a quitação integral, nos termos do artigo 12.",
        "1 (um) mês de suporte e garantia após a entrega, nos termos dos artigos 7 e 8.",
        "Publicação na Google Play: a mão de obra de publicação está inclusa, sem custo adicional de serviço pela publicação. Taxas da própria Google e conta de desenvolvedor são tratadas no artigo 6.",
      ] },
    ],
  },
  {
    n: 6,
    titulo: "O que NÃO está incluso e custos de terceiros",
    blocos: [
      { tipo: "p", texto: "Custos de terceiros não estão inclusos no valor do projeto, salvo quando expressamente indicado na proposta. São de responsabilidade do cliente ou combinados caso a caso, nunca presumidos como inclusos." },
      { tipo: "p", texto: "Apple e App Store: a publicação do aplicativo na App Store da Apple é cobrada à parte. Ela envolve conta de desenvolvedor Apple e taxas próprias da plataforma, cuja titularidade e custeio são de responsabilidade do cliente ou combinados na proposta. A Damatech pode prestar o serviço de publicação na App Store mediante orçamento específico." },
      { tipo: "p", texto: "Alternativa somente Android (APK): o cliente pode optar por receber apenas o arquivo APK do aplicativo Android, sem publicação em loja. Nessa hipótese, a distribuição e a instalação do APK são de responsabilidade do cliente." },
      { tipo: "p", texto: "Outros custos de terceiros de responsabilidade do cliente, quando aplicáveis: contas e taxas das lojas (Google e Apple), servidores e hospedagem, serviços de nuvem, APIs e serviços externos pagos, gateways de pagamento, envio de e-mail e SMS, domínios, certificados, licenças de software, fontes, imagens e demais insumos de terceiros." },
      { tipo: "p", texto: "Componentes e bibliotecas de terceiros utilizados no aplicativo seguem suas próprias licenças, conforme o artigo 12." },
    ],
  },
  {
    n: 7,
    titulo: "Suporte incluído",
    blocos: [
      { tipo: "p", texto: "Está incluso 1 (um) mês de suporte, contado a partir da data de aceite da entrega do aplicativo, para acompanhamento e correção de defeitos do escopo entregue, conforme o artigo 8." },
      { tipo: "p", texto: "Encerrado o período de suporte incluído, a continuidade de suporte, manutenção, evolução ou novas funcionalidades ocorre mediante plano de manutenção ou orçamento à parte, acordado por escrito." },
    ],
  },
  {
    n: 8,
    titulo: "Garantia de 1 mês",
    blocos: [
      { tipo: "p", texto: "A garantia de 1 (um) mês, contada da data de aceite da entrega, cobre a correção de defeitos e falhas (bugs) do escopo efetivamente entregue e aprovado, sem custo adicional." },
      { tipo: "p", texto: "A garantia não cobre:" },
      { tipo: "lista", itens: [
        "novas funcionalidades ou qualquer item fora do escopo aprovado;",
        "mudança ou ampliação de escopo;",
        "falhas decorrentes de mau uso, uso indevido ou operação fora das condições previstas;",
        "alterações, integrações ou intervenções feitas por terceiros ou pelo próprio cliente no aplicativo ou no código;",
        "impactos causados por atualizações de sistema operacional, dispositivos, navegadores, lojas ou serviços de terceiros;",
        "problemas originados em conteúdo, dados, credenciais ou informações fornecidos pelo cliente;",
        "indisponibilidade ou mudança de políticas de serviços externos (APIs, gateways, provedores).",
      ] },
      { tipo: "p", texto: "Correções fora da garantia são tratadas por orçamento específico ou por plano de manutenção." },
    ],
  },
  {
    n: 9,
    titulo: "Prazos",
    blocos: [
      { tipo: "p", texto: "Os prazos de cada projeto são definidos na proposta específica e têm natureza estimativa, dependendo do cumprimento das responsabilidades do cliente descritas no artigo 11." },
      { tipo: "p", texto: "Suspendem ou estendem os prazos, sem que isso configure inadimplemento da Damatech, os fatores fora do seu controle, entre eles:" },
      { tipo: "lista", itens: [
        "tempo de análise, aprovação e políticas das lojas (Google e Apple);",
        "dependências e indisponibilidades de serviços ou fornecedores terceiros;",
        "atraso do cliente no fornecimento de conteúdo, materiais, credenciais, aprovações ou pagamentos;",
        "solicitações de alteração e itens em regime de aditivo;",
        "casos fortuitos e de força maior.",
      ] },
      { tipo: "p", texto: "Sempre que um desses fatores impactar o cronograma, a Damatech comunicará o cliente e ajustará o prazo de forma proporcional." },
    ],
  },
  {
    n: 10,
    titulo: "Não garantia de aprovação nas lojas",
    blocos: [
      { tipo: "p", texto: "A publicação de aplicativos está sujeita às políticas próprias e à análise da Apple (App Store) e da Google (Google Play), que são independentes da Damatech." },
      { tipo: "p", texto: "A Damatech se compromete a desenvolver e adequar o aplicativo às diretrizes técnicas conhecidas das lojas, mas não garante a aprovação do aplicativo nem o prazo de análise por parte de Apple ou Google, por serem decisões exclusivas dessas plataformas." },
      { tipo: "p", texto: "Caso uma loja exija ajustes, a Damatech avaliará a demanda: correções relacionadas ao escopo entregue serão tratadas conforme a garantia; adequações que representem novo escopo serão tratadas por aditivo." },
    ],
  },
  {
    n: 11,
    titulo: "Responsabilidades do cliente",
    blocos: [
      { tipo: "p", texto: "O cliente é responsável por:" },
      { tipo: "lista", itens: [
        "fornecer, em tempo hábil, todo o conteúdo necessário ao projeto (textos, imagens, logotipos, dados, materiais e informações);",
        "providenciar e disponibilizar, quando aplicável, as contas e credenciais das lojas (conta de desenvolvedor Google e/ou Apple) e de serviços de terceiros necessários;",
        "prestar aprovações e respostas em tempo hábil nas etapas que dependem de sua manifestação;",
        "garantir a veracidade e a licitude das informações, dos materiais e do conteúdo fornecidos;",
        "assegurar a conformidade legal do conteúdo e do negócio do aplicativo, incluindo direitos de uso de marcas, imagens e conteúdos de terceiros.",
      ] },
      { tipo: "p", texto: "O descumprimento dessas responsabilidades pode impactar prazos, custos e a viabilidade da entrega, sem responsabilidade da Damatech." },
    ],
  },
  {
    n: 12,
    titulo: "Propriedade intelectual",
    blocos: [
      { tipo: "p", texto: "O código-fonte desenvolvido especificamente para o projeto é entregue e transferido ao cliente após a quitação integral do valor acordado." },
      { tipo: "p", texto: "Antes da quitação integral, a Damatech mantém a titularidade sobre o trabalho desenvolvido." },
      { tipo: "p", texto: "Componentes, bibliotecas, frameworks e recursos de terceiros eventualmente utilizados no aplicativo permanecem sujeitos às suas próprias licenças, que continuam a reger seu uso mesmo após a entrega." },
      { tipo: "p", texto: "Uso como portfólio: a Damatech poderá utilizar o projeto como referência de portfólio e case (menção, imagens e descrição do trabalho). O cliente que preferir sigilo pode solicitar a exclusão dessa utilização (opt-out) mediante acordo por escrito." },
    ],
  },
  {
    n: 13,
    titulo: "Proteção de dados (LGPD)",
    blocos: [
      { tipo: "p", texto: "Caso o aplicativo trate dados pessoais, as partes observarão a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados, LGPD)." },
      { tipo: "p", texto: "Em regra, o cliente é o controlador dos dados pessoais tratados no aplicativo, responsável por definir finalidade, base legal, consentimento, transparência perante os titulares e conformidade do tratamento com a lei." },
      { tipo: "p", texto: "Quando a Damatech tratar dados pessoais por conta e ordem do cliente, atuará como operadora, seguindo as instruções do controlador e adotando medidas técnicas de segurança compatíveis com o serviço prestado." },
      { tipo: "p", texto: "A responsabilidade pela licitude do tratamento, pela relação com os titulares e pelo cumprimento dos direitos previstos na LGPD, no que se refere ao negócio e ao conteúdo do aplicativo, é do cliente na condição de controlador." },
    ],
  },
  {
    n: 14,
    titulo: "Limitação de responsabilidade",
    blocos: [
      { tipo: "p", texto: "A responsabilidade total da Damatech, por qualquer causa relacionada ao projeto, fica limitada ao valor efetivamente pago pelo cliente pelo respectivo projeto." },
      { tipo: "p", texto: "Nos limites permitidos pela lei, a Damatech não responde por danos indiretos, lucros cessantes, perda de receita, perda de dados, perda de oportunidade ou danos incidentais ou consequenciais decorrentes do uso ou da impossibilidade de uso do aplicativo." },
      { tipo: "p", texto: "A Damatech não responde por indisponibilidades, falhas ou mudanças de serviços, plataformas e lojas de terceiros, nem por decisões dessas plataformas quanto à aprovação, à manutenção ou à remoção do aplicativo." },
      { tipo: "p", texto: "As limitações deste artigo aplicam-se no limite da legislação vigente e não afastam direitos que sejam inderrogáveis por norma cogente." },
    ],
  },
  {
    n: 15,
    titulo: "Cancelamento e rescisão",
    blocos: [
      { tipo: "p", texto: "O contrato pode ser encerrado por qualquer das partes, mediante comunicação por escrito, observadas as condições da proposta específica." },
      { tipo: "p", texto: "Em caso de cancelamento pelo cliente após o início dos trabalhos, será devido o pagamento pelo trabalho já executado até a data do encerramento." },
      { tipo: "p", texto: "Natureza do sinal: a entrada paga a título de sinal destina-se a reservar agenda e recursos e a custear o início da execução. Em caso de desistência do cliente, o sinal é compensado com o trabalho já executado, com retenção proporcional ao serviço prestado, limitada ao valor do sinal, conforme a política definida na proposta específica e a legislação aplicável." },
      { tipo: "p", texto: "Materiais e credenciais fornecidos pelo cliente serão devolvidos ou descartados conforme acordado, respeitada a LGPD." },
    ],
  },
  {
    n: 16,
    titulo: "Alterações do regulamento, vigência e prevalência",
    blocos: [
      { tipo: "p", texto: "Este Regulamento entra em vigor na data indicada no topo e pode ser alterado ou atualizado pela Damatech a qualquer tempo, valendo, para cada contratação, a versão vigente na data da respectiva proposta." },
      { tipo: "p", texto: "Este Regulamento tem caráter geral. Havendo conflito entre este Regulamento e a proposta específica assinada ou aprovada para um projeto, prevalecem as condições da proposta específica naquilo que a contrariar." },
    ],
  },
  {
    n: 17,
    titulo: "Legislação aplicável e foro",
    blocos: [
      { tipo: "p", texto: "Este Regulamento e os contratos dele decorrentes regem-se pela legislação brasileira, em especial o Código Civil e, quando aplicável à relação, o Código de Defesa do Consumidor (Lei nº 8.078/1990)." },
      { tipo: "p", texto: "Fica eleito o foro da Comarca de Guarulhos, São Paulo, para dirimir eventuais controvérsias, ressalvadas as hipóteses em que norma cogente do Código de Defesa do Consumidor assegure ao consumidor o foro de seu domicílio." },
    ],
  },
  {
    n: 18,
    titulo: "Contato",
    blocos: [
      { tipo: "p", texto: "Damatech Solutions, Rafael Damasceno Santana Soluções em Tecnologia Ltda, CNPJ 22.364.409/0001-20, sede em Guarulhos, São Paulo." },
      { tipo: "p", texto: "E-mail: contato@damatechsolutions.com.br. WhatsApp: +55 11 97795-3952. Site: damatechsolutions.com.br." },
      { tipo: "p", texto: "Para dúvidas sobre esta oferta, para solicitar um orçamento ou para receber a proposta específica do seu projeto, entre em contato pelos canais acima." },
    ],
  },
];
