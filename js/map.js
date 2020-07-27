// ======================================= CREATE X1Y1 ..... X8Y8
// 

let map = []

for(var i=1; i<9; i++) {
    // x = j
    // y = i
    for(var j=1; j<9; j++){
        var str = 'x' + j + 'y' + i;
        var str2 = str + " = " + "document.querySelector(" + "'" + "#" + str + "');";
        eval(str2);
        if (i == j){
            var str7 = str + ".classList.add('" + j + "', '" + "double" + "');"
            eval(str7);
        } else {
            var str7 = str + ".classList.add('" + j + "', '" + i + "');"
            eval(str7);
        }

        var str8 = str + ".addEventListener('click', function(){ var classes = this.classList; launch(classes); problem(this); })";
        eval(str8);
    }
}

//
// x1y1 -> launch(x1y1.classes) -> moves(character, x, y)
//

// ============= GET NAME, X, Y

function launch(x){
    //console.log(x);
    if(x.length > 3){
        var current = x[1];
        var pos1 = x[2];
        var pos2 = x[3];
        moves(current, pos1, pos2);
    } else {
        remove_green();
    }
}

// =============== SET BG-COLOR

let selected = [];
let selected_green = [];
let selected_red = [];

function select(x){
    if(x.classList.contains('green')){
        if(selected[0].classList.contains('rook')){
            select_choose('rook', x);
        } else if(selected[0].classList.contains('pawn')){
            select_choose('pawn', x);
        } else if(selected[0].classList.contains('bishop')){
            select_choose('bishop', x);
        } else if(selected[0].classList.contains('knight')){
            select_choose('knight', x);
        } else if(selected[0].classList.contains('queen')){
            select_choose('queen', x);
        } else if(selected[0].classList.contains('king')){
            if(is_king_ok(x).length == 0){
                select_choose('king', x);
            } 
        }
        var after = ai();
        if(after == 1){
            return 'problem';
        }

    } else if(x.classList.contains('red')){
        if(selected[0].classList.contains('rook')){
            select_attack('rook-c','rook', x);
        } else if(selected[0].classList.contains('pawn')){
            select_attack('pawn-c','pawn', x);
        } else if(selected[0].classList.contains('bishop')){
            select_attack('bishop-c','bishop', x);
        } else if(selected[0].classList.contains('knight')){
            select_attack('knight-c','knight', x);
        } else if(selected[0].classList.contains('queen')){
            select_attack('queen-c','queen', x);
        } else if(selected[0].classList.contains('king')){
            if(is_king_ok(x).length == 0){
                select_attack('king-c','king', x);
            } 
        }
        var after = ai();

    } else {

        if(selected.length > 0) {
            selected[0].classList.remove('active');
            selected = [];
        }
    
        x.classList.add('active');
        selected.push(x);
    }
    
}

function select_choose(a, x){
    x.classList.add(a);
            
    selected[0].classList.remove('active');
    selected[0].classList.remove(a);
    remove_green();
    selected = [];

    x.addEventListener('click', function(){ var classes = this.classList; launch(classes);})
}

function select_attack(a, b, x){
    x.classList.remove('pawn-c','rook-c','knight-c','bishop-c','queen-c','king-c');
    x.classList.add(b);

    selected[0].classList.remove('active');
    selected[0].classList.remove(b);
    remove_green();
    selected = [];

    x.addEventListener('click', function(){ var classes = this.classList; launch(classes);})
}

// ===== remove green

function remove_green(){
    if(selected_green.length > 0) {
        for(var i = 0; i < selected_green.length; i++){
            selected_green[i].classList.remove('green');
        }
        selected_green = [];
    }
    if(selected_red.length > 0) {
        for(var i = 0; i < selected_red.length; i++){
            selected_red[i].classList.remove('red');
        }
        selected_red = [];
    }
}

document.addEventListener('click', function(){
    if(selected.length == 0){
        remove_green();
    }
})

// ============== CHECK IF CONTAINS

function contain_class(a){
    if(document.getElementById(a) != null){
        var where = document.getElementById(a);
        if(where.classList.contains('pawn') || where.classList.contains('knight') || where.classList.contains('king') || where.classList.contains('queen') || where.classList.contains('rook') || where.classList.contains('bishop')){
            return 0;
        } else if(where.classList.contains('pawn-c') || where.classList.contains('knight-c') || where.classList.contains('king-c') || where.classList.contains('queen-c') || where.classList.contains('rook-c') || where.classList.contains('bishop-c')){
            selected_red.push(where);
            where.classList.add('red');
            return 0;
        } else {
            selected_green.push(where);
            where.classList.add('green');
            return 1;
        }    
    }
}

