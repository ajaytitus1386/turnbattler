let enemy

function Enemy(enemyType, health , mana, strength, agility, speed) {
    this.enemyType=enemyType;
    this.health = health;
    this.mana = mana;
    this.strength = strength;
    this.agility = agility;
    this.speed = speed;
}

var maxEnemyTime = 5;

let enemy0 = new Enemy("Goblin", 200, 0 ,50 ,100, 100);
let enemy1 = new Enemy("Troll", 300, 0, 150 , 60 ,60);

let enemyAttack = function() {

    let calcBaseDamage;
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

    let attackValues = [calcOutputDamage,numberOfHits];

    return attackValues;
}

function enemyAttackOnTimer() {
    

    let getArena = document.querySelector(".arena");
    let getActions = document.querySelector(".actions");
    let getPlayerHealth = document.querySelector(".health-player")
    let getEnemyHealth = document.querySelector(".health-enemy")

    let enemyAttackValues = enemyAttack();
    let totalDamage = enemyAttackValues[0] * enemyAttackValues[1];

    player.health = player.health - totalDamage;
    
    getArena.innerHTML += "<p class='arena-enemy'>The enemy has dealt a total "+totalDamage+" Damage in "+enemyAttackValues[1]+" attack(s).</p>";
    if (player.health <=0){

        getArena.innerHTML+= "<p class='arena-enemy-defeat'>Defeat! You were beaten by your enemy!</p>";

        getEnemyHealth.innerHTML = 'Health : ' + enemy.health;
        getPlayerHealth.innerHTML = 'Health : 0';
        getActions.style.visibility = "hidden";


    }
    else {
        getPlayerHealth.innerHTML = 'Health : ' + player.health;
    }
}

function startEnemyTimer() {
    var enemyTime = maxEnemyTime;

    var enemyTimerVar = setInterval(function progressEnemyTimer() {
        //--enemyTime;
        document.getElementById("enemy-progress-bar").value = maxEnemyTime - --enemyTime;
        if (enemyTime <= 0 )
        {
            enemyTime = maxEnemyTime;
            document.getElementById("enemy-progress-bar").value = 0;
            enemyAttackOnTimer();
            
        }
        if (enemy.health <=0 || player.health<=0)
        {
            clearInterval(enemyTimerVar);
        }
        
    }, 1000)
}

