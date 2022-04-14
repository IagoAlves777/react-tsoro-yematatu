# React Tsoro Yematatu com websocket
Trabalho da cadeira de programação paralela e distrubuida no qual foi implementado o jogo tsoro yematatu um jogo africano similar ao jogo da velha.

# Como rodar o projeto?
Para rodar o projeto é nessessario ter o node instalado, o projeto é divido em 2 partes, servidor e cliente. Ao baixar o projeto é necessário instalar as dependências de ambas as partes.
Para isso basta abrir cada uma deles no prompt de comando e executar o comando "npm install".
Após ter as dependências instaladas basta executar o comando "npm start" tanto no servidor quanto no cliente para rodar a aplicação.
É necessário abrir abrir o localhost:3000 em 2 navegadores diferentes pra que possa se conectar como 2 players diferentes.


# Como jogar?
O jogo é composto por um tabuleiro que tem forma de um triângulo isósceles e algumas peças.  Para jogá-lo cada jogador pega 3 peças da mesma cor, na sua vez, coloca uma peça no seu círculo do tabuleiro que ainda não foi ocupado, quando todas as 6 peças, 3 de cada jogador estiverem no seus devidos lugares, move-se uma peça por vez, de um círculo a outro que esteja vazio, em linha reta. Cada jogador só pode ocupar um único círculo por uma de suas peças. Ganha quem primeiro colocar suas três peças em linha reta, de acordo com as retas que ligam os círculos.
Para mover uma peça de lugar basta clicar nela e que ela será removido de onde estava e clicar onde você quer realica-lá

# Empate e desistencia 
Durante a partida se um dos jogadores se desconectar o outro vence automaticamente, é possivel solicitar um empate através do botão de "draw game" ou digitando no chato o comando "/draw".
Já para desistir o jogador pode simplesmete fechar o jogo ou digitar no chat "/ff" para voltar ao menu principal.

# O Jogo
![tsoro-yematatu-1](https://user-images.githubusercontent.com/53544551/163476369-8f266767-2b20-4bb6-ac0d-3d0a98cf5847.png)
![tsoro-yematatu-3](https://user-images.githubusercontent.com/53544551/163476418-62b29229-2110-4200-8074-64eb3f3c1287.png)
![tsoro-yematatu-3](https://user-images.githubusercontent.com/53544551/163476489-0191c8b4-1f9e-4199-80b2-6487b7d02880.png)
![tsoro-yematatu-4](https://user-images.githubusercontent.com/53544551/163476499-7d4fa5e6-ea92-4130-a04a-94020c4ee373.png)
![tsoro-yematatu-5](https://user-images.githubusercontent.com/53544551/163476509-efe3ebd9-845a-45af-92d6-e74b42cd3450.png)