function king_contain_class(a){
    if(document.getElementById(a) != null){
        var where = document.getElementById(a);
        if(where.classList.contains('pawn') || where.classList.contains('knight') || where.classList.contains('king') || where.classList.contains('queen') || where.classList.contains('rook') || where.classList.contains('bishop')){
            return 0;
        } else if(where.classList.contains('pawn-c') || where.classList.contains('knight-c') || where.classList.contains('king-c') || where.classList.contains('queen-c') || where.classList.contains('rook-c') || where.classList.contains('bishop-c')){
            if(is_king_ok(where).length == 0){
                console.log('is it ok');
                console.log(is_king_ok(where));
                selected_red.push(where);
                where.classList.add('red');
                return 1;
            } else {
                return 0;
            }
            
        } else {
            if(is_king_ok(where).length == 0){
                selected_green.push(where);
                where.classList.add('green');
                return 1;
            } else {
                return 0;
            }  
        }    
    }
}

function knight_contain_class(a){
    if(document.getElementById(a) != null){
        var where = document.getElementById(a);
        if(where.classList.contains('pawn') || where.classList.contains('knight') || where.classList.contains('king') || where.classList.contains('queen') || where.classList.contains('rook') || where.classList.contains('bishop')){
            return 0;
        } else if(where.classList.contains('pawn-c') || where.classList.contains('knight-c') || where.classList.contains('king-c') || where.classList.contains('queen-c') || where.classList.contains('rook-c') || where.classList.contains('bishop-c')){
            return 0;
        } else {
            return 1;
        }    
    }
}

// =============== MOVES FUNCTION

function rook_color(a,b,c){
    for(var i = 1; i < 15; i++){
        if(c == 1){
            var movex = parseInt(a) + i;
            var movey = parseInt(b);
        } else if(c == 2){
            var movex = parseInt(a) - i;
            var movey = parseInt(b);
        } else if(c == 3){
            var movex = parseInt(a);
            var movey = parseInt(b) - i;
        } else if(c == 4){
            var movex = parseInt(a);
            var movey = parseInt(b) + i;
        } 
        var where_id = 'x' + movex + 'y' + movey;
        var git = contain_class(where_id);
        if(git==0){
            break;
        }
    }  
}

function bishop_color(a,b,c){
    for(var i = 1; i < 15; i++){
        if(c == 1){
            var movex = parseInt(a) + i;
            var movey = parseInt(b) + i;
        } else if(c == 2){
            var movex = parseInt(a) - i;
            var movey = parseInt(b) + i;
        } else if(c == 3){
            var movex = parseInt(a) + i;
            var movey = parseInt(b) - i;
        } else if(c == 4){
            var movex = parseInt(a) - i;
            var movey = parseInt(b) - i;
        } 
        var where_id = 'x' + movex + 'y' + movey;
        if(document.getElementById(where_id) == null){
            break;
        }

        var git = contain_class(where_id);
        if(git==0){
            break;
        } 
    }  
}

function king_color(a,b){
    for(var i = 1; i < 9; i++){
        if(i == 1){
            var movex = parseInt(a) + 1;
            var movey = parseInt(b);
        } else if(i == 2){
            var movex = parseInt(a) - 1;
            var movey = parseInt(b);
        } else if(i == 3){
            var movex = parseInt(a) + 1;
            var movey = parseInt(b) - 1;
        } else if(i == 4){
            var movex = parseInt(a) - 1;
            var movey = parseInt(b) - 1;
        } else if(i == 5){
            var movex = parseInt(a);
            var movey = parseInt(b) - 1;
        } else if(i == 6){
            var movex = parseInt(a);
            var movey = parseInt(b) + 1;
        } else if(i == 7){
            var movex = parseInt(a) + 1;
            var movey = parseInt(b) + 1;
        } else if(i == 8){
            var movex = parseInt(a) - 1;
            var movey = parseInt(b) + 1;
        } 
        var where_id = 'x' + movex + 'y' + movey;
        king_contain_class(where_id);       
        
    } 
}

