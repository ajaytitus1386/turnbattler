//let enemy;

let enemyTurnAlt = true;

let enemyTimerVar;

function Enemies(enemyID,enemy,maxEnemyTime,enemyTimerVar,enemyTime,enemyDefeat){
    this.enemyID = enemyID;
    this.enemy = enemy;
    this.maxEnemyTime = maxEnemyTime;
    this.enemyTimerVar = enemyTimerVar;
    this.enemyTime = enemyTime;
    this.enemyDefeat = enemyDefeat;
}

function Enemy(enemyType, health , mana, strength, agility, speed) {
    this.enemyType=enemyType;
    this.health = health;
    this.mana = mana;
    this.strength = strength;
    this.agility = agility;
    this.speed = speed;
    this.maxEnemyHealth = health;
}

var maxEnemyTime = 5;

let enemy0 = new Enemy("Goblin", 100, 0 ,50 ,100, 100);
let enemy1 = new Enemy("Troll", 200, 0, 150 , 60 ,60);
let enemy2 = new Enemy("Wraith",150 , 140, 60, 80,90);

let enemyDrainHealth= function(enemy) {
    calcBaseDamage = Math.floor(enemy.strength * enemy.mana / 600) ;

    player.health = player.health - calcBaseDamage;

    enemy.health = enemy.health + calcBaseDamage;

    enemy.mana = enemy.mana - 20;

    return calcBaseDamage;
}

let enemyAttack = function(enemy) {

    let calcBaseDamage;
    let getArena = document.querySelector(".arena");
    // DMG stats here
    if(enemy.mana>0){
        calcBaseDamage = enemy.strength * enemy.mana /1000;
    }
    else {
        calcBaseDamage = Math.floor(enemy.strength * enemy.agility /1000);
    }

    let offsetDamage = Math.floor(Math.random() * Math.floor(10));

    let calcOutputDamage = calcBaseDamage + offsetDamage;

    let numberOfHits = (Math.floor(Math.random() * Math.floor(enemy.agility / 10) / 2) ) + 1;

    let enemyAttackValues = [calcOutputDamage,numberOfHits];

    let totalDamage = Math.floor(enemyAttackValues[0] * enemyAttackValues[1]);

    player.health = player.health - totalDamage;
    
    getArena.innerHTML += "<p class='arena-enemy'>The "+enemy.enemyType+" has dealt a total "+totalDamage+" Damage in "+enemyAttackValues[1]+" attack(s).</p>";
}

function enemyAttackOnTimerGauntlet(enemyID,enemy) {
    

    let getArena = document.querySelector(".arena");
    let getActions = document.querySelector(".actions");
    let getPlayerHealth = document.querySelector(".health-player");
    let getEnemyHealth = document.getElementById("health-"+enemyID);
    let getEnemyMana = document.getElementById("mana-"+enemyID);

    if(enemy.enemyType == "Wraith")
    {
        if(enemy.mana > 20 && player.health > 70 && enemyTurnAlt == true)
        {
            enemyTurnAlt = false
            drainDMG = enemyDrainHealth(enemy);

            getArena.innerHTML += '<p class="arena-enemy" id="drain-health">The '+enemy.enemyType+' has drained '+drainDMG+'HP from '+player.classType+'</p>';
            getEnemyHealth.innerHTML = 'Health : ' + enemy.health;
            getEnemyMana.innerHTML = 'Mana : ' + enemy.mana;
        }
        else
        {
            enemyTurnAlt = true;
            enemyAttack(enemy);
        }
    }

    else //Every other enemy
    {
        enemyAttack(enemy);    
    }

    if (player.health <=0){

        getArena.innerHTML+= "<p class='arena-enemy-defeat'>Defeat! You were beaten by your enemy!</p>";

        getEnemyHealth.innerHTML = 'Health : ' + enemy.health;
        getPlayerHealth.innerHTML = 'Health : 0';
        getActions.style.visibility = "hidden";
        battle_music.pause();
        ff7_defeat.play();

    }
    else {
        getPlayerHealth.innerHTML = 'Health : ' + player.health;
    }
}

function enemyAttackOnTimer(enemy) {
    

    let getArena = document.querySelector(".arena");
    let getOutcome = document.getElementById("outcome");
    let getActions = document.querySelector(".actions");
    let getPlayerHealth = document.querySelector(".health-player");
    let getEnemyHealth = document.querySelector(".health-enemy");

    if(enemy.enemyType == "Wraith")
    {
        if(enemy.mana > 20 && player.health > 70 && enemyTurnAlt == true)
        {
            enemyTurnAlt = false
            drainDMG = enemyDrainHealth(enemy);

            getArena.innerHTML += '<p class="arena-enemy" id="drain-health">The '+enemy.enemyType+' has drained '+drainDMG+'HP from '+player.classType+'</p>';
            getEnemyHealth = 'Health : ' + enemy.health;
        }
        else
        {
            enemyTurnAlt = true;
            enemyAttack(enemy);
        }
    }

    else //Every other enemy
    {
        enemyAttack(enemy);    
    }

    if (player.health <=0){

        getOutcome.innerHTML = "<p class='arena-enemy-defeat'>Defeat! You were beaten by your enemy!</p>";

        getEnemyHealth.innerHTML = 'Health : ' + enemy.health;
        getPlayerHealth.innerHTML = 'Health : 0';
        getActions.style.visibility = "hidden";
        battle_music.pause();
        ff7_defeat.play();

    }
    else {
        getPlayerHealth.innerHTML = 'Health : ' + player.health;
    }
}

function startEnemyTimer(enemy) {
    var enemyTime = maxEnemyTime;

    enemyTimerVar = setInterval(function progressEnemyTimer() {
        //--enemyTime;
        document.getElementById("enemy-progress-bar").value = maxEnemyTime - --enemyTime;
        document.getElementById("enemy-progress-indicator").innerHTML = enemyTime;
        if (enemyTime <= 0 )
        {
            enemyTime = maxEnemyTime;
            document.getElementById("enemy-progress-bar").value = 0;
            enemyAttackOnTimer(enemy);
            
        }
        if (enemy.health <=0 || player.health<=0)
        {
            clearInterval(enemyTimerVar);
        }
        
    }, 1000)
}

//Gauntlet Version
function startEnemyTimerGauntlet(gaunt_enemy) {
    gaunt_enemy.enemyTime = gaunt_enemy.maxEnemyTime;

    gaunt_enemy.enemyTimerVar = setInterval(function progressEnemyTimer() {
        //--enemyTime;
        document.getElementById("enemy-progress-bar-"+gaunt_enemy.enemyID).value = gaunt_enemy.maxEnemyTime - --gaunt_enemy.enemyTime;
        document.getElementById("enemy-progress-indicator-"+gaunt_enemy.enemyID).innerHTML = gaunt_enemy.enemyTime;
        if (gaunt_enemy.enemyTime <= 0 )
        {
            gaunt_enemy.enemyTime = gaunt_enemy.maxEnemyTime;
            document.getElementById("enemy-progress-bar-"+gaunt_enemy.enemyID).value = 0;
            enemyAttackOnTimerGauntlet(gaunt_enemy.enemyID,gaunt_enemy.enemy);
            
        }
        if (gaunt_enemy.enemy.health <=0 || player.health<=0)
        {
            clearInterval(gaunt_enemy.enemyTimerVar);
        }
        
    }, 1000)
}

