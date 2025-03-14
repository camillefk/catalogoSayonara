# Catálogo Virtual - Um sistema para gerenciamento de aluguéis de Bolos Cenográficos

Este projeto consiste em um catálogo virtual onde os usuários poderão escolher um produto do catálogo e verificar se a data escolhida para o aluguel está disponivel. O projeto foi pensado para otimizar o tempo tanto dos clientes da empresa Sayonara Bolos como para os funcionários dessa empresa.

Assim que o usuário escolher o produto e o sistemas checar se a data escolhida está disponível, a partir de uma API, uma mensagem automatica será enviada para o whatsapp da empresa, informando o nome do cliente, a descrição do produto e a data para o aluguel. O cliente efetuará o pagamento direto com a loja. Após o pagamento, o usuário administrador poderá entrar no sistema utilizando o login de Admin e modificar as datas disponiveis para o aluguel daquele produto.

# Funcionalidades:
Catálogo de Produtos: Visualização de produtos com detalhes como nome, descrição, altura, diâmetro e preço.
CRUD de Produtos (Apenas administrador): Adicionar, editar e excluir produtos no catálogo.
Persistência de Dados: Utilização de MongoDB para armazenar informações de produtos de forma eficiente.
Interface Intuitiva: Front-end em React, proporcionando uma experiência fluida e interativa.

# Tecnologias Utilizadas:
Frontend: React, JavaScript
Backend: Node.js, Express
Banco de Dados: MongoDB