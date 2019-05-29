//gemaakt voor scherm iPhone X (dimensies 375 x 812)
(function() {
    'use strict';
    window.addEventListener('load', function() {
        //variabelen voor 'ball' object
        let ball = document.querySelector('.ball');
        let imgBall = document.querySelector('.ball img');
        ball.style.left = window.innerWidth/2 - 35/2 + 'px';
        ball.style.top = window.innerHeight/2 + 345 + 'px';

        let leftBall = parseInt(ball.style.left);
        let topBall = parseInt(ball.style.top);
        let widthBall = imgBall.clientWidth;
        let heightBall = imgBall.clientHeight;

        //variabelen voor 'defender' object
        let defender = document.querySelector('.defender');
        let imgDefender = document.querySelector('.defender img');
        defender.style.left = window.innerWidth/2 - 52/2 + 'px';
        defender.style.top = window.innerHeight/2 + 30 + 'px';
        
        let leftDefender = parseInt(defender.style.left);
        let topDefender = parseInt(defender.style.top);
        let widthDefender = imgDefender.clientWidth;
        let heightDefender = imgDefender.clientHeight;

        //variabelen voor buttons
        let btn_left = document.querySelector('#button_left');
        let btn_right = document.querySelector('#button_right');
        let btn_up = document.querySelector('#button_up');
        let btn_down = document.querySelector('#button_down');
        
        //functie oproepen om defender automatisch te laten bewegen
        step();
        
        //niet eigen code
        //code voor functie botsing tussen bal en defender
        //werkt niet helemaal
        //bron: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        function collides()
        {
            if (leftBall < leftDefender + widthDefender &&
                leftBall + widthBall > leftDefender &&
                topBall < topDefender + heightDefender &&
                topBall + heightBall > topDefender) return true;    
        }

        //functie voor wanneer men gewonnen heeft
        function won() {
            alert('You win! Congratulations!\nPress OK to play again.');
            document.location.reload();
            clearInterval(interval); 
        }

        //touchscreen mogelijkheid aanmaken met hammerjs
        //library: hammer.js
        //bron: https://hammerjs.github.io/
        //aanmaken variabelen voor hammerjs
        let touchscreen_left = new Hammer.Manager(btn_left);
        let touchscreen_right = new Hammer.Manager(btn_right);
        let touchscreen_up = new Hammer.Manager(btn_up);
        let touchscreen_down = new Hammer.Manager(btn_down);

        let tapLeft = new Hammer.Tap();
        let tapRight = new Hammer.Tap();
        let tapUp = new Hammer.Tap();
        let tapDown = new Hammer.Tap();

        touchscreen_left.add(tapLeft);
        touchscreen_right.add(tapRight);
        touchscreen_up.add(tapUp);
        touchscreen_down.add(tapDown);

        //functie om bal te bewegen op tap (links)
        touchscreen_left.on('tap', function() {
            leftBall -= 5;
            leftBall = Math.min(Math.max(leftBall, 33), 308); //clamping om niet uit de border te kunnen
            ball.style.left = leftBall + 'px';
        });

        //functie om bal te bewegen op tap (rechts)
        touchscreen_right.on('tap', function() {
            leftBall += 5;
            leftBall = Math.min(Math.max(leftBall, 33), 308); //clamping om niet uit de border te kunnen
            ball.style.left = leftBall + 'px';
        });
        
        //functie om bal te bewegen op tap (boven)
        touchscreen_up.on('tap', function() {
            topBall -= 10;
            topBall = Math.min(Math.max(topBall, 150), 820); //clamping om niet uit de border te kunnen
            ball.style.top = topBall + 'px';
            //zone om te winnen 
            if (topBall <= 250) 
            {
                won();
            }
            //collision
            if (collides() == true)
            {
                //collision als men naar boven gaat
                //gewoon alert want anders zou het onmogelijk zijn om te winnen aangezien collision detection niet volledig werkt
                //oorspronkelijk wou ik de speler dan opnieuw laten beginnen met een 'try again' button 
                console.log('Collision detected!'); 
            }
        });

        //functie om bal te bewegen op tap (beneden)
        touchscreen_down.on('tap', function() {
            topBall += 10;
            topBall = Math.min(Math.max(topBall, 150), 820); //clamping om niet uit de border te kunnen
            ball.style.top = topBall + 'px';
            //collision
            if (collides() == true)
            {
                //collision als men terug naar beneden zou gaan
                //gewoon alert want anders zou het onmogelijk zijn om te winnen aangezien collision detection niet volledig werkt
                //oorspronkelijk wou ik de speler dan opnieuw laten beginnen met een 'try again' button 
                console.log('Collision detected!'); 
            }
        });

        //niet eigen code
        //functie om defender auto te laten bewegen
        //bron: https://www.youtube.com/watch?v=tS6oP1NveoI + https://codepen.io/beaucarnes/pen/ybzpZE?editors=1010
        var start 
        var progress;
        
        function step(timestamp) {
            if (!start || progress > 305) start = timestamp;
            progress = (timestamp - start) / 10 + 20;
            defender.style.left = progress + 'px';
            requestAnimationFrame(step);
        };  
    });
})();