let GameManager = {
    setGameStart: function(classType) {
        this.resetPlayer(classType);
        this.setPreFight(); 
    },
    resetPlayer: function(classType) {
        switch (classType) {
            case "Warrior":
                player = warrior;
                break;
            
            case "Rogue":
                player = rogue;
                break;

            case "Mage":
                player = mage;
                break;

            case "Hunter":
                player = hunter;
                break;

            default:
                break;
        }

        let getInterface = document.querySelector(".interface");
        getInterface.innerHTML = '<img src="Placeholder3.jpg" class="img-avatar"><div><h3>'+classType+'</h3><p class="health-player">Health : '+ player.health+'</p><p class="mana-player">Mana : '+ player.mana+'</p><p>Strength : '+ player.strength+'</p><p>Agility : '+ player.agility+'</p><p>Speed : '+ player.speed+'</p></div>';
        getInterface.style.display = "flex";
    
    },
    setPreFight: function() {
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        let getArena = document.querySelector(".arena")
        getHeader.innerHTML = '<p>Lets Get Fighting!</p>'
        //getActions.innerHTML = '<a href="#" role="button" class="btn prefight" onclick="GameManager.setFight()">Looking for Battle</a>';
        getActions.innerHTML = '<button type="button" class="btn btn-danger btn-lg btn-block" onclick="GameManager.setFight()">Looking for Battle</button>';
        getArena.style.visibility = "visible";
    },

    setFight : function() {
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        let getArena = document.querySelector(".arena");
        let getEnemy = document.querySelector(".enemy");

        let enemy0 = new Enemy("Goblin", 100, 0 ,50 ,100, 100);
        let enemy1 = new Enemy("Troll", 200, 0, 150 , 80 ,100);

        let chooseRandomEnemy = Math.floor(Math.random()*Math.floor(2));

        switch (chooseRandomEnemy) {
            case 0:
                enemy = enemy0;
                break;
            case 1:
                enemy = enemy1;
            default:
                break;
        }

        getHeader.innerHTML = '<p>Choose your Action!</p>';

        // getActions.innerHTML = '<a href="#" class="btn-prefight" onclick="PlayerMoves.calcAttack()">Attack!  </a>';
        // getActions.innerHTML += '<a href="#" class="btn-prefight-boost" onclick="PlayerMoves.calcBoost()">Boost next Attack!</a>';

        getActions.innerHTML = '<button type="button" class="btn btn-danger btn-lg btn-attack" onclick="PlayerMoves.calcAttack()">Attack!  </button>';
        getActions.innerHTML += '<button type="button" class="btn btn-warning btn-lg btn-boost" onclick="PlayerMoves.calcBoost()">Boost next Attack!</button>';

        if (player.mana > 10)
        {
            getActions.innerHTML += '<button type="button" class="btn btn-success btn-lg btn-heal" onclick="PlayerMoves.calcHeal()">Heal Self</button>';
        }
        if (player.speed > enemy.speed){
            getArena.innerHTML = '<p>Quick Hands! You attack before your enemy.</p>';
        }
        else{
            getArena.innerHTML = '<p>The enemy is faster and attacks before you.</p>';
        }
        getEnemy.innerHTML = '<img src="Placeholder2.png" alt="'+ enemy.enemyType+'" class="img-avatar"><div><h3>'+enemy.enemyType+'</h3><p class="health-enemy">Health : '+enemy.health+'</p><p>Mana : '+enemy.mana+'</p><p>Strength : '+enemy.strength+'</p><p>Agility : '+enemy.agility+'</p><p>Speed : '+enemy.speed+'</p></div>';
    }
}
