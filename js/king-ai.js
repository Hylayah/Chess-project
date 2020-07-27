function is_ai_king_ok(pionek){
    var king = pionek;

    var x = king.classList;

    if(x.length == 3){
        var a = 0;
        var b = x[1];
        var c = x[2];
    } else if(x.contains('pawn') || x.contains('rook') || x.contains('bishop') || x.contains('knight') || x.contains('queen') || x.contains('king')){
        if(x[1].length > 2){
            var a = 0;
            var b = x[2];
            var c = x[3];
        } else {
            var a = 0;
            var b = x[1];
            var c = x[2];
        }
    } else if(x[1] == 'king-c'){
        //test
        var a = x[2];
        var b = x[3];
        var c = 'king';
    } else if(x[3] == 'king-c'){
        //test
        var a = x[1];
        var b = x[2];
        var c = 'king';
    } else {
        var a = x[1];
        var b = x[2];
        var c = x[3];
    }

    var xpos = b;
    if(c=='double'){
        var ypos = b;
    } else if(b == 'double'){
        var xpos = a;
        var ypos = a;
        a = c;
    } else if(c == 'king'){
        var xpos = a;
        var ypos = b;
        a = c;
    }else {
        var ypos = c;
    }
    console.log(xpos + ' ' + ypos);

    var trouble = [];

    // ================== CHECK X, Y

    // ================== check top
    for(var i = 1; i < 10; i++){
        var movexy = 'x' + parseInt(xpos) + 'y' + (parseInt(ypos) + i);
        if(document.getElementById(movexy) == null){ break; }
        var d = document.getElementById(movexy).classList;
        if( d.contains('rook') || d.contains('queen') || d.contains('king')){
            if( i == 1){
                trouble.push([movexy,'top', 'short']);
            } else if(i > 1){
                trouble.push([movexy,'top', 'long']);
            }
            
        } else if( d.contains('rook-c') || d.contains('knight-c') || d.contains('pawn-c') || d.contains('bishop-c') || d.contains('queen-c') || d.contains('pawn') || d.contains('bishop') || d.contains('knight') || d.contains('king')) { break ;}
    }
    // ================== check bot
    for(var i = 1; i < 10; i++){
        var movexy = 'x' + parseInt(xpos) + 'y' + (parseInt(ypos) - i);
        if(document.getElementById(movexy) == null){ break; }
        var d = document.getElementById(movexy).classList;
        if( d.contains('rook') || d.contains('queen') || d.contains('king')){
            if( i == 1){
                trouble.push([movexy,'bot', 'short']);
            } else if(i > 1){
                trouble.push([movexy,'bot', 'long']);
            }
            
        } else if( d.contains('rook-c') || d.contains('knight-c') || d.contains('pawn-c') || d.contains('bishop-c') || d.contains('queen-c') || d.contains('pawn') || d.contains('bishop') || d.contains('knight') || d.contains('king')) { break ;}
    }
    // ================== check left
    for(var i = 1; i < 10; i++){
        var movexy = 'x' + (parseInt(xpos) - i) + 'y' + parseInt(ypos);
        if(document.getElementById(movexy) == null){ break; }
        var d = document.getElementById(movexy).classList;
        if( d.contains('rook') || d.contains('queen') || d.contains('king')){
            if( i == 1){
                trouble.push([movexy,'left', 'short']);
            } else if(i > 1){
                trouble.push([movexy,'left', 'long']);
            }
            
        } else if( d.contains('rook-c') || d.contains('knight-c') || d.contains('pawn-c') || d.contains('bishop-c') || d.contains('queen-c') || d.contains('pawn') || d.contains('bishop') || d.contains('knight') || d.contains('king')) { break ;}
    }
    // ================== check right
    for(var i = 1; i < 10; i++){
        var movexy = 'x' + (parseInt(xpos) + i) + 'y' + parseInt(ypos);
        if(document.getElementById(movexy) == null){ break; }
        var d = document.getElementById(movexy).classList;
        if( d.contains('rook') || d.contains('queen') || d.contains('king')){
            if( i == 1){
                trouble.push([movexy,'right', 'short']);
            } else if(i > 1){
                trouble.push([movexy,'right', 'long']);
            }
            
        } else if( d.contains('rook-c') || d.contains('knight-c') || d.contains('pawn-c') || d.contains('bishop-c') || d.contains('queen-c') || d.contains('pawn') || d.contains('bishop') || d.contains('knight') || d.contains('king')) { break ;}
    }

    // =============== CHECK X + Y

    // ================== check top-right
    for(var i = 1; i < 10; i++){
        var movexy = 'x' + (parseInt(xpos) + i) + 'y' + (parseInt(ypos) + i);
        if(document.getElementById(movexy) == null){ break; }
        var d = document.getElementById(movexy).classList;
        
        if( d.contains('bishop') || d.contains('queen') || d.contains('king')){
            if( i == 1){
                trouble.push([movexy, 'top-right', 'short']);
            } else if(i > 1){
                trouble.push([movexy, 'top-right', 'long']);
            }
            
        } else if( d.contains('rook-c') || d.contains('knight-c') || d.contains('pawn-c') || d.contains('bishop-c') || d.contains('queen-c') || d.contains('pawn') || d.contains('bishop') || d.contains('knight') || d.contains('king')) { break ;}
    }
    // ================== check bot-right
    for(var i = 1; i < 10; i++){
        var movexy = 'x' + (parseInt(xpos) + i) + 'y' + (parseInt(ypos) - i);
        if(document.getElementById(movexy) == null){ break; }
        var d = document.getElementById(movexy).classList;
        if(i == 1 && d.contains('pawn')){
            if( i == 1){
                trouble.push([movexy, 'top-right', 'short']);
            } else if(i > 1){
                trouble.push([movexy, 'top-right', 'long']);
            }
            
        }

        if( d.contains('bishop') || d.contains('queen') || d.contains('king')){
            if( i == 1){
                trouble.push([movexy, 'bot-right', 'short']);
            } else if(i > 1){
                trouble.push([movexy, 'bot-right', 'long']);
            }
            
        } else if( d.contains('rook-c') || d.contains('knight-c') || d.contains('pawn-c') || d.contains('bishop-c') || d.contains('queen-c') || d.contains('pawn') || d.contains('bishop') || d.contains('knight') || d.contains('king')) { break ;}
    }
    // ================== check top-left
    for(var i = 1; i < 10; i++){
        var movexy = 'x' + (parseInt(xpos) - i) + 'y' + (parseInt(ypos) + i);
        if(document.getElementById(movexy) == null){ break; }
        var d = document.getElementById(movexy).classList;
        
        if( d.contains('bishop') || d.contains('queen') || d.contains('king')){
            if( i == 1){
                trouble.push([movexy, 'top-left', 'short']);
            } else if(i > 1){
                trouble.push([movexy, 'top-left', 'long']);
            }
            
        } else if( d.contains('rook-c') || d.contains('knight-c') || d.contains('pawn-c') || d.contains('bishop-c') || d.contains('queen-c') || d.contains('pawn') || d.contains('bishop') || d.contains('knight') || d.contains('king')) { break ;}
    }
    // ================== check bot-left
    for(var i = 1; i < 10; i++){
        var movexy = 'x' + (parseInt(xpos) - i) + 'y' + (parseInt(ypos) - i);
        if(document.getElementById(movexy) == null){ break; }
        var d = document.getElementById(movexy).classList;
        if(i == 1 && d.contains('pawn')){
            if( i == 1){
                trouble.push([movexy, 'top-left', 'short']);
            } else if(i > 1){
                trouble.push([movexy, 'top-left', 'long']);
            }
            
        }

        if( d.contains('bishop') || d.contains('queen') || d.contains('king')){
            if( i == 1){
                trouble.push([movexy, 'bot-left', 'short']);
            } else if(i > 1){
                trouble.push([movexy, 'bot-left', 'long']);
            }
            
        } else if( d.contains('rook-c') || d.contains('knight-c') || d.contains('pawn-c') || d.contains('bishop-c') || d.contains('queen-c') || d.contains('pawn') || d.contains('bishop') || d.contains('knight') || d.contains('king')) { break ;}
    }

    // ============= check horse
    
    for(var c = 1; c<17; c++){
        var a = xpos;
        var b = ypos;

        if(c == 1){  
            var knight_check = 0;  
            if(knight_check==0){
                var movex = parseInt(a) + 1;
                var movey = parseInt(b);
                knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                if(knight_check==0){
                    movex = parseInt(a) + 1;
                    movey = parseInt(b) + 1;
                    knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                    if(knight_check==0){
                        movex = parseInt(a) + 1;
                        movey = parseInt(b) + 2;

                        var potential_horse = 'x' + movex + 'y' + movey;

                        if(document.getElementById(potential_horse) != null && document.getElementById(potential_horse).classList.contains('knight')){
                            trouble.push([potential_horse, 'horse', 'long']);
                        } 
                    }
                }
            }    

        } else if(c == 2){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a) - 1;
                var movey = parseInt(b);
                knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                if(knight_check==0){
                    movex = parseInt(a) - 1;
                    movey = parseInt(b) + 1;
                    knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                    if(knight_check==0){
                        movex = parseInt(a) - 1;
                        movey = parseInt(b) + 2;
                        
                        var potential_horse = 'x' + movex + 'y' + movey;

                        if(document.getElementById(potential_horse) != null && document.getElementById(potential_horse).classList.contains('knight')){
                            trouble.push([potential_horse, 'horse', 'long']);
                        } 
                    }
                }
            }  
        } else if(c == 3){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a) + 1;
                var movey = parseInt(b);
                knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                if(knight_check==0){
                    movex = parseInt(a) + 1;
                    movey = parseInt(b) - 1;
                    knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                    if(knight_check==0){
                        movex = parseInt(a) + 1;
                        movey = parseInt(b) - 2;
                        
                        var potential_horse = 'x' + movex + 'y' + movey;

                        if(document.getElementById(potential_horse) != null && document.getElementById(potential_horse).classList.contains('knight')){
                            trouble.push([potential_horse, 'horse', 'long']);
                        } 
                    }
                }
            } 
        } else if(c == 4){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a) - 1;
                var movey = parseInt(b);
                knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                if(knight_check==0){
                    movex = parseInt(a) - 1;
                    movey = parseInt(b) - 1;
                    knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                    if(knight_check==0){
                        movex = parseInt(a) - 1;
                        movey = parseInt(b) - 2;
                        
                        var potential_horse = 'x' + movex + 'y' + movey;

                        if(document.getElementById(potential_horse) != null && document.getElementById(potential_horse).classList.contains('knight')){
                            trouble.push([potential_horse, 'horse', 'long']);
                        } 
                    }
                }
            } 
        } else if(c == 5){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a) + 1;
                var movey = parseInt(b);
                knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                if(knight_check==0){
                    movex = parseInt(a) + 2;
                    movey = parseInt(b);
                    knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                    if(knight_check==0){
                        movex = parseInt(a) + 2;
                        movey = parseInt(b) + 1;
                        
                        var potential_horse = 'x' + movex + 'y' + movey;

                        if(document.getElementById(potential_horse) != null && document.getElementById(potential_horse).classList.contains('knight')){
                            trouble.push([potential_horse, 'horse', 'long']);
                        } 
                    }
                }
            } 
        } else if(c == 6){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a) + 1;
                var movey = parseInt(b);
                knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                if(knight_check==0){
                    movex = parseInt(a) + 2;
                    movey = parseInt(b);
                    knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                    if(knight_check==0){
                        movex = parseInt(a) + 2;
                        movey = parseInt(b) - 1;
                        
                        var potential_horse = 'x' + movex + 'y' + movey;

                        if(document.getElementById(potential_horse) != null && document.getElementById(potential_horse).classList.contains('knight')){
                            trouble.push([potential_horse, 'horse', 'long']);
                        } 
                    }
                }
            } 
        } else if(c == 7){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a) - 1;
                var movey = parseInt(b);
                knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                if(knight_check==0){
                    movex = parseInt(a) - 2;
                    movey = parseInt(b);
                    knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                    if(knight_check==0){
                        movex = parseInt(a) - 2;
                        movey = parseInt(b) + 1;
                        
                        var potential_horse = 'x' + movex + 'y' + movey;

                        if(document.getElementById(potential_horse) != null && document.getElementById(potential_horse).classList.contains('knight')){
                            trouble.push([potential_horse, 'horse', 'long']);
                        } 
                    }
                }
            } 
        } else if(c == 8){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a) - 1;
                var movey = parseInt(b);
                knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                if(knight_check==0){
                    movex = parseInt(a) - 2;
                    movey = parseInt(b);
                    knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                    if(knight_check==0){
                        movex = parseInt(a) - 2;
                        movey = parseInt(b) - 1;
                        
                        var potential_horse = 'x' + movex + 'y' + movey;

                        if(document.getElementById(potential_horse) != null && document.getElementById(potential_horse).classList.contains('knight')){
                            trouble.push([potential_horse, 'horse', 'long']);
                        } 
                    }
                }
            } 
        } else if(c == 9){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a);
                var movey = parseInt(b) + 1;
                knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                if(knight_check==0){
                    movex = parseInt(a);
                    movey = parseInt(b) + 2;
                    knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                    if(knight_check==0){
                        movex = parseInt(a) + 1;
                        movey = parseInt(b) + 2;
                        
                        var potential_horse = 'x' + movex + 'y' + movey;

                        if(document.getElementById(potential_horse) != null && document.getElementById(potential_horse).classList.contains('knight')){
                            trouble.push([potential_horse, 'horse', 'long']);
                        } 
                    }
                }
            } 
        } else if(c == 10){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a);
                var movey = parseInt(b) + 1;
                knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                if(knight_check==0){
                    movex = parseInt(a);
                    movey = parseInt(b) + 2;
                    knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                    if(knight_check==0){
                        movex = parseInt(a) - 1;
                        movey = parseInt(b) + 2;
                        
                        var potential_horse = 'x' + movex + 'y' + movey;

                        if(document.getElementById(potential_horse) != null && document.getElementById(potential_horse).classList.contains('knight')){
                            trouble.push([potential_horse, 'horse', 'long']);
                        } 
                    }
                }
            } 
        } else if(c == 11){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a);
                var movey = parseInt(b) - 1;
                knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                if(knight_check==0){
                    movex = parseInt(a);
                    movey = parseInt(b) - 2;
                    knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                    if(knight_check==0){
                        movex = parseInt(a) + 1;
                        movey = parseInt(b) - 2;
                        
                        var potential_horse = 'x' + movex + 'y' + movey;

                        if(document.getElementById(potential_horse) != null && document.getElementById(potential_horse).classList.contains('knight')){
                            trouble.push([potential_horse, 'horse', 'long']);
                        } 
                    }
                }
            } 
        } else if(c == 12){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a);
                var movey = parseInt(b) - 1;
                knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                if(knight_check==0){
                    movex = parseInt(a);
                    movey = parseInt(b) - 2;
                    knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                    if(knight_check==0){
                        movex = parseInt(a) - 1;
                        movey = parseInt(b) - 2;
                        
                        var potential_horse = 'x' + movex + 'y' + movey;

                        if(document.getElementById(potential_horse) != null && document.getElementById(potential_horse).classList.contains('knight')){
                            trouble.push([potential_horse, 'horse', 'long']);
                        } 
                    }
                }
            } 
        } else if(c == 13){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a);
                var movey = parseInt(b) + 1;
                knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                if(knight_check==0){
                    movex = parseInt(a) + 1;
                    movey = parseInt(b) + 1;
                    knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                    if(knight_check==0){
                        movex = parseInt(a) + 2;
                        movey = parseInt(b) + 1;
                        
                        var potential_horse = 'x' + movex + 'y' + movey;

                        if(document.getElementById(potential_horse) != null && document.getElementById(potential_horse).classList.contains('knight')){
                            trouble.push([potential_horse, 'horse', 'long']);
                        } 
                    }
                }
            } 
        } else if(c == 14){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a);
                var movey = parseInt(b) - 1;
                knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                if(knight_check==0){
                    movex = parseInt(a) + 1;
                    movey = parseInt(b) - 1;
                    knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                    if(knight_check==0){
                        movex = parseInt(a) + 2;
                        movey = parseInt(b) - 1;
                        
                        var potential_horse = 'x' + movex + 'y' + movey;

                        if(document.getElementById(potential_horse) != null && document.getElementById(potential_horse).classList.contains('knight')){
                            trouble.push([potential_horse, 'horse', 'long']);
                        } 
                    }
                }
            } 
        } else if(c == 15){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a);
                var movey = parseInt(b) + 1;
                knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                if(knight_check==0){
                    movex = parseInt(a) - 1;
                    movey = parseInt(b) + 1;
                    knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                    if(knight_check==0){
                        movex = parseInt(a) - 2;
                        movey = parseInt(b) + 1;
                        
                        var potential_horse = 'x' + movex + 'y' + movey;

                        if(document.getElementById(potential_horse) != null && document.getElementById(potential_horse).classList.contains('knight')){
                            trouble.push([potential_horse, 'horse', 'long']);
                        } 
                    }
                }
            } 
        } else if(c == 16){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a);
                var movey = parseInt(b) - 1;
                knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                if(knight_check==0){
                    movex = parseInt(a) - 1;
                    movey = parseInt(b) - 1;
                    knight_check = is_ai('x' + movex + 'y' + movey) + is_player('x' + movex + 'y' + movey);
                    if(knight_check==0){
                        movex = parseInt(a) - 2;
                        movey = parseInt(b) - 1;
                        
                        var potential_horse = 'x' + movex + 'y' + movey;

                        if(document.getElementById(potential_horse) != null && document.getElementById(potential_horse).classList.contains('knight')){
                            trouble.push([potential_horse, 'horse', 'long']);
                        } 
                    }
                }
            } 
        } 
        
        
            
    }

    return trouble;
}