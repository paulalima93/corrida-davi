class Game {
  constructor() {}

  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount = player.getCount();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  play() {
    this.handleElements();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      //índice da matriz
      var index = 0;
      for (var plr in allPlayers) {
        //adicione 1 ao índice para cada loop
        index = index + 1;

        //use os dados do banco de dados para exibir os carros nas direções x e y
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        
      }

      this.handlePlayerControls();

      drawSprites();
    }
  }


  handlePlayerControls(){
   if (keyIsDown(UP_ARROW)) {
    player.positionY += 10;
    player.update();
   }
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }


  getState(){
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", data =>{
      gameState = data.val();
    })
  }

  updateState(state){
    database.ref("/").update({
      gameState: state
    })
  }
}
