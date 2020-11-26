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
        // Setting up player vars
        playerMaxHealth = player.health;
        playerMaxMana = player.mana;
        maxPlayerTime = Math.floor( (2 * (player.agility + player.speed)) / ((player.agility) * (player.speed) / 100) ); //Timer max time

        let getInterface = document.querySelector(".interface");
        getInterface.innerHTML = '<img src="imgs/'+classType+'.png" class="img-avatar"><div><h3>'+classType+'</h3><p class="health-player">Health : '+ player.health+'</p><p class="mana-player">Mana : '+ player.mana+'</p><p class="strength-player">Strength : '+ player.strength+'</p><p>Agility : '+ player.agility+'</p><p>Speed : '+ player.speed+'</p></div>';
        getInterface.style.display = "flex";
        getInterface.innerHTML += '<progress class="local-progress-bar" value="0" max='+maxPlayerTime+' id="player-progress-bar"></progress>';
        

    
    },
    setPreFight: function() {
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        let getArena = document.querySelector(".arena")
        getHeader.innerHTML = '<p>To the Battlefield!</p>'
        //getActions.innerHTML = '<a href="#" role="button" class="btn prefight" onclick="GameManager.setFight()">Looking for Battle</a>';
        getActions.innerHTML = '<button type="button" class="btn btn-danger btn-lg btn-block tooltipp" onclick="GameManager.setFight()">Looking for Battle <span class="tooltipptext">Finds a random enemy to fight</span> </button>'; 
        getArena.style.visibility = "visible";
    },

    setFight : function() {
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        let getArena = document.querySelector(".arena");
        let getEnemy = document.querySelector(".enemy");


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

        maxEnemyTime = Math.floor( (2 * (enemy.agility + enemy.speed)) / ((enemy.agility) * (enemy.speed) / 100) );
        console.log(maxEnemyTime);

        getHeader.innerHTML = '<p>Choose your Action!</p>';

        // getActions.innerHTML = '<a href="#" class="btn-prefight" onclick="PlayerMoves.calcAttack()">Attack!  </a>';
        // getActions.innerHTML += '<a href="#" class="btn-prefight-boost" onclick="PlayerMoves.calcBoost()">Boost next Attack!</a>';

        getActions.innerHTML = '<button type="button" class="btn btn-danger btn-lg btn-attack btn-player" onclick="PlayerMoves.playerAttackOnTimer()">Attack!  </button>';
        getActions.innerHTML += '<button type="button" class="btn btn-warning btn-lg btn-boost tooltipp btn-player" onclick="PlayerMoves.calcBoost()">Boost next Attack! <span class="tooltipptext">Costs 20 Strength <br>Damage Mutliplier </span></button>'; 

        if (player.mana > 10)
        {
            getActions.innerHTML += '<button type="button" class="btn btn-success btn-lg btn-heal tooltipp btn-player" onclick="PlayerMoves.calcHeal()">Heal Self <span class="tooltipptext" id="mana-tooltip">Costs 40 Mana <br>Healing scales on Mana</span> </button>'; 
        }

        getArena.innerHTML = "<p>Choose an action above! Your enemy isn't going to wait!</p>";
        // if (player.speed > enemy.speed){
        //     getArena.innerHTML = '<p>Quick Hands! You attack before your enemy.</p>';
        // }
        // else{
        //     getArena.innerHTML = '<p>The enemy is faster and attacks before you.</p>';
        // }

        getEnemy.innerHTML = '<progress class="local-progress-bar" value="0" max='+maxEnemyTime+' id="enemy-progress-bar"></progress>';
        //document.getElementById("enemy-progress").innerHTML =  '<div class="progress-bar bg-danger" style="width: 50%;" ></div><br></br>';
        startEnemyTimer();
        getEnemy.innerHTML += '<img src="imgs/Placeholder2(1).png" alt="'+ enemy.enemyType+'" class="img-avatar"><div><h3>'+enemy.enemyType+'</h3><p class="health-enemy">Health : '+enemy.health+'</p><p>Mana : '+enemy.mana+'</p><p>Strength : '+enemy.strength+'</p><p>Agility : '+enemy.agility+'</p><p>Speed : '+enemy.speed+'</p></div>';
    }
}