function knight_color(a,b,e){
    for(var c = 1; c<17; c++){
        if(c == 1){  
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a) + 1;
                var movey = parseInt(b);
                knight_check = knight_contain_class('x' + movex + 'y' + movey);
                if(knight_check==1){
                    movex = parseInt(a) + 1;
                    movey = parseInt(b) + 1;
                    knight_check = knight_contain_class('x' + movex + 'y' + movey);
                    if(knight_check==1){
                        movex = parseInt(a) + 1;
                        movey = parseInt(b) + 2;
                        contain_class('x' + movex + 'y' + movey);
                        knight_check = 0;  
                    }
                }
            }    

        } else if(c == 2){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a) - 1;
                var movey = parseInt(b);
                knight_check = knight_contain_class('x' + movex + 'y' + movey);
                if(knight_check==1){
                    movex = parseInt(a) - 1;
                    movey = parseInt(b) + 1;
                    knight_check = knight_contain_class('x' + movex + 'y' + movey);
                    if(knight_check==1){
                        movex = parseInt(a) - 1;
                        movey = parseInt(b) + 2;
                        contain_class('x' + movex + 'y' + movey);
                        knight_check = 0;  
                    }
                }
            }  
        } else if(c == 3){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a) + 1;
                var movey = parseInt(b);
                knight_check = knight_contain_class('x' + movex + 'y' + movey);
                if(knight_check==1){
                    movex = parseInt(a) + 1;
                    movey = parseInt(b) - 1;
                    knight_check = knight_contain_class('x' + movex + 'y' + movey);
                    if(knight_check==1){
                        movex = parseInt(a) + 1;
                        movey = parseInt(b) - 2;
                        contain_class('x' + movex + 'y' + movey);
                        knight_check = 0;  
                    }
                }
            } 
        } else if(c == 4){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a) - 1;
                var movey = parseInt(b);
                knight_check = knight_contain_class('x' + movex + 'y' + movey);
                if(knight_check==1){
                    movex = parseInt(a) - 1;
                    movey = parseInt(b) - 1;
                    knight_check = knight_contain_class('x' + movex + 'y' + movey);
                    if(knight_check==1){
                        movex = parseInt(a) - 1;
                        movey = parseInt(b) - 2;
                        contain_class('x' + movex + 'y' + movey);
                        knight_check = 0;  
                    }
                }
            } 
        } else if(c == 5){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a) + 1;
                var movey = parseInt(b);
                knight_check = knight_contain_class('x' + movex + 'y' + movey);
                if(knight_check==1){
                    movex = parseInt(a) + 2;
                    movey = parseInt(b);
                    knight_check = knight_contain_class('x' + movex + 'y' + movey);
                    if(knight_check==1){
                        movex = parseInt(a) + 2;
                        movey = parseInt(b) + 1;
                        contain_class('x' + movex + 'y' + movey);
                        knight_check = 0;  
                    }
                }
            } 
        } else if(c == 6){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a) + 1;
                var movey = parseInt(b);
                knight_check = knight_contain_class('x' + movex + 'y' + movey);
                if(knight_check==1){
                    movex = parseInt(a) + 2;
                    movey = parseInt(b);
                    knight_check = knight_contain_class('x' + movex + 'y' + movey);
                    if(knight_check==1){
                        movex = parseInt(a) + 2;
                        movey = parseInt(b) - 1;
                        contain_class('x' + movex + 'y' + movey);
                        knight_check = 0;  
                    }
                }
            } 
        } else if(c == 7){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a) - 1;
                var movey = parseInt(b);
                knight_check = knight_contain_class('x' + movex + 'y' + movey);
                if(knight_check==1){
                    movex = parseInt(a) - 2;
                    movey = parseInt(b);
                    knight_check = knight_contain_class('x' + movex + 'y' + movey);
                    if(knight_check==1){
                        movex = parseInt(a) - 2;
                        movey = parseInt(b) + 1;
                        contain_class('x' + movex + 'y' + movey);
                        knight_check = 0;  
                    }
                }
            } 
        } else if(c == 8){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a) - 1;
                var movey = parseInt(b);
                knight_check = knight_contain_class('x' + movex + 'y' + movey);
                if(knight_check==1){
                    movex = parseInt(a) - 2;
                    movey = parseInt(b);
                    knight_check = knight_contain_class('x' + movex + 'y' + movey);
                    if(knight_check==1){
                        movex = parseInt(a) - 2;
                        movey = parseInt(b) - 1;
                        contain_class('x' + movex + 'y' + movey);
                        knight_check = 0;  
                    }
                }
            } 
        } else if(c == 9){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a);
                var movey = parseInt(b) + 1;
                knight_check = knight_contain_class('x' + movex + 'y' + movey);
                if(knight_check==1){
                    movex = parseInt(a);
                    movey = parseInt(b) + 2;
                    knight_check = knight_contain_class('x' + movex + 'y' + movey);
                    if(knight_check==1){
                        movex = parseInt(a) + 1;
                        movey = parseInt(b) + 2;
                        contain_class('x' + movex + 'y' + movey);
                        knight_check = 0;  
                    }
                }
            } 
        } else if(c == 10){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a);
                var movey = parseInt(b) + 1;
                knight_check = knight_contain_class('x' + movex + 'y' + movey);
                if(knight_check==1){
                    movex = parseInt(a);
                    movey = parseInt(b) + 2;
                    knight_check = knight_contain_class('x' + movex + 'y' + movey);
                    if(knight_check==1){
                        movex = parseInt(a) - 1;
                        movey = parseInt(b) + 2;
                        contain_class('x' + movex + 'y' + movey);
                        knight_check = 0;  
                    }
                }
            } 
        } else if(c == 11){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a);
                var movey = parseInt(b) - 1;
                knight_check = knight_contain_class('x' + movex + 'y' + movey);
                if(knight_check==1){
                    movex = parseInt(a);
                    movey = parseInt(b) - 2;
                    knight_check = knight_contain_class('x' + movex + 'y' + movey);
                    if(knight_check==1){
                        movex = parseInt(a) + 1;
                        movey = parseInt(b) - 2;
                        contain_class('x' + movex + 'y' + movey);
                        knight_check = 0;  
                    }
                }
            } 
        } else if(c == 12){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a);
                var movey = parseInt(b) - 1;
                knight_check = knight_contain_class('x' + movex + 'y' + movey);
                if(knight_check==1){
                    movex = parseInt(a);
                    movey = parseInt(b) - 2;
                    knight_check = knight_contain_class('x' + movex + 'y' + movey);
                    if(knight_check==1){
                        movex = parseInt(a) - 1;
                        movey = parseInt(b) - 2;
                        contain_class('x' + movex + 'y' + movey);
                        knight_check = 0;  
                    }
                }
            } 
        } else if(c == 13){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a);
                var movey = parseInt(b) + 1;
                knight_check = knight_contain_class('x' + movex + 'y' + movey);
                if(knight_check==1){
                    movex = parseInt(a) + 1;
                    movey = parseInt(b) + 1;
                    knight_check = knight_contain_class('x' + movex + 'y' + movey);
                    if(knight_check==1){
                        movex = parseInt(a) + 2;
                        movey = parseInt(b) + 1;
                        contain_class('x' + movex + 'y' + movey);
                        knight_check = 0;  
                    }
                }
            } 
        } else if(c == 14){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a);
                var movey = parseInt(b) - 1;
                knight_check = knight_contain_class('x' + movex + 'y' + movey);
                if(knight_check==1){
                    movex = parseInt(a) + 1;
                    movey = parseInt(b) - 1;
                    knight_check = knight_contain_class('x' + movex + 'y' + movey);
                    if(knight_check==1){
                        movex = parseInt(a) + 2;
                        movey = parseInt(b) - 1;
                        contain_class('x' + movex + 'y' + movey);
                        knight_check = 0;  
                    }
                }
            } 
        } else if(c == 15){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a);
                var movey = parseInt(b) + 1;
                knight_check = knight_contain_class('x' + movex + 'y' + movey);
                if(knight_check==1){
                    movex = parseInt(a) - 1;
                    movey = parseInt(b) + 1;
                    knight_check = knight_contain_class('x' + movex + 'y' + movey);
                    if(knight_check==1){
                        movex = parseInt(a) - 2;
                        movey = parseInt(b) + 1;
                        contain_class('x' + movex + 'y' + movey);
                        knight_check = 0;  
                    }
                }
            } 
        } else if(c == 16){
            var knight_check = 1;  
            if(knight_check==1){
                var movex = parseInt(a);
                var movey = parseInt(b) - 1;
                knight_check = knight_contain_class('x' + movex + 'y' + movey);
                if(knight_check==1){
                    movex = parseInt(a) - 1;
                    movey = parseInt(b) - 1;
                    knight_check = knight_contain_class('x' + movex + 'y' + movey);
                    if(knight_check==1){
                        movex = parseInt(a) - 2;
                        movey = parseInt(b) - 1;
                        contain_class('x' + movex + 'y' + movey);
                        knight_check = 0;  
                    }
                }
            } 
        } 
        
        var where_id = 'x' + movex + 'y' + movey;
        
    }  
}


