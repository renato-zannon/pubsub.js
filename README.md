pubsub.js - Um servidor pubsub UDP em Node.js
=============================================

Este aplicação foi desenvolvida por Renato Zannon e Ana Carolina Silva para a
disciplina de Laboratório de Redes de Computadores, na Universidade Federal do
ABC.

Trata-se de uma implementação simplificada de um servidor/cliente da
modalidade publisher/subscriber, usando o protocolo UDP para o transporte das
mensagens.

Servidor
--------

Para o desenvolvimento do servidor foi utilizada a plataforma
[Node.js](http://nodejs.org), conhecida pelo alto nível de concorrência e
baixo consumo de recursos.

O Node.js ainda é considerada uma tecnologia recente, mas sua atual maturidade
mostrou-se mais do que suficiente para este projeto.

Para a execução do servidor, usar o comando (é necessário ter o pacote
'nodejs' instalado):

    node server/main.js

Então, o servidor ficará bloqueado, à espera de conexões.

Clientes
--------

Foram desenvolvidos dois clientes de teste, usando a linguagem
[Ruby](http://www.ruby-lang.org).

O primeiro deles, pensado para testes interativos, é o 'simple', localizado em
'client/simple.rb'. Para chamá-lo, basta fazer (com o servidor já rodando):

    ruby client/simple.rb [nome do canal]

Isto deve abrir um prompt para o envio de mensagens ao servidor. Caso outro
cliente esteja em execução no mesmo canal, as mensagens enviadas por um devem
ser recebidas pelo outro.

Além do cliente 'simple.rb', há também um cliente não-interativo, o 'spammer',
que apenas envia continuamente a mesma mensagem para o mesmo canal. O intuito
deste cliente é poder testar os níveis de concorrência que o servidor suporta
enquanto atende a outros clientes (interativos ou não).

Para a executar o spammer, basta rodar o comando:

    ruby client/spammer.rb [nome do canal] [mensagem]

No arquivo client/client.rb encontra-se a lógica que é compartilhada por ambos
os clientes.
