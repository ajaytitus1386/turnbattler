let pauseCondition = true;
let enemies = [];
var gameOutcome;
var isPaused = false;

//
//Short Hand Abbreveations used:
//gaunt : gauntlet
//ult   : ultimate 
//



let music_active = true;
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

        //Timer max time
        maxPlayerTime = Math.floor( (2 * (player.agility + player.speed)) / ((player.agility) * (player.speed) / 120) ); 
        maxPlayerUltTime = Math.floor(3.5 * maxPlayerTime)

        let getInterface = document.querySelector(".interface");
        getInterface.innerHTML = '<img src="imgs/'+classType.toLowerCase()+'.png" class="img-avatar"><div><h3>'+classType+'</h3><p class="health-player">Health : '+ player.health+'</p><p class="mana-player">Mana : '+ player.mana+'</p><p class="strength-player">Strength : '+ player.strength+'</p><p class="agility-player">Agility : '+ player.agility+'</p><p class="speed-player">Speed : '+ player.speed+'</p> <p> <p class="progress-indicator" id="player-progress-indicator"></p> <progress class="local-progress-bar" value="0" max='+maxPlayerTime+' id="player-progress-bar"> </progress> </p> </div>';
        getInterface.style.display = "flex";

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
        getActions.innerHTML = '<button type="button" class="btn btn-danger btn-lg btn-block tooltipp" onclick="GameManager.gauntletFight(1)">Looking for Battle <span class="tooltipptext">Finds a random enemy to fight</span> </button>'; 
        getActions.innerHTML += '<button type="button" class="btn btn-warning btn-lg btn-block tooltipp" onclick="GameManager.gauntletFight()">Gauntlet Battle <span class="tooltipptext">Battle multiple enemies at once</span> </button>';
        getArena.classList.remove("hidden");
        document.querySelector(".enemy").classList.remove("hidden");
        document.querySelector(".outcome").classList.remove("hidden");

        getArena.style.visibility = "visible";
    },

    gauntletFight :function(condition) {

        condition = condition || null;
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        let getArena = document.querySelector(".arena");
        let getEnemy = document.querySelector(".enemy");
        let getPlayerHealth = document.querySelector(".health-player");
        

        noOfEnemies = Math.floor(Math.random()*Math.floor(2)) + 2;

        if(condition == 1){
            noOfEnemies = 1;
        }

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

        getHeader.innerHTML = '<p>Choose your Action!</p> <button onclick="GameManager.pauseFight()" class="btn btn-primary btn-pause" id="pause-btn"> Pause(P) </button>';


        getHeader.innerHTML += '<button onclick="GameManager.resumeFight()" class="btn btn-warning btn-pause hidden" id="resume-btn"> Resume(R) </button>';
        
        getActions.innerHTML = '<button type="button" class="btn btn-danger btn-lg btn-attack btn-player" id="player-normal-attack" onclick="PlayerMoves.playerAttackOnTimerGauntlet(enemies)">Attack(A)!  </button>';
        getActions.innerHTML += '<button type="button" class="btn btn-warning btn-lg btn-boost tooltipp btn-player" id="player-boost" onclick="PlayerMoves.calcBoost()">Boost next Attack(B)! <span class="tooltipptext">Costs 20 Strength <br>Damage Mutliplier </span></button>';

        getActions.innerHTML += '<button type="button" class="btn btn-primary btn-lg btn-ult tooltipp btn-ult" id="player-ult" onClick="PlayerMoves.playerUltOnTimerGauntlet(enemies)">Use Ultimate Ability(X)<span class="circle-indicator" id="ult-circle-indicator"></span> <span class="tooltipptext"><p class="progress-indicator" id="ult-progress-indicator"></p><progress class="local-progress-bar" value="0" max='+maxPlayerUltTime+' id="ult-progress-bar"></progress></span></button>'
        if (player.mana > 10)
        {
            getActions.innerHTML += '<button type="button" class="btn btn-success btn-lg btn-heal tooltipp btn-player" id="player-heal-self" onclick="PlayerMoves.calcHeal()">Heal Self(Q) <span class="tooltipptext" id="mana-tooltip">Costs 40 Mana <br>Healing scales on Mana</span> </button>';
        }

        //Adding keybinds
        window.addEventListener('keydown',(event)=> {
            if(event.key == 'p'){
                GameManager.pauseFight();
            }
            if(event.key == 'r' ){
                GameManager.resumeFight();
            }
            if(event.key == 'a'){
                if($('.btn-player')[0].disabled == false){
                    $('#player-normal-attack').click();
                } 
            }

            if(event.key == 'b'){

                if($('.btn-player')[0].disabled == false){
                    $('#player-boost').click();
                } 
            }
            if(event.key == 'x'){
                if( $('.btn-ult')[0].disabled == false){
                    
                    $('#player-ult').click();
                } 
            }

            if(player.mana > 10){
                if(event.key == 'q');
                {
                    if($('.btn-player')[0].disabled == false){
                        $('#player-heal-self').click();
                    } 
                }
            }
        })


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
                    
                }
            };
            
            if (noOfEnemies == noOfDead){
                //WIN CONDITION
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
        $('#floater-pause').removeClass('hidden');
        $('#floater-cover').removeClass('hidden');
        $('#resume-btn').removeClass("hidden");
    },

    resumeFight : function() {
        isPaused = false;
        battle_music.volume = 0.1;
        $('#resume-btn').addClass('hidden');
        $('#floater-pause').addClass('hidden');
        $('#floater-cover').addClass('hidden');
        $('#pause-btn').removeClass("hidden");
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