// =============== CHECK MOVES

function moves(a, b, c) {
    var xpos = b;
    if(c=='double'){
        var ypos = b;
    } else if(b == 'double'){
        var xpos = a;
        var ypos = a;
        a = c;
    } else if(c == 'pawn' || c == 'rook' || c == 'king' || c == 'knight' || c == 'queen' || c == 'bishop'){
        var xpos = a;
        var ypos = b;
        a = c;
    }else {
        var ypos = c;
    }

    if(a == 'pawn') {
        
        // color where to move
        var movex = parseInt(xpos);
        var movey = parseInt(ypos) + 1;
        var where_id = 'x' + movex + 'y' + movey;

        var where_id_left = 'x' + (movex - 1) + 'y' + movey;
        var where_id_right = 'x' + (movex + 1) + 'y' + movey;

        remove_green();

        if(document.getElementById(where_id_left) != null){
            var left_side = document.getElementById(where_id_left);
            if(left_side.classList.contains('pawn-c') || left_side.classList.contains('knight-c') || left_side.classList.contains('king-c') || left_side.classList.contains('queen-c') || left_side.classList.contains('rook-c') || left_side.classList.contains('bishop-c')){
                selected_red.push(left_side);
                left_side.classList.add('red');
            }
        }
        if(document.getElementById(where_id_right) != null){
            var right_side = document.getElementById(where_id_right);
            if(right_side.classList.contains('pawn-c') || right_side.classList.contains('knight-c') || right_side.classList.contains('king-c') || right_side.classList.contains('queen-c') || right_side.classList.contains('rook-c') || right_side.classList.contains('bishop-c')){
                selected_red.push(right_side);
                right_side.classList.add('red');
            }
        }
       
        contain_class(where_id);
        console.log(movey);

        if(movey==3){
            contain_class('x' + movex + 'y' + (movey + 1));
        }

        if(document.getElementById(where_id) != null){
            where_id = document.getElementById(where_id);
            if(where_id.classList.contains('pawn-c') || where_id.classList.contains('knight-c') || where_id.classList.contains('king-c') || where_id.classList.contains('queen-c') || where_id.classList.contains('rook-c') || where_id.classList.contains('bishop-c')){
                selected_red.pop();
                where_id.classList.remove('red');
            }
        }

        

    } else if(a == 'rook') {

        // color where to move
        remove_green();

        // top
        rook_color(xpos, ypos, 1);
        // left
        rook_color(xpos, ypos, 2);
        // right
        rook_color(xpos, ypos, 3);
        // bottom 
        rook_color(xpos, ypos, 4);

    } else if(a == 'knight') {
        
        // color where to move
        remove_green();
        knight_color(xpos, ypos, 9);   

    } else if(a == 'bishop') {
        
        // color where to move
        remove_green();

        // top right
        bishop_color(xpos, ypos, 1);
        // top left
        bishop_color(xpos, ypos, 2);
        // bottom right
        bishop_color(xpos, ypos, 3);
        // bottom left
        bishop_color(xpos, ypos, 4);
        

    } else if(a == 'queen') {
        
        // color where to move
        remove_green();

        // top
        rook_color(xpos, ypos, 1);
        // left
        rook_color(xpos, ypos, 2);
        // right
        rook_color(xpos, ypos, 3);
        // bottom 
        rook_color(xpos, ypos, 4);
         // top right
         bishop_color(xpos, ypos, 1);
         // top left
         bishop_color(xpos, ypos, 2);
         // bottom right
         bishop_color(xpos, ypos, 3);
         // bottom left
         bishop_color(xpos, ypos, 4);

    } else if(a == 'king') {
    
        // color where to move
        remove_green();

        king_color(xpos, ypos);
    }
}

function problem(x) {
    var a = select(x);
    if(a=='problem'){
        launch(document.getElementsByClassName('king')[0].classList);
        select(document.getElementsByClassName('king')[0]);
        if(document.getElementsByClassName('green').length == 0){
            alert('game over');
        }
    }
    
}
