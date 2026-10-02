import { Component } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-biblioteca',
  imports: [MatPaginatorModule, FormsModule],
  templateUrl: './biblioteca.html',
  styleUrl: './biblioteca.css',
})
export class Biblioteca {

livros = [
  {
    titulo: 'Lino',
    autor: 'André Neves',
    imagem: 'images/lino.jpg',
    disponivel: true,
    sinopse: 'Lino é um porquinho de brinquedo que vive em uma loja junto de sua amiga Lua. Quando Lua é levada por uma criança, Lino passa a sentir sua falta e começa uma jornada em busca de uma nova amizade.',
    anoLancamento: 2010,
    isbn: '9788574064481'
  },
  {
    titulo: 'O triste fim de Policarpo Quaresma',
    autor: 'Lima Barreto',
    imagem: 'images/policarpo.jpg',
    disponivel: false,
    sinopse: 'Policarpo Quaresma é um funcionário público extremamente patriota que acredita que o Brasil pode se tornar uma grande nação. Suas ideias idealistas entram em conflito com a realidade política e social do país.',
    anoLancamento: 1915,
    isbn: '9788535911594'
  },
  {
    titulo: 'Fundamentos de Física',
    autor: 'Jearl Walker',
    imagem: 'images/fisica.jpg',
    disponivel: true,
    sinopse: 'Obra didática que apresenta os principais conceitos da Física, abordando temas como mecânica, termologia, ondas, eletricidade, magnetismo e física moderna, com explicações e exercícios.',
    anoLancamento: 1977,
    isbn: '9788521636328'
  },
  {
    titulo: 'A cinco passos de você',
    autor: 'Rachael Lippincott',
    imagem: 'images/passos.jpg',
    disponivel: true,
    sinopse: 'Stella e Will são dois jovens que vivem com fibrose cística e precisam manter distância física para evitar infecções. Apesar das restrições, os dois desenvolvem uma forte ligação e precisam lidar com os limites impostos pela doença.',
    anoLancamento: 2018,
    isbn: '9788551004337'
  },
  {
    titulo: 'Vidas Secas',
    autor: 'Graciliano Ramos',
    imagem: 'images/vidas-secas.jpg',
    disponivel: true,
    sinopse: 'A obra acompanha Fabiano, Sinhá Vitória, os dois filhos e a cadela Baleia durante sua luta pela sobrevivência no sertão nordestino, marcado pela seca, pobreza e exploração.',
    anoLancamento: 1938,
    isbn: '9788501015123'
  },
  {
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    imagem: 'images/dom-casmurro.jpg',
    disponivel: true,
    sinopse: 'Bentinho narra sua vida desde a juventude e seu relacionamento com Capitu. Já velho, ele tenta reconstruir o passado e questiona se foi traído pela esposa, deixando ao leitor a dúvida sobre a verdadeira natureza dos acontecimentos.',
    anoLancamento: 1899,
    isbn: '9788535914847'
  },
  {
    titulo: 'Memórias Póstumas de Brás Cubas',
    autor: 'Machado de Assis',
    imagem: 'images/bras-cubas.jpg',
    disponivel: false,
    sinopse: 'Brás Cubas, depois de morto, decide narrar sua própria vida. Com ironia e humor, ele relembra sua infância, seus relacionamentos, ambições e fracassos, enquanto critica a sociedade de seu tempo.',
    anoLancamento: 1881,
    isbn: '9788535910665'
  },
  {
    titulo: 'O Cortiço',
    autor: 'Aluísio Azevedo',
    imagem: 'images/o-cortico.jpg',
    disponivel: true,
    sinopse: 'A história retrata a vida dos moradores de um cortiço no Rio de Janeiro e explora as relações entre diferentes classes sociais, mostrando conflitos, ambições e a influência do ambiente sobre os personagens.',
    anoLancamento: 1890,
    isbn: '9788535914069'
  },
  {
    titulo: 'Capitães da Areia',
    autor: 'Jorge Amado',
    imagem: 'images/capitaes.jpg',
    disponivel: true,
    sinopse: 'Um grupo de meninos abandonados vive nas ruas de Salvador e sobrevive praticando pequenos furtos. A narrativa mostra suas dificuldades, amizades, sonhos e a desigualdade social que os cerca.',
    anoLancamento: 1937,
    isbn: '9788535911693'
  },
  {
    titulo: 'Iracema',
    autor: 'José de Alencar',
    imagem: 'images/iracema.jpg',
    disponivel: true,
    sinopse: 'Iracema, uma jovem indígena, apaixona-se pelo português Martim. O romance apresenta o encontro entre culturas indígenas e europeias e utiliza a história de amor como uma representação simbólica da formação do povo brasileiro.',
    anoLancamento: 1865,
    isbn: '9788535914052'
  },
  {
    titulo: 'O Alienista',
    autor: 'Machado de Assis',
    imagem: 'images/o-alienista.jpg',
    disponivel: true,
    sinopse: 'O médico Simão Bacamarte decide estudar a mente humana e cria uma instituição para internar pessoas consideradas loucas. Aos poucos, sua definição de normalidade se torna cada vez mais questionável.',
    anoLancamento: 1882,
    isbn: '9788535910665'
  },
  {
    titulo: 'A Hora da Estrela',
    autor: 'Clarice Lispector',
    imagem: 'images/hora-da-estrela.jpg',
    disponivel: true,
    sinopse: 'Macabéa é uma jovem nordestina que vive de forma simples e solitária no Rio de Janeiro. A narrativa acompanha sua rotina e seus sonhos enquanto questiona a pobreza, a invisibilidade social e a própria construção de uma história.',
    anoLancamento: 1977,
    isbn: '9788535911952'
  },
  {
    titulo: 'Grande Sertão: Veredas',
    autor: 'João Guimarães Rosa',
    imagem: 'images/grande-sertao.jpg',
    disponivel: false,
    sinopse: 'Riobaldo narra suas memórias como jagunço no sertão brasileiro, refletindo sobre amizade, violência, amor, destino, fé e a existência de Deus e do diabo.',
    anoLancamento: 1956,
    isbn: '9788520920190'
  },
  {
    titulo: 'O Auto da Compadecida',
    autor: 'Ariano Suassuna',
    imagem: 'images/auto-da-compadecida.jpg',
    disponivel: true,
    sinopse: 'João Grilo e Chicó são dois amigos pobres que vivem de pequenos golpes no sertão nordestino. Com humor e esperteza, enfrentam situações envolvendo autoridades, religiosos e outros moradores da região.',
    anoLancamento: 1955,
    isbn: '9788520930847'
  },
  {
    titulo: 'Macunaíma',
    autor: 'Mário de Andrade',
    imagem: 'images/macunaima.jpg',
    disponivel: true,
    sinopse: 'Macunaíma é um herói indígena que passa por diversas aventuras pelo Brasil em busca de sua muiraquitã. A obra mistura mitos, folclore e diferentes elementos culturais brasileiros.',
    anoLancamento: 1928,
    isbn: '9788535911686'
  },
  {
    titulo: 'Memórias de um Sargento de Milícias',
    autor: 'Manuel Antônio de Almeida',
    imagem: 'images/memorias-sargento.jpg',
    disponivel: true,
    sinopse: 'Leonardo é um jovem malandro que vive diversas confusões no Rio de Janeiro do início do século XIX. A narrativa acompanha suas aventuras e relações enquanto retrata costumes e personagens da sociedade carioca.',
    anoLancamento: 1854,
    isbn: '9788535914038'
  },
  {
    titulo: 'Senhora',
    autor: 'José de Alencar',
    imagem: 'images/senhora.jpg',
    disponivel: false,
    sinopse: 'Aurélia Camargo, uma jovem rica, reencontra Fernando Seixas, homem que havia abandonado seu amor por interesse financeiro. Após enriquecer, ela decide casar-se com ele e usar o casamento para confrontá-lo.',
    anoLancamento: 1875,
    isbn: '9788535914045'
  },
  {
    titulo: 'A Moreninha',
    autor: 'Joaquim Manuel de Macedo',
    imagem: 'images/a-moreninha.jpg',
    disponivel: true,
    sinopse: 'Augusto faz uma aposta com seus amigos de que não conseguirá manter uma paixão por mais de quinze dias. Durante uma viagem à ilha de Paquetá, ele conhece Carolina, a Moreninha, e sua promessa começa a ser colocada à prova.',
    anoLancamento: 1844,
    isbn: '9788535914021'
  },
  {
    titulo: 'O Primo Basílio',
    autor: 'Eça de Queirós',
    imagem: 'images/primo-basilio.jpg',
    disponivel: true,
    sinopse: 'Luísa vive um casamento aparentemente tranquilo quando seu primo Basílio retorna a Lisboa. Os dois iniciam um relacionamento secreto, mas uma criada descobre a situação e passa a usar a informação para chantagear Luísa.',
    anoLancamento: 1878,
    isbn: '9788535913277'
  },
  {
    titulo: 'Quincas Borba',
    autor: 'Machado de Assis',
    imagem: 'images/quincas-borba.jpg',
    disponivel: true,
    sinopse: 'Rubião recebe uma herança de Quincas Borba com a condição de cuidar de seu cachorro, que também se chama Quincas Borba. Ao enriquecer, Rubião entra em contato com uma sociedade marcada por interesses, ambição e manipulação.',
    anoLancamento: 1891,
    isbn: '9788535910672'
  }
];

busca: string = '';
livrosVisiveis = this.livros.slice(0, 5);
livrosFiltrados = this.livros;

  mudarPagina(event: PageEvent) {

    const inicio = event.pageIndex * event.pageSize;
    const fim = inicio + event.pageSize;

    this.livrosVisiveis = this.livrosFiltrados.slice(inicio, fim);
  }


buscarLivro( ){
  const termo = this.busca.toLocaleLowerCase().trim();

  this.livrosFiltrados = this.livros.filter(livro =>
    livro.titulo.toLocaleLowerCase().trim().includes(termo) ||
    livro.autor.toLocaleLowerCase().trim().includes(termo) ||
    livro.isbn.toLocaleLowerCase().trim().includes(termo)
  );

  this.livrosVisiveis = this.livrosFiltrados.slice(0, 5);
}

}


