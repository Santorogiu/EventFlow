let participantes = [
  {
    nome: "Giulia Santoro",
    email: "giulia@gmail.com",
    dataInscricao: new Date(2024, 9, 15, 12, 31),
    dataCheckIn: new Date(2024, 9, 15, 22, 00)
  },
  {
    nome: "Matheus Bogres",
    email: "MatheusB@gmail.com",
    dataInscricao: new Date(2023, 2, 11, 9, 00),
    dataCheckIn: new Date(2024, 2, 15, 22, 32)
  },
  {
    nome: "Luana Costa",
    email: "luana.costa@gmail.com",
    dataInscricao: new Date(2024, 7, 12, 11, 15),
    dataCheckIn: new Date(2024, 9, 15, 19, 45)
  },
  {
    nome: "Rafael Almeida",
    email: "rafael.almeida@gmail.com",
    dataInscricao: new Date(2024, 5, 20, 13, 45),
    dataCheckIn: new Date(2024, 9, 15, 21, 30)
  },
  {
    nome: "Carla Mendes",
    email: "carla.mendes@gmail.com",
    dataInscricao: new Date(2023, 10, 1, 10, 00),
    dataCheckIn: new Date(2024, 9, 15, 20, 50)
  },
  {
    nome: "Bruno Oliveira",
    email: "bruno.oliveira@gmail.com",
    dataInscricao: new Date(2023, 8, 5, 14, 00),
    dataCheckIn: new Date(2024, 9, 15, 21, 15)
  },
  {
    nome: "Isabela Farias",
    email: "isabela.farias@gmail.com",
    dataInscricao: new Date(2023, 12, 30, 9, 00),
    dataCheckIn: new Date(2024, 9, 15, 20, 10)
  },
  {
    nome: "Felipe Nunes",
    email: "felipe.nunes@gmail.com",
    dataInscricao: new Date(2024, 3, 15, 16, 45),
    dataCheckIn: new Date(2024, 9, 15, 21, 50)
  },
  {
    nome: "Amanda Rocha",
    email: "amanda.rocha@gmail.com",
    dataInscricao: new Date(2024, 4, 22, 18, 20),
    dataCheckIn: new Date(2024, 9, 15, 19, 30)
  },
  {
    nome: "Diego Ferreira",
    email: "diego.ferreira@gmail.com",
    dataInscricao: new Date(2023, 9, 18, 12, 00),
    dataCheckIn: new Date(2024, 9, 15, 21, 00)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs (Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
     data-email="${participante.email}"
     onclick="fazerCheckIn(event)"
    >
     Confirmar check-in
     </button>
    
    `
  }
  
  return `
    <tr>
    <td>
      <strong>${participante.nome}</strong>
      <br>
      <small>${participante.email}</small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
 `
}

const atualizarLista = (participanteS) => {
  let output =  ""
 // estrutura de repeticao - loop
 for(let participante of participantes) {
  output = output + criarNovoParticipante(participante)
 }
 // substituir informação do HTML
 document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData (event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  //verificar se o participante já existe 
  const participanteExiste = participantes.find(
    (p) => {
      return p.email == participante.email
    }
  )

  if (participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //limpar o formulario 
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  //confirmar se realmente quer o check-in]
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if (confirm(mensagemConfirmacao) == false) {
    return 
  }

  // encontrar o participante dentro da lista 
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  //atualizar o check-in do participante 
  participante.dataCheckIn = new Date()


  // atualizar a lista de participantes 
  atualizarLista(participantes)
}

