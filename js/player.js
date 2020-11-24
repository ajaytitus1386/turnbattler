let player

let boostMultiplier = 1;

function Player(classType, health , mana, strength, agility, speed) {
    this.classType=classType;
    this.health = health;
    this.mana = mana;
    this.strength = strength;
    this.agility = agility;
    this.speed = speed;
}

let warrior = new Player("Warrior", 200, 0, 200, 80, 50);

let rogue = new Player("Rogue", 100, 0, 60, 140, 180);

let mage = new Player("Mage", 80, 200, 50, 100, 100);

let hunter = new Player("Hunter", 120, 40, 80, 120, 150);

let PlayerMoves = {
    calcAttack : function(){
        let getPlayerSpeed = player.speed;
        let getEnemySpeed = enemy.speed;

        let getArena = document.querySelector(".arena");
        let getActions = document.querySelector(".actions");

        let playerAttack = function() {
            let calcBaseDamage;
            // DMG stats here
            if(player.mana>player.agility){
                calcBaseDamage = Math.floor((player.strength+1) * (player.mana+1) * (player.agility+1) /40000);
                console.log(calcBaseDamage);
            }
            else {
                calcBaseDamage = Math.floor(player.strength * player.agility /1000);
            }

            calcBaseDamage = Math.floor(calcBaseDamage * boostMultiplier);

            let offsetDamage = Math.floor(Math.random() * Math.floor(10));
            let calcOutputDamage = calcBaseDamage + offsetDamage;

            let numberOfHits = (Math.floor(Math.random() * Math.floor(player.agility / 10) / 2 )) + 1;

            let attackValues = [calcOutputDamage,numberOfHits];

            boostMultiplier = 1;

            return attackValues;
        }
    
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

        let getPlayerHealth = document.querySelector(".health-player")
        let getEnemyHealth = document.querySelector(".health-enemy")
        //Test of Speed

        if (getPlayerSpeed >= getEnemySpeed)
        {
            let playerAttackValues = playerAttack();
            let totalDamage = playerAttackValues[0] * playerAttackValues[1];

            let msg = "Nice! ";

            if(totalDamage>70)
            {
                msg="Critical Attack!";
            }
            enemy.health = enemy.health - totalDamage;


            getArena.innerHTML += "<p class='arena-player'>"+msg + totalDamage+" Damage total dealt in "+playerAttackValues[1]+" attack(s).</p>";

            if (enemy.health <=0){


                //WIN CONDI
                getArena.innerHTML += "<p>Well Done! You defeated your enemy!</p>";
                getPlayerHealth.innerHTML = 'Health : ' + player.health;
                getEnemyHealth.innerHTML = 'Health : 0';
                getActions.style.visibility = "hidden";
            }
            else {
                getEnemyHealth.innerHTML = 'Health : ' + enemy.health;

                let enemyAttackValues = enemyAttack()
                let totalDamage = enemyAttackValues[0] * enemyAttackValues[1];

                player.health = player.health - totalDamage;
                getArena.innerHTML += "<p class='arena-enemy'>Dang! The enemy has dealt a total "+totalDamage+" Damage in "+enemyAttackValues[1]+" attack(s).</p>";

                if (player.health <=0){

                    getArena.innerHTML+= "<p>Drat! You were defeated by your enemy!</p>";

                    getEnemyHealth.innerHTML = 'Health : ' + enemy.health;
                    getPlayerHealth.innerHTML = 'Health : 0';
                    getActions.style.visibility = "hidden";
                }

                else {
                    getPlayerHealth.innerHTML = 'Health : ' + player.health;
                }
            }
        }
        //Enemy is faster
        else
        {
            let enemyAttackValues = enemyAttack();
            let totalDamage = enemyAttackValues[0] * enemyAttackValues[1];

            player.health = player.health - totalDamage;
            


            getArena.innerHTML += "<p class='arena-enemy'>Dang! The enemy has dealt a total "+totalDamage+" Damage in "+enemyAttackValues[1]+" attack(s).</p>";
            if (player.health <=0){

                getArena.innerHTML+= "<p>Drat! You were defeated by your enemy!</p>";

                getEnemyHealth.innerHTML = 'Health : ' + enemy.health;
                getPlayerHealth.innerHTML = 'Health : 0';
                getActions.style.visibility = "hidden";
            }
            else {
                getPlayerHealth.innerHTML = 'Health : ' + player.health;

                let playerAttackValues = playerAttack()
                let totalDamage = playerAttackValues[0] * playerAttackValues[1];

                enemy.health = enemy.health - totalDamage;

                let msg = "Nice! ";

                if(totalDamage>70)
                {
                    msg="Critical Attack!";
                }


                getArena.innerHTML += "<p class='arena-player'>"+msg + totalDamage+" Damage total dealt in "+playerAttackValues[1]+" attack(s).</p>";

                if (enemy.health <=0){

                    //WIN CONDI
                    getArena.innerHTML += "<p>Well Done! You defeated your enemy!</p>";

                    getPlayerHealth.innerHTML = 'Health : ' + player.health;
                    getEnemyHealth.innerHTML = 'Health : 0';
                    getActions.style.visibility = "hidden";
                }

                else {
                    getEnemyHealth.innerHTML = 'Health : ' + enemy.health;
                }
            }
        }
    },

    calcBoost : function(){

        let getArena = document.querySelector(".arena");
        let getBoost = document.querySelector(".btn-boost");

        getBoost.style.visibility = "hidden";
        boostMultiplier = ((Math.random() * 1) + 1);
        getArena.innerHTML += "<p>Next Attack boosted times " + boostMultiplier.toFixed(2) + " </p>";
    },

    calcHeal : function(){
        let getArena = document.querySelector(".arena");
        let getPlayerHealth = document.querySelector(".health-player");
        let getPlayerMana = document.querySelector(".mana-player");
        let getHeal = document.querySelector(".btn-heal");

        let amountHeal = Math.floor(player.mana * (Math.floor(Math.random() * Math.floor(10)) + 1) / 80) + 1   ;
        getArena.innerHTML += "<p>Healed Self by "+amountHeal+" HP</p>";

        player.health = player.health + amountHeal;
        player.mana = player.mana - 40;

        if(player.mana <= 0)
        {
            getHeal.style.visibility = "hidden";
        }
        getPlayerHealth.innerHTML = 'Health : ' + player.health;
        getPlayerMana.innerHTML = 'Mana : ' + player.mana;


    }
}