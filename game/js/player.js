let player

let boostMultiplier = 1;

var maxPlayerTime = 10;
var maxPlayerUltTime = 10;

let pickedEnemy = false;

var currentTime;

let playerTimerVar;

function Player(classType, health , mana, strength, agility, speed, health, mana) {
    this.classType=classType;
    this.health = health;
    this.mana = mana;
    this.strength = strength;
    this.agility = agility;
    this.speed = speed;
    this.maxPlayerHealth = health;
    this.maxPlayerMana = mana;
}

let warrior = new Player("Warrior", 200, 0, 200, 80, 80, 200, 0); //Ult damages all enemies //Sweeping Might

let rogue = new Player("Rogue", 170, 0, 60, 120, 140, 150, 0);  //Ult boosts agility and speed for a period // OverTime

let mage = new Player("Mage", 150, 200, 50, 100, 100, 130, 200);  //Regenerate Mana over time period // Arcane Restoration

let hunter = new Player("Hunter", 220, 90, 80, 120, 120, 220, 90); //Regenerates Health over time //Nature's Blessing

const warriorUlt = "Sweeping Might";
const rogueUlt = "OverTime";
const mageUlt = "Arcane Restoration";
const hunterUlt = "Nature's Blessing";

let PlayerMoves = {
    playerUlt : function() {

    },

    playerAttack : function(){
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
    },
    buildTargetMenu : function(enemies) {
        getTargetMenu = document.querySelector(".targetmenu");
        getTargetMenu.style.visibility = "visible";
        getTargetMenu.classList.add("reveal");
        getTargetMenu.innerHTML += '<h3 id="target-text">Choose a target</h3>';
        var enemiesIDs = [];
        enemies.forEach( function(gaunt_enemy){
            if(gaunt_enemy.enemyDefeat == false)
            {
            getTargetMenu.innerHTML += '<a id="target-'+gaunt_enemy.enemyID+'" class="target-name" href="javascript:;" onclick="PlayerMoves.pickEnemy('+gaunt_enemy.enemyID+')"><p id="'+gaunt_enemy.enemyID+'">'+(gaunt_enemy.enemyID)+'. '+gaunt_enemy.enemy.enemyType+'</p></a>';
            enemiesIDs.push(gaunt_enemy.enemyID.toString());
        }
        })
        window.addEventListener('keydown',(event)=>{
            if(enemiesIDs.includes(event.key)){
                $("#target-"+(event.key)).click();
            }

        })
    },

    buildTargetMenuForUlt : function(enemies) {
        getTargetMenu = document.querySelector(".targetmenu");
        getTargetMenu.style.visibility = "visible";
        getTargetMenu.classList.add("reveal");
        getTargetMenu.innerHTML += '<h3 id="target-text">Choose a target to use ultimate on</h3>';
        var enemiesIDs = [];
        enemies.forEach( function(gaunt_enemy){
            if(gaunt_enemy.enemyDefeat == false)
            {
            getTargetMenu.innerHTML += '<a id="target-'+gaunt_enemy.enemyID+'" class="target-name" href="javascript:;" onclick="PlayerMoves.pickEnemy('+gaunt_enemy.enemyID+')"><p id="'+gaunt_enemy.enemyID+'">'+gaunt_enemy.enemyID+'. '+gaunt_enemy.enemy.enemyType+'</p></a>';
            enemiesIDs.push(gaunt_enemy.enemyID.toString());
        }
        })
        window.addEventListener('keydown',(event)=>{
            if(enemiesIDs.includes(event.key)){
                $("#target-"+event.key).click()
            }
        })
    },

    pickEnemy : function(enemyID,condition){
        condition = condition || null;
        let getTargetMenu = document.querySelector(".targetmenu");
        let getArena = document.querySelector(".arena");
        let getActions = document.querySelector(".actions");
        let getPlayerHealth = document.querySelector(".health-player");
        let getEnemyHealth = document.getElementById("health-"+enemyID);

        let playerAttackValues = this.playerAttack();
        let totalDamage = playerAttackValues[0] * playerAttackValues[1];

        let msg = "Nice! ";
        let enemy;
        if(totalDamage>70)
        {
            msg="<b>Critical Attack! </b>";
        }

        for(let i=0;i<enemies.length;i++){
            gaunt_enemy = enemies[i];
            if(gaunt_enemy.enemyID == enemyID)
            {
                enemy = gaunt_enemy.enemy;
            }
        }

        enemy.health = enemy.health - totalDamage;
        getArena.innerHTML += "<p class='arena-player'>"+msg + totalDamage+" Damage total dealt in "+playerAttackValues[1]+" attack(s) to "+enemy.enemyType+".</p>";
        if(enemy.health <= 0)
        {
            getPlayerHealth.innerHTML = 'Health : ' + player.health;
            getEnemyHealth.innerHTML = 'Health : 0';
            enemies.forEach(function(gaunt_enemy){
                if(gaunt_enemy.enemyID == enemyID)
                {   
                    gaunt_enemy.enemyDefeat = true;
                    getArena.innerHTML += '<p class="arena-enemy">'+gaunt_enemy.enemy.enemyType+' has been defeated!</p>';
                }
            })
        }
        else
        {
            getEnemyHealth.innerHTML = 'Health : ' + enemy.health;
        }

        getTargetMenu.innerHTML = "<p></p>";
        getTargetMenu.style.visibility = "hidden";
        getTargetMenu.classList.remove("reveal");

        if(condition != "ult"){
            this.startPlayerTimer();
        }
        
    },
    
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
                msg="<b>Critical Attack! </b>";
            }
            enemy.health = enemy.health - totalDamage;


            getArena.innerHTML += "<p class='arena-player'>"+msg + totalDamage+" Damage total dealt in "+playerAttackValues[1]+" attack(s).</p>";

            if (enemy.health <=0){


                //WIN CONDI
                getArena.innerHTML += "<p class='arena-player-win'>Well Done! You defeated your enemy!</p>";
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

                    getArena.innerHTML+= "<p>Defeat! You were defeated by your enemy!</p>";

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

                getArena.innerHTML+= "<p>Defeat! You were defeated by your enemy!</p>";

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
                    msg="<b>Critical Attack! </b>";
                }


                getArena.innerHTML += "<p class='arena-player'>"+msg + totalDamage+" Damage total dealt in "+playerAttackValues[1]+" attack(s).</p>";

                if (enemy.health <=0){

                    //WIN CONDITION
                    getArena.innerHTML += "<p class='arena-player-win'>Well Done! You defeated your enemy!</p>";

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

    playerAttackOnTimer : function(enemies) {

        let getArena = document.querySelector(".arena");
        let getActions = document.querySelector(".actions");
        let getOutcome = document.getElementById("outcome");


        let getPlayerHealth = document.querySelector(".health-player");
    
        let getEnemyHealth;

        let playerAttack = function() {
            let calcBaseDamage;
            // DMG stats here
            if(player.mana>player.agility){
                calcBaseDamage = Math.floor((player.strength+1) * (player.mana+1) * (player.agility+1) /40000);
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

        let playerAttackValues = playerAttack();
        let totalDamage = playerAttackValues[0] * playerAttackValues[1];

        let msg = "Nice! ";

        if(totalDamage>70)
        {
            msg="<b>Critical Attack! </b>";
        }
        enemy.health = enemy.health - totalDamage;


        getArena.innerHTML += "<p class='arena-player'>"+msg + totalDamage+" Damage total dealt in "+playerAttackValues[1]+" attack(s).</p>";
        
        if (enemy.health <= 0){
            //WIN CONDITION
            getEnemyHealth = document.querySelector(".health-enemy");
            getOutcome.innerHTML = "<p class='arena-player-win'>Well Done! You defeated your enemy!</p>";
            getPlayerHealth.innerHTML = 'Health : ' + player.health;
            getEnemyHealth.innerHTML = 'Health : 0';
            getActions.style.visibility = "hidden";
            battle_music.pause();
            ff7_victory.play();
            //End both timers
        }
        else
        {
            getEnemyHealth = 'Health : '+enemy.health;
        }
        this.scrollIntoView(false);

        //Starts timer
        this.startPlayerTimer();
    },

    playerAttackOnTimerGauntlet : function(enemies) {

        let getArena = document.querySelector(".arena");
        let getActions = document.querySelector(".actions");
        let getOutcome = document.getElementById("outcome");


        let getPlayerHealth = document.querySelector(".health-player");
        
        let enemyID;
        let getEnemyHealth;
        var playerButtons = document.querySelectorAll(".btn-player");
        for (var i=0;i<playerButtons.length;i++)
                {
                    playerButtons[i].disabled = true;
                }
        this.buildTargetMenu(enemies);

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
        

        if (noOfDead == noOfEnemies){
            //WIN CONDITION
            getEnemyHealth = document.getElementById("health-"+enemyID);
            getOutcome.innerHTML = "<p class='arena-player-win'>Well Done! You defeated your enemy!</p>";
            getPlayerHealth.innerHTML = 'Health : ' + player.health;
            getEnemyHealth.innerHTML = 'Health : 0';
            getActions.style.visibility = "hidden";
            clearInterval(enemyTimerVar);
            return ;
            //End both timers
        }
        
    },

    playerUltOnTimerGauntlet : function(enemies){
        let getArena = document.querySelector(".arena");
        let getActions = document.querySelector(".actions");
        let getOutcome = document.getElementById("outcome");


        let getPlayerHealth = document.querySelector(".health-player");
        let getPlayerAgility = document.querySelector(".agility-player");
        let getPlayerSpeed = document.querySelector(".speed-player");
        let getPlayerMana = document.querySelector(".mana-player");

        let enemyID;
        let getEnemyHealth;
        var playerButtons = document.querySelectorAll(".btn-ult");
        for (var i=0;i<playerButtons.length;i++)
                {
                    playerButtons[i].disabled = true;
                }
        
        //crossroads of the classes
        if(player.classType == "Warrior"){
            //Damage onto all enemies
            getArena.innerHTML += "<b>Warrior uses "+warriorUlt+"</b>"
            enemies.forEach(function(gaunt_enemy){
                PlayerMoves.pickEnemy(gaunt_enemy.enemyID,"ult");
            })
        }

        else if(player.classType == "Rogue"){
            //Boost agility and speed for a time period
            getArena.innerHTML += "<b>Rogue used "+rogueUlt+" </b>"

            let rogueUltDuration = Math.floor(maxPlayerUltTime/2);
            console.log(rogueUltDuration)
            let currentRogueUltTime = 0;

            let trueAgility = player.agility;
            let trueSpeed = player.speed;
            player.agility = Math.ceil(player.agility * 1.5);
            player.agility = Math.ceil(player.agility * 1.1);

            getPlayerAgility.innerHTML = '<p class="agility-player"> Agility: '+player.agility+'</p>'
            getPlayerSpeed.innerHTML = '<p class="speed-player">Speed: '+player.speed+'</p>'
            let rogueUltTimeVar = setInterval(function progresssRogueUltTimer(){
                if(isPaused){
                    return;
                }
                rogueUltDuration--;
                if(rogueUltDuration <= 0){
                    clearInterval(rogueUltTimeVar);
                    getArena.innerHTML += "<b>"+rogueUlt+" has expired</b>"
                    
                    player.agility = trueAgility;
                    player.speed = trueSpeed;
                    getPlayerAgility.innerHTML = '<p class="agility-player"> Agility: '+player.agility+'</p>'
                    getPlayerSpeed.innerHTML = '<p class="speed-player">Speed: '+player.speed+'</p>'
        
                }
            },1000)
        }

        else if(player.classType == "Mage"){
            getArena.innerHTML += "<b>Mage used "+mageUlt+"</b>";
            let mageUltDuration = Math.floor(maxPlayerUltTime)/2;
            let mageUltTimeVar = setInterval(function progressMageUlTimer(){

                if(isPaused){
                    return;
                }
                player.mana += 10;
                if(mageUltDuration % 2 == 0){
                    getPlayerMana.innerHTML = '<p class="mana-player" style="color:#0096c7">Mana: '+player.mana+'</p>';
                }
                else{
                    getPlayerMana.innerHTML = '<p class="mana-player" style="color:#023e8a">Mana: '+player.mana+'</p>'
                }
                mageUltDuration--;
                if(mageUltDuration <=0){
                    clearInterval(mageUltTimeVar);
                    getArena.innerHTML += "<b>"+mageUlt+" has expired</b>";
                    getPlayerMana.innerHTML = '<p class="mana-player">Mana: '+player.mana+'</p>'
                }
            },1000)
        }

        else if(player.classType == "Hunter"){
            getArena.innerHTML += "<b>Hunter used "+hunterUlt+"</b>";
            let hunterUltDuration = Math.floor(maxPlayerUltTime)/2;
            let hunterUltTimeVar = setInterval(function progressHunterUlTimer(){

                if(isPaused){
                    return;
                }
                player.health += 10;
                if(hunterUltDuration % 2 == 0){
                    getPlayerHealth.innerHTML = '<p class="health-player" style="color:#538d22">Health: '+player.health+'</p>';
                }
                else{
                    getPlayerHealth.innerHTML = '<p class="health-player" style="color:#245501">Health: '+player.health+'</p>'
                }
                hunterUltDuration--;
                if(hunterUltDuration <=0){
                    clearInterval(hunterUltTimeVar);
                    getArena.innerHTML += "<b>"+hunterUlt+" has expired</b>";
                    getPlayerHealth.innerHTML = '<p class="health-player">Health: '+player.health+'</p>'
                }
            },1000)
        }

        this.startPlayerUltTimer();
    },

    startPlayerTimer : function() {
        
        var playerButtons = document.querySelectorAll(".btn-player");
        for (var i=0;i<playerButtons.length;i++)
                {
                    playerButtons[i].disabled = true;
                }
        var playerTime = maxPlayerTime;
        playerTimerVar = setInterval(function progressPlayerTimer() {
            
            if(isPaused){
                return;
            }

            currentTime = maxPlayerTime - --playerTime;
            document.getElementById("player-progress-bar").value = currentTime;
            document.getElementById("player-progress-indicator").innerHTML = playerTime;
            if(playerTime <=0 )
            {
                //Buttons enabled
            
                for (var i=0;i<playerButtons.length;i++)
                {
                    playerButtons[i].disabled = false;
                }
                //On player click disables and starts timer
                clearInterval(playerTimerVar);
                playerTime = maxPlayerTime;
                document.getElementById("player-progress-bar").value = 0;
            }

        },1000)
    },

    startPlayerUltTimer : function() {
        let circleInd = document.getElementById("ult-circle-indicator");
        var playerUltButtons = document.querySelectorAll(".btn-ult");
        for (var i=0;i<playerUltButtons.length;i++)
                {
                    playerUltButtons[i].disabled = true;
                }
        circleInd.classList.add("off");
        var playerUltTime = maxPlayerUltTime;
        playerUltTimerVar = setInterval(function progressPlayerTimer() {
            
            if(isPaused){
                return;
            }
            
            currentTime = maxPlayerUltTime - --playerUltTime;
            document.getElementById("ult-progress-bar").value = currentTime;
            document.getElementById("ult-progress-indicator").innerHTML = playerUltTime;
            if(playerUltTime <=0 )
            {
                //Buttons enabled
            
                for (var i=0;i<playerUltButtons.length;i++)
                {
                    playerUltButtons[i].disabled = false;
                }
                circleInd.classList.remove("off")
                //On player click disables and starts timer
                clearInterval(playerUltTimerVar);
                playerUltTime = maxPlayerUltTime;
                document.getElementById("ult-progress-bar").value = 0;
            }

        },1000)
    },
    resumePlayerTimer : function() {
        var playerButtons = document.querySelectorAll(".btn-player");
        for (var i=0;i<playerButtons.length;i++)
                {
                    playerButtons[i].disabled = true;
                }

        var playerTime_resume = currentTime;
        playerTimerVar = setInterval(function progressPlayerTimer() {
            currentTime = maxPlayerTime - --playerTime_resume;
            document.getElementById("player-progress-bar").value = currentTime;
            document.getElementById("player-progress-indicator").innerHTML = playerTime_resume;
            if(playerTime_resume <=0 )
            {
                //Buttons enabled
            
                for (var i=0;i<playerButtons.length;i++)
                {
                    playerButtons[i].disabled = false;
                }
                //On player click disables and starts timer
                clearInterval(playerTimerVar);
                playerTime_resume = maxPlayerTime;
                document.getElementById("player-progress-bar").value = 0;
            }
            playerTime_resume = maxPlayerTime;
        },1000)
    },

    calcBoost : function(){

        let getArena = document.querySelector(".arena");
        let getBoost = document.querySelector(".btn-boost");
        let getPlayerStrength = document.querySelector(".strength-player");

        if(player.strength <=50) { 
            getBoost.disabled = true;
            getBoost.classList.remove("btn-player");
        }
        
        boostMultiplier = ((Math.random() * 1) + 1);
        getArena.innerHTML += "<p>Next Attack boosted by times " + boostMultiplier.toFixed(2) + " </p>";

        player.strength = player.strength - 20;

        getPlayerStrength.innerHTML = 'Strength : '+player.strength;

        this.startPlayerTimer();
    },

    calcHeal : function(){
        let getArena = document.querySelector(".arena");
        let getPlayerHealth = document.querySelector(".health-player");
        let getPlayerMana = document.querySelector(".mana-player");
        let getHeal = document.querySelector(".btn-heal");

        let amountHeal = Math.floor(40 * (Math.random() * Math.floor(10) + player.mana) / playerMaxMana )
        getArena.innerHTML += "<p>Healed Self by "+amountHeal+" HP</p>";

        player.health = player.health + amountHeal;
        player.mana = player.mana - 40;

        if(player.mana <= 40)
        {
            getHeal.disabled = true;
            getHeal.classList.remove("btn-player");
        }
        getPlayerHealth.innerHTML = 'Health : ' + player.health;
        getPlayerMana.innerHTML = 'Mana : ' + player.mana;

        this.startPlayerTimer();
    }
}