let pauseCondition = true;
let enemies = [];
var gameOutcome;
var isPaused = false;

let music_active = false;
var battle_music = new Audio('audio/battle-music.mp3');
var ff7_victory = new Audio('audio/ff7_victory.wav');
var ff7_defeat = new Audio('audio/ff7_defeat.wav');

battle_music.loop = true;
battle_music.volume = 0.1;
ff7_victory.volume = 0.5;
ff7_defeat.volume = 0.5;

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

        maxPlayerTime = Math.floor( (2 * (player.agility + player.speed)) / ((player.agility) * (player.speed) / 120) ); //Timer max time
        maxPlayerUltTime = Math.floor(( maxPlayerTime * player.health ) / player.speed);

        let getInterface = document.querySelector(".interface");
        getInterface.innerHTML = '<img src="imgs/'+classType.toLowerCase()+'.png" class="img-avatar"><div><h3>'+classType+'</h3><p class="health-player">Health : '+ player.health+'</p><p class="mana-player">Mana : '+ player.mana+'</p><p class="strength-player">Strength : '+ player.strength+'</p><p>Agility : '+ player.agility+'</p><p>Speed : '+ player.speed+'</p> <p> <p class="progress-indicator" id="player-progress-indicator"></p> <progress class="local-progress-bar" value="0" max='+maxPlayerTime+' id="player-progress-bar"> </progress> </p> </div>';
        getInterface.style.display = "flex";
        //getInterface.innerHTML += '<progress class="local-progress-bar" value="0" max='+maxPlayerTime+' id="player-progress-bar"></progress> <p class="progress-indicator" id="player-progress-indicator"></p>';
        

    
    },
    setPreFight: function() {
        if(music_active == true )
        {
            battle_music.play();
            $("#music-toggle")[0].checked = true;
        }
        
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        let getArena = document.querySelector(".arena");
        getHeader.innerHTML = '<p>To the Battlefield!</p> ';
        //getActions.innerHTML = '<a href="#" role="button" class="btn prefight" onclick="GameManager.setFight()">Looking for Battle</a>';
        getActions.innerHTML = '<button type="button" class="btn btn-danger btn-lg btn-block tooltipp" onclick="GameManager.singleFight()">Looking for Battle <span class="tooltipptext">Finds a random enemy to fight</span> </button>'; 
        getActions.innerHTML += '<button type="button" class="btn btn-warning btn-lg btn-block tooltipp" onclick="GameManager.gauntletFight()">Gauntlet Battle <span class="tooltipptext">Battle multiple enemies at once</span> </button>';
        getArena.style.visibility = "visible";
    },

    setFight : function() {
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        let getArena = document.querySelector(".arena");
        let getEnemy = document.querySelector(".enemy");


        let chooseRandomEnemy = Math.floor(Math.random()*Math.floor(3));


        
        switch (chooseRandomEnemy) {
            case 0:
                enemy = enemy0;
                break;
            case 1:
                enemy = enemy1;
                break
            case 2:
                enemy = enemy2;
                break
            default:
                break;
        }

        maxEnemyTime = Math.floor( (2 * (enemy.agility + enemy.speed)) / ((enemy.agility) * (enemy.speed) / 120) );

        //Pause Timer
        //getHeader.innerHTML = '<p>Choose your Action!</p> <button onclick="GameManager.pauseFight()" class="btn btn-primary btn-pause"> Pause </button>';


        getActions.innerHTML = '<button type="button" class="btn btn-danger btn-lg btn-attack btn-player" onclick="PlayerMoves.playerAttackOnTimer()">Attack!  </button>';
        getActions.innerHTML += '<button type="button" class="btn btn-warning btn-lg btn-boost tooltipp btn-player" onclick="PlayerMoves.calcBoost()">Boost next Attack! <span class="tooltipptext">Costs 20 Strength <br>Damage Mutliplier </span></button>'; 

        getActions.innerHTML += '<button type="button" class="btn btn-warning btn-lg btn-boost tooltipp btn-player" onClick="PlayerMoves.ultimateAttack()">Use Ultimate Ability <span class="tooltipptext"><p class="progress-indicator" id="ult-progress-indicator"></p><progress class="local-progress-bar" value="0" max='+maxPlayerUltTime+' id="id-progress-bar"></progress></span></button>'

        if (player.mana > 10)
        {
            getActions.innerHTML += '<button type="button" class="btn btn-success btn-lg btn-heal tooltipp btn-player" onclick="PlayerMoves.calcHeal()">Heal Self <span class="tooltipptext" id="mana-tooltip">Costs 40 Mana <br>Healing scales on Mana</span> </button>'; 
        }

        getArena.innerHTML = "<p>Choose an action above! Your enemy isn't going to wait!</p>";

        startEnemyTimer(enemy);
        getEnemy.innerHTML += '<img src="imgs/Placeholder2(1).png" alt="'+ enemy.enemyType+'" class="img-avatar"><div><h3>'+enemy.enemyType+'</h3><p class="health-enemy">Health : '+enemy.health+'</p><p class="mana-enemy">Mana : '+enemy.mana+'</p><p>Strength : '+enemy.strength+'</p><p>Agility : '+enemy.agility+'</p><p>Speed : '+enemy.speed+'</p> <p class="progress-indicator" id="enemy-progress-indicator"></p><progress class="local-progress-bar" value="0" max='+maxEnemyTime+' id="enemy-progress-bar"></progress> </div>';
    },
    singleFight : function() {
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        let getArena = document.querySelector(".arena");
        let getEnemy = document.querySelector(".enemy");
        let getPlayerHealth = document.querySelector(".health-player");

        noOfEnemies = 1;

        player.health = Math.floor(player.health * noOfEnemies)
        getPlayerHealth.innerHTML = 'Health : '+player.health;

        for(let i=0;i<noOfEnemies;i++)
        {
            let chooseRandomEnemy = Math.floor(Math.random()*Math.floor(3));

            switch (chooseRandomEnemy) {
                case 0:
                    enemy = enemy0;
                    break;
                case 1:
                    enemy = enemy1;
                    break
                case 2:
                    enemy = enemy2;
                    break
                default:
                    break;
            }
            maxEnemyTime = Math.floor( (2 * (enemy.agility + enemy.speed)) / ((enemy.agility) * (enemy.speed) / 100) );
            
            var enemyTimerVar;
            var enemyTime;
            let enemyID = i;
            let enemyDefeat = false;
            let gaunt_enemy = new Enemies(enemyID,enemy,maxEnemyTime,enemyTimerVar,enemyTime,enemyDefeat);
            enemies.push(gaunt_enemy);
        }
        this.gameOutcomeLoop(enemies);

        getHeader.innerHTML = '<p>Choose your Action!</p> <button onclick="GameManager.pauseFight()" class="btn btn-primary btn-pause"> Pause </button>';

        getActions.innerHTML = '<button type="button" class="btn btn-danger btn-lg btn-attack btn-player" onclick="PlayerMoves.playerAttackOnTimerGauntlet(enemies)">Attack!  </button>';
        getActions.innerHTML += '<button type="button" class="btn btn-warning btn-lg btn-boost tooltipp btn-player" onclick="PlayerMoves.calcBoost()">Boost next Attack! <span class="tooltipptext">Costs 20 Strength <br>Damage Mutliplier </span></button>'; 
        getActions.innerHTML += '<button type="button" class="btn btn-warning btn-lg btn-ult tooltipp btn-player" onClick="PlayerMoves.ultimateAttack()">Use Ultimate Ability <span class="tooltipptext"><p class="progress-indicator" id="ult-progress-indicator"></p><progress class="local-progress-bar" value="0" max='+maxPlayerUltTime+' id="id-progress-bar"></progress></span></button>'

        if (player.mana > 10)
        {
            getActions.innerHTML += '<button type="button" class="btn btn-success btn-lg btn-heal tooltipp btn-player" onclick="PlayerMoves.calcHeal()">Heal Self <span class="tooltipptext" id="mana-tooltip">Costs 40 Mana <br>Healing scales on Mana</span> </button>'; 
        }

        getArena.innerHTML = "<p>Choose an action above! Your enemy isn't going to wait!</p>";
        
        enemies.forEach(function(gaunt_enemy)
        {
            getEnemy.innerHTML += '<img src="imgs/Placeholder2(1).png" alt="'+ gaunt_enemy.enemy.enemyType+'" class="img-avatar"><div><h3>'+gaunt_enemy.enemy.enemyType+'</h3><p class="health-enemy" id="health-'+gaunt_enemy.enemyID+'">Health : '+gaunt_enemy.enemy.health+'</p><p id="mana-'+gaunt_enemy.enemyID+'">Mana : '+gaunt_enemy.enemy.mana+'</p><p>Strength : '+gaunt_enemy.enemy.strength+'</p><p>Agility : '+gaunt_enemy.enemy.agility+'</p><p>Speed : '+gaunt_enemy.enemy.speed+'</p> <p class="progress-indicator" id="enemy-progress-indicator-'+gaunt_enemy.enemyID+'"></p><progress class="local-progress-bar" value="0" max='+gaunt_enemy.maxEnemyTime+' id="enemy-progress-bar-'+gaunt_enemy.enemyID+'"></progress> </div>';
            startEnemyTimerGauntlet(gaunt_enemy);
        });
    },

    gauntletFight :function() {

        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        let getArena = document.querySelector(".arena");
        let getEnemy = document.querySelector(".enemy");
        let getPlayerHealth = document.querySelector(".health-player");
        

        noOfEnemies = Math.floor(Math.random()*Math.floor(2)) + 2;

        player.health = Math.floor(player.health * noOfEnemies);
        getPlayerHealth.innerHTML = 'Health : '+player.health;

        for(let i=0;i<noOfEnemies;i++)
        {
            
            let chooseIndex = Math.floor(Math.random()*EnemyPool.length);
            let chooseRandomEnemy = EnemyPool.splice(chooseIndex,1)[0];
            switch (chooseRandomEnemy) {
                case 0:
                    enemy = enemy0;
                    break;
                case 1:
                    enemy = enemy1;
                    break
                case 2:
                    enemy = enemy2;
                    break
                default:
                    break;
            }
            maxEnemyTime = Math.floor( (2 * (enemy.agility + enemy.speed)) / ((enemy.agility) * (enemy.speed) / 100) );
            
            var enemyTimerVar;
            var enemyTime;
            let enemyID = i;
            let enemyDefeat = false;
            let gaunt_enemy = new Enemies(enemyID,enemy,maxEnemyTime,enemyTimerVar,enemyTime,enemyDefeat);
            enemies.push(gaunt_enemy);
        }
        this.gameOutcomeLoop(enemies);

        getHeader.innerHTML = '<p>Choose your Action!</p> <button onclick="GameManager.pauseFight()" class="btn btn-primary btn-pause" id="pause-btn"> Pause </button>';
        getHeader.innerHTML += '<button onclick="GameManager.resumeFight()" class="btn btn-warning btn-pause hidden" id="resume-btn"> Resume </button>';
        
        getActions.innerHTML = '<button type="button" class="btn btn-danger btn-lg btn-attack btn-player" onclick="PlayerMoves.playerAttackOnTimerGauntlet(enemies)">Attack!  </button>';
        getActions.innerHTML += '<button type="button" class="btn btn-warning btn-lg btn-boost tooltipp btn-player" onclick="PlayerMoves.calcBoost()">Boost next Attack! <span class="tooltipptext">Costs 20 Strength <br>Damage Mutliplier </span></button>';

        getActions.innerHTML += '<button type="button" class="btn btn-primary btn-lg btn-ult tooltipp btn-player" onClick="PlayerMoves.startPlayerUltTimer()">Use Ultimate Ability <span class="tooltipptext"><p class="progress-indicator" id="ult-progress-indicator"></p><progress class="local-progress-bar" value="0" max='+maxPlayerUltTime+' id="ult-progress-bar"></progress></span></button>'
        //PlayerMoves.startPlayerUltTimer();
        if (player.mana > 10)
        {
            getActions.innerHTML += '<button type="button" class="btn btn-success btn-lg btn-heal tooltipp btn-player" onclick="PlayerMoves.calcHeal()">Heal Self <span class="tooltipptext" id="mana-tooltip">Costs 40 Mana <br>Healing scales on Mana</span> </button>'; 
        }

        getArena.innerHTML = "<p>Choose an action above! Your enemy isn't going to wait!</p>";
        
        enemies.forEach(function(gaunt_enemy)
        {
            getEnemy.innerHTML += '<img src="imgs/Placeholder2(1).png" alt="'+ gaunt_enemy.enemy.enemyType+'" class="img-avatar"><div><h3>'+gaunt_enemy.enemy.enemyType+'</h3><p class="health-enemy" id="health-'+gaunt_enemy.enemyID+'">Health : '+gaunt_enemy.enemy.health+'</p><p id="mana-'+gaunt_enemy.enemyID+'">Mana : '+gaunt_enemy.enemy.mana+'</p><p>Strength : '+gaunt_enemy.enemy.strength+'</p><p>Agility : '+gaunt_enemy.enemy.agility+'</p><p>Speed : '+gaunt_enemy.enemy.speed+'</p> <p class="progress-indicator" id="enemy-progress-indicator-'+gaunt_enemy.enemyID+'"></p><progress class="local-progress-bar" value="0" max='+gaunt_enemy.maxEnemyTime+' id="enemy-progress-bar-'+gaunt_enemy.enemyID+'"></progress> </div>';
            startEnemyTimerGauntlet(gaunt_enemy);
        });
    },    
    gameOutcomeLoop : function(enemies) {
        let getArena = document.querySelector(".arena");
        let getActions = document.querySelector(".actions");
        let getOutcome = document.getElementById("outcome");
        let getPlayerHealth = document.querySelector(".health-player");
        let enemyID;
        let getEnemyHealth;
        gameOutcome = setInterval(function() 
        {
            if((document.hidden)){
                GameManager.pauseFight();
            }
            allEnemiesDead = false;
            noOfDead = 0;
            for(let i=0;i<enemies.length;i++){
                gaunt_enemy = enemies[i];
                if(gaunt_enemy.enemyDefeat)
                {
                    allEnemiesDead = true;
                    enemyID = gaunt_enemy.enemyID
                    noOfDead = noOfDead + 1;
                }
                else{
                    allEnemiesDead = false;
                    //break;
                }
            };
            
            if (noOfEnemies == noOfDead){
                //WIN CONDI
                getEnemyHealth = document.getElementById("health-"+enemyID);
                getOutcome.classList.add("reveal");
                getOutcome.innerHTML = "<p class='arena-player-win'>Well Done! You defeated your enemy!</p>";
                getPlayerHealth.innerHTML = 'Health : ' + player.health;
                getEnemyHealth.innerHTML = 'Health : 0';
                getActions.style.visibility = "hidden";
                clearInterval(enemyTimerVar);
                clearInterval(gameOutcome);
                battle_music.pause();
                ff7_victory.play();
                //End both timers
            }
            
            getArena.scrollTop = getArena.scrollHeight;
        },1000);
    },
    pauseFight : function() {
        isPaused = true;
        battle_music.volume = 0.05;
        $('#pause-btn').addClass('hidden');
        $('#resume-btn').removeClass("hidden");
        // var playerButtons = document.querySelectorAll(".btn-player");
        // for (var i=0;i<playerButtons.length;i++)
        //         {
        //             playerButtons[i].disabled = true;
        //         }
    },

    resumeFight : function() {
        isPaused = false;
        battle_music.volume = 0.1;
        $('#resume-btn').addClass('hidden');
        $('#pause-btn').removeClass("hidden");
        // var playerButtons = document.querySelectorAll(".btn-player");
        // for (var i=0;i<playerButtons.length;i++)
        //         {
        //             playerButtons[i].disabled = false;
        //         }
    },
    toggleMusic : function() {
        if($("#music-toggle")[0].checked){
            music_active = false;
            battle_music.pause();
        }
        else
        {
            music_active = true;
            battle_music.play()
        }
    }
}
