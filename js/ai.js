var turn = 0

function ai(){
    turn++;
    console.log('---------turn ' + turn + ' -----------');

    
    if(turn < 5){
        var pawns = document.querySelectorAll('.pawn-c');
        var number = Math.floor(Math.random() * pawns.length);
        var x = pawns[number].classList;
        var current = x[1];
        var pos1 = x[2];
        var pos2 = x[3];

        var a = moves_ai(current, pos1, pos2, x);  
        while(a==0){
            var number = Math.floor(Math.random() * pawns.length);
            var x = pawns[number].classList;
            var current = x[1];
            var pos1 = x[2];
            var pos2 = x[3];
            a = moves_ai(current, pos1, pos2, x);  
        }
        




    } else {
        var all = [];
        var pawns = document.querySelectorAll('.pawn-c');
        if(pawns.length > 0){
            all.push(pawns);
        }
        var rooks = document.querySelectorAll('.rook-c');
        if(rooks.length > 0){
            all.push(rooks);
        }
        var knights = document.querySelectorAll('.knight-c');
        if(knights.length > 0){
            all.push(knights);
        }
        var bishops = document.querySelectorAll('.bishop-c');
        if(bishops.length > 0){
            all.push(bishops);
        }
        var queen = document.querySelectorAll('.queen-c');
        if(queen.length > 0){
            all.push(queen);
        }
        var king = document.querySelectorAll('.king-c');
        if(king.length > 0){
            all.push(king);
        }

        var sector = Math.floor(Math.random() * all.length);
        var sector_number = Math.floor(Math.random() * all[sector].length);

        var x = all[sector][sector_number].classList;
        console.log('position ' + x);
        var current = x[1];
        var pos1 = x[2];
        var pos2 = x[3];

        var a = moves_ai(current, pos1, pos2, x); 
        console.log('moves to ' + a);

        while(a==0){
            console.log('cant');
            var all = [pawns, rooks, knights, bishops, queen, king];
            var sector = Math.floor(Math.random() * all.length);
            var sector_number = Math.floor(Math.random() * all[sector].length);

            var x = all[sector][sector_number].classList;

            console.log('position ' + x);
            var current = x[1];
            var pos1 = x[2];
            var pos2 = x[3];
            a = moves_ai(current, pos1, pos2, x);
            console.log('moves to ' + a);  
        }
    }
}

// ============ check moves

function moves_ai(a, b, c, d){

    var xpos = b;
    if(c=='double'){
        var ypos = b;
    } else if(b == 'double'){
        var xpos = a;
        var ypos = a;
        a = c;
    } else if(c == 'pawn-c' || c == 'rook-c' || c == 'king-c' || c == 'knight-c' || c == 'queen-c' || c == 'bishop-c'){
        var xpos = a;
        var ypos = b;
        a = c;
    }else {
        var ypos = c;
    }

    if(a == 'pawn-c') {

        var movex = parseInt(xpos);
        var movey = parseInt(ypos) - 1;
        var where_id = 'x' + movex + 'y' + movey;

        var bot_left = 'x' + (movex - 1) + 'y' + movey;
        var bot_right = 'x' + (movex + 1) + 'y' + movey;
        
        if(is_player(bot_right) == 1){
            document.getElementById(bot_right).classList.remove('pawn','rook','bishop','knight','king','queen');
            document.getElementById(bot_right).classList.add('pawn-c');
            d.remove('pawn-c');
            return bot_right;
        } else if(is_player(bot_left) == 1){
            document.getElementById(bot_left).classList.remove('pawn','rook','bishop','knight','king','queen');
            document.getElementById(bot_left).classList.add('pawn-c');
            d.remove('pawn-c');
            return bot_left;
        } else if(is_player(where_id) == 1 || is_ai(where_id) == 1){
            return 0;
        } else if(document.getElementById(where_id) != null){
            document.getElementById(where_id).classList.add('pawn-c');
            d.remove('pawn-c');
            return where_id;
        } else {
            return 0;
        }
    } else if(a == 'rook-c') {
    
        var locked = rook_locked(xpos, ypos);

        var bot_locked = locked[0];
        var top_locked = locked[1];
        var left_locked = locked[2];
        var right_locked = locked[3];

        var direction = [];
        if(bot_locked == 0){
            direction.push('bot');
        }
        if(top_locked == 0){
            direction.push('top');
        }
        if(right_locked == 0){
            direction.push('right');
        }
        if(left_locked == 0){
            direction.push('left');
        }
        if(direction.length==0){
            return 0;
        }

        var direction_chosen = direction[Math.floor(Math.random() * direction.length)];

        var move_to = rook_range(xpos, ypos, direction_chosen);

        if(move_to[1] == 'player'){
            document.getElementById(move_to[0]).classList.remove('pawn','rook','bishop','knight','king','queen');
            document.getElementById(move_to[0]).classList.add('rook-c');
            d.remove('rook-c');
        } else {
            document.getElementById(move_to).classList.add('rook-c');
            d.remove('rook-c');
        } 

        return move_to;

    } else if(a == 'bishop-c') {

        var locked = bishop_locked(xpos, ypos);

        var bot_right_locked = locked[0];
        var top_right_locked = locked[1];
        var bot_left_locked = locked[2];
        var top_left_locked = locked[3];

        var direction = [];
        if(bot_right_locked == 0){
            direction.push('bot-right');
        }
        if(top_right_locked == 0){
            direction.push('top-right');
        }
        if(bot_left_locked == 0){
            direction.push('bot-left');
        }
        if(top_left_locked == 0){
            direction.push('top-left');
        }
        if(direction.length==0){
            return 0;
        }

        var direction_chosen = direction[Math.floor(Math.random() * direction.length)];

        var move_to = bishop_range(xpos, ypos, direction_chosen);

        if(move_to[1] == 'player'){
            document.getElementById(move_to[0]).classList.remove('pawn','rook','bishop','knight','king','queen');
            document.getElementById(move_to[0]).classList.add('bishop-c');
            d.remove('bishop-c');
        } else {
            document.getElementById(move_to).classList.add('bishop-c');
            d.remove('bishop-c');
        } 
        
        return move_to;   
        
    } else if(a == 'knight-c') {

        var move_to = knight_range(xpos, ypos, 1);
        if(move_to==0){
            return 0;
        } else if(move_to[1] == 'player'){
            document.getElementById(move_to[0]).classList.remove('pawn','rook','bishop','knight','king','queen');
            document.getElementById(move_to[0]).classList.add('knight-c');
            d.remove('knight-c');
        } else {
            document.getElementById(move_to).classList.add('knight-c');
            d.remove('knight-c');
        } 
        return move_to;

    } else if(a == 'queen-c') {

        var locked = bishop_locked(xpos, ypos);

        var bot_right_locked = locked[0];
        var top_right_locked = locked[1];
        var bot_left_locked = locked[2];
        var top_left_locked = locked[3];

        var direction = [];
        if(bot_right_locked == 0){
            direction.push('bot-right');
        }
        if(top_right_locked == 0){
            direction.push('top-right');
        }
        if(bot_left_locked == 0){
            direction.push('bot-left');
        }
        if(top_left_locked == 0){
            direction.push('top-left');
        }

        var locked = rook_locked(xpos, ypos);

        var bot_locked = locked[0];
        var top_locked = locked[1];
        var left_locked = locked[2];
        var right_locked = locked[3];

        if(bot_locked == 0){
            direction.push('bot');
        }
        if(top_locked == 0){
            direction.push('top');
        }
        if(right_locked == 0){
            direction.push('right');
        }
        if(left_locked == 0){
            direction.push('left');
        }
        if(direction.length==0){
            return 0;
        }

        var direction_chosen = direction[Math.floor(Math.random() * direction.length)];
        if(direction_chosen.length < 6){
            var move_to = rook_range(xpos, ypos, direction_chosen);
        } else {
            var move_to = bishop_range(xpos, ypos, direction_chosen);
        }

        if(move_to[1] == 'player'){
            document.getElementById(move_to[0]).classList.remove('pawn','rook','bishop','knight','king','queen');
            document.getElementById(move_to[0]).classList.add('queen-c');
            d.remove('queen-c');
        } else {
            document.getElementById(move_to).classList.add('queen-c');
            d.remove('queen-c');
        } 
        
        return move_to;
        
    } else if(a == 'king-c') {

        var locked = bishop_locked(xpos, ypos);

        var bot_right_locked = locked[0];
        var top_right_locked = locked[1];
        var bot_left_locked = locked[2];
        var top_left_locked = locked[3];

        var direction = [];
        if(bot_right_locked == 0){
            direction.push('bot-right');
        }
        if(top_right_locked == 0){
            direction.push('top-right');
        }
        if(bot_left_locked == 0){
            direction.push('bot-left');
        }
        if(top_left_locked == 0){
            direction.push('top-left');
        }

        var locked = rook_locked(xpos, ypos);

        var bot_locked = locked[0];
        var top_locked = locked[1];
        var left_locked = locked[2];
        var right_locked = locked[3];

        if(bot_locked == 0){
            direction.push('bot');
        }
        if(top_locked == 0){
            direction.push('top');
        }
        if(right_locked == 0){
            direction.push('right');
        }
        if(left_locked == 0){
            direction.push('left');
        }
        if(direction.length==0){
            return 0;
        }
        var direction_chosen = direction[Math.floor(Math.random() * direction.length)];
        var move_to = king_range(xpos, ypos, direction_chosen);

        if(move_to[1] == 'player'){
            document.getElementById(move_to[0]).classList.remove('pawn','rook','bishop','knight','king','queen');
            document.getElementById(move_to[0]).classList.add('king-c');
            d.remove('king-c');
        } else {
            document.getElementById(move_to).classList.add('king-c');
            d.remove('king-c');
        } 
        
        return move_to;  
        
    }
}

// ========= check if where_id contains player or computer

function is_player(a){
    if(document.getElementById(a) == null){
        return 0;
    }
    var classes = document.getElementById(a).classList;
    if(classes.contains('pawn') || classes.contains('rook') || classes.contains('knight') || classes.contains('queen') || classes.contains('bishop') || classes.contains('king')){
        return 1;
    } else {
        return 0;
    }
}
function is_ai(a){
    if(document.getElementById(a) == null){
        return 1;
    } else {
        var classes = document.getElementById(a).classList;
        if(classes.contains('pawn-c') || classes.contains('rook-c') || classes.contains('knight-c') || classes.contains('queen-c') || classes.contains('bishop-c') || classes.contains('king-c')){
            return 1;
        } else {
            return 0;
        }
    }
}

// ========= check if position is locked

function rook_locked(xpos, ypos){
    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    
    // ======= check if bottom is locked
    var movex1 = parseInt(xpos);
    var movey1 = parseInt(ypos) - 1;
    var where_id1 = 'x' + movex1 + 'y' + movey1;
    if(is_ai(where_id1) == 1 || is_ai(where_id1) == null){
        a = 1;
    }

    // ======= check if top is locked
    var movex2 = parseInt(xpos);
    var movey2 = parseInt(ypos) + 1;
    var where_id2 = 'x' + movex2 + 'y' + movey2;
    if(is_ai(where_id2) == 1 || is_ai(where_id2) == null){
        b = 1;
    }

    // ======= check if left is locked
    var movex3 = parseInt(xpos) - 1;
    var movey3 = parseInt(ypos);
    var where_id3 = 'x' + movex3 + 'y' + movey3;
    if(is_ai(where_id3) == 1 || is_ai(where_id3) == null){
        c = 1;
    }

    // ======= check if right is locked
    var movex4 = parseInt(xpos) + 1;
    var movey4 = parseInt(ypos);
    var where_id4 = 'x' + movex4 + 'y' + movey4;
    if(is_ai(where_id4) == 1 || is_ai(where_id4) == null){
        d = 1;
    }
    var locked_table = [];
    locked_table.push(a,b,c,d);
    return locked_table;
    
}

function bishop_locked(xpos, ypos){
    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    
    // ======= check if bottom right is locked
    var movex1 = parseInt(xpos) + 1;
    var movey1 = parseInt(ypos) - 1;
    var where_id1 = 'x' + movex1 + 'y' + movey1;
    if(is_ai(where_id1) == 1 || is_ai(where_id1) == null){
        a = 1;
    }

    // ======= check if top right is locked
    var movex2 = parseInt(xpos) + 1;
    var movey2 = parseInt(ypos) + 1;
    var where_id2 = 'x' + movex2 + 'y' + movey2;
    if(is_ai(where_id2) == 1 || is_ai(where_id2) == null){
        b = 1;
    }

    // ======= check if bottom left is locked
    var movex3 = parseInt(xpos) - 1;
    var movey3 = parseInt(ypos) - 1;
    var where_id3 = 'x' + movex3 + 'y' + movey3;
    if(is_ai(where_id3) == 1 || is_ai(where_id3) == null){
        c = 1;
    }

    // ======= check if top left is locked
    var movex4 = parseInt(xpos) - 1;
    var movey4 = parseInt(ypos) + 1;
    var where_id4 = 'x' + movex4 + 'y' + movey4;
    if(is_ai(where_id4) == 1 || is_ai(where_id4) == null){
        d = 1;
    }
    var locked_table = [];
    locked_table.push(a,b,c,d);
    return locked_table;
    
}

// =========== check range of direction

function rook_range(a,b,c){

    var direction_range = [];
    var players = [];

    if(c=='top'){
        for(var i = 1; i < 15; i++){
            var movex = parseInt(a);
            var movey = parseInt(b) + i;

            var movexy = 'x' + movex + 'y' + movey;
            if(is_player(movexy)){
                players.push(movexy);
                break;
            } else if(is_ai(movexy)){
                break;
            } else {
                direction_range.push(movexy);
            }

        }
    } else if(c=='bot'){
        for(var i = 1; i < 15; i++){
            var movex = parseInt(a);
            var movey = parseInt(b) - i;

            var movexy = 'x' + movex + 'y' + movey;
            if(is_player(movexy)){
                players.push(movexy);
                break;
            } else if(is_ai(movexy)){
                break;
            } else {
                direction_range.push(movexy);
            }

        }
    } else if(c=='right'){
        for(var i = 1; i < 15; i++){
            var movex = parseInt(a) + i;
            var movey = parseInt(b);

            var movexy = 'x' + movex + 'y' + movey;
            if(is_player(movexy)){
                players.push(movexy);
                break;
            } else if(is_ai(movexy)){
                break;
            } else {
                direction_range.push(movexy);
            }

        }
    } else if(c=='left'){
        for(var i = 1; i < 15; i++){
            var movex = parseInt(a) - i;
            var movey = parseInt(b);

            var movexy = 'x' + movex + 'y' + movey;
            if(is_player(movexy)){
                players.push(movexy);
                break;
            } else if(is_ai(movexy)){
                break;
            } else {
                direction_range.push(movexy);
            }

        }
    }

    if(players.length > 0){
        var direction_accurate = players[Math.floor(Math.random() * players.length)];
        return [direction_accurate, 'player'];
    } else {
        var direction_accurate = direction_range[Math.floor(Math.random() * direction_range.length)];
        return direction_accurate;
    }
    
}

function bishop_range(a,b,c){

    var direction_range = [];
    var players = [];

    if(c=='top-right'){
        for(var i = 1; i < 15; i++){
            var movex = parseInt(a) + i;
            var movey = parseInt(b) + i;

            var movexy = 'x' + movex + 'y' + movey;
            if(is_player(movexy)){
                players.push(movexy);
                break;
            } else if(is_ai(movexy)){
                break;
            } else {
                direction_range.push(movexy);
            }

        }
    } else if(c=='bot-right'){
        for(var i = 1; i < 15; i++){
            var movex = parseInt(a) + i;
            var movey = parseInt(b) - i;

            var movexy = 'x' + movex + 'y' + movey;
            if(is_player(movexy)){
                players.push(movexy);
                break;
            } else if(is_ai(movexy)){
                break;
            } else {
                direction_range.push(movexy);
            }

        }
    } else if(c=='top-left'){
        for(var i = 1; i < 15; i++){
            var movex = parseInt(a) - i;
            var movey = parseInt(b) + i;

            var movexy = 'x' + movex + 'y' + movey;
            if(is_player(movexy)){
                players.push(movexy);
                break;
            } else if(is_ai(movexy)){
                break;
            } else {
                direction_range.push(movexy);
            }

        }
    } else if(c=='bot-left'){
        for(var i = 1; i < 15; i++){
            var movex = parseInt(a) - i;
            var movey = parseInt(b) - i;

            var movexy = 'x' + movex + 'y' + movey;
            if(is_player(movexy)){
                players.push(movexy);
                break;
            } else if(is_ai(movexy)){
                break;
            } else {
                direction_range.push(movexy);
            }

        }
    }

    if(players.length > 0){
        var direction_accurate = players[Math.floor(Math.random() * players.length)];
        return [direction_accurate, 'player'];
    } else {
        var direction_accurate = direction_range[Math.floor(Math.random() * direction_range.length)];
        return direction_accurate;
    }
}

function king_range(a,b,c){

    var direction_range = [];
    var players = [];

    if(c=='top-right'){
        var movex = parseInt(a) + 1;
        var movey = parseInt(b) + 1;

        var movexy = 'x' + movex + 'y' + movey;
        if(is_player(movexy)==1){
            players.push(movexy);
        } else if(is_ai(movexy)==0){
            direction_range.push(movexy);
        }
    } else if(c=='bot-right'){
        var movex = parseInt(a) + 1;
        var movey = parseInt(b) - 1;

        var movexy = 'x' + movex + 'y' + movey;
        if(is_player(movexy)==1){
            players.push(movexy);
        } else if(is_ai(movexy)==0){
            direction_range.push(movexy);
        }
    } else if(c=='top-left'){
        var movex = parseInt(a) - 1;
        var movey = parseInt(b) + 1;

        var movexy = 'x' + movex + 'y' + movey;
        if(is_player(movexy)==1){
            players.push(movexy);
        } else if(is_ai(movexy)==0){
            direction_range.push(movexy);
        }
    } else if(c=='bot-left'){
        var movex = parseInt(a) - 1;
        var movey = parseInt(b) - 1;

        var movexy = 'x' + movex + 'y' + movey;
        if(is_player(movexy)==1){
            players.push(movexy);
        } else if(is_ai(movexy)==0){
            direction_range.push(movexy);
        }
    } else if(c=='top'){
        var movex = parseInt(a);
        var movey = parseInt(b) + 1;

        var movexy = 'x' + movex + 'y' + movey;
        if(is_player(movexy)==1){
            players.push(movexy);
        } else if(is_ai(movexy)==0){
            direction_range.push(movexy);
        }
    } else if(c=='bot'){
        var movex = parseInt(a);
        var movey = parseInt(b) - 1;

        var movexy = 'x' + movex + 'y' + movey;
        if(is_player(movexy)==1){
            players.push(movexy);
        } else if(is_ai(movexy)==0){
            direction_range.push(movexy);
        }
    } else if(c=='left'){
        var movex = parseInt(a) - 1;
        var movey = parseInt(b);

        var movexy = 'x' + movex + 'y' + movey;
        if(is_player(movexy)==1){
            players.push(movexy);
        } else if(is_ai(movexy)==0){
            direction_range.push(movexy);
        }
    } else if(c=='right'){
        var movex = parseInt(a) + 1;
        var movey = parseInt(b);

        var movexy = 'x' + movex + 'y' + movey;
        if(is_player(movexy)==1){
            players.push(movexy);
        } else if(is_ai(movexy)==0){
            direction_range.push(movexy);
        }
    }

    if(players.length > 0){
        var direction_accurate = players[Math.floor(Math.random() * players.length)];
        return [direction_accurate, 'player'];
    } else {
        var direction_accurate = direction_range[Math.floor(Math.random() * direction_range.length)];
        return direction_accurate;
    }
}

function knight_range(a,b,d){
    var there = [];
    var players = [];

    for(var c = 1; c<17; c++){
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

                        knight_check = is_ai('x' + movex + 'y' + movey);

                        if(is_player('x' + movex + 'y' + movey)==1){
                            players.push('x' + movex + 'y' + movey);
                        }
                        if(knight_check==0){
                            there.push('x' + movex + 'y' + movey);
                            knight_check = 1;
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
                        
                        knight_check = is_ai('x' + movex + 'y' + movey);
                        if(is_player('x' + movex + 'y' + movey)==1){
                            players.push('x' + movex + 'y' + movey);
                        }
                        if(knight_check==0){
                            there.push('x' + movex + 'y' + movey);
                            knight_check = 1;
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
                        
                        knight_check = is_ai('x' + movex + 'y' + movey);
                        if(is_player('x' + movex + 'y' + movey)==1){
                            players.push('x' + movex + 'y' + movey);
                        }
                        if(knight_check==0){
                            there.push('x' + movex + 'y' + movey);
                            knight_check = 1;
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
                        
                        knight_check = is_ai('x' + movex + 'y' + movey);
                        if(is_player('x' + movex + 'y' + movey)==1){
                            players.push('x' + movex + 'y' + movey);
                        }
                        if(knight_check==0){
                            there.push('x' + movex + 'y' + movey);
                            knight_check = 1;
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
                        
                        knight_check = is_ai('x' + movex + 'y' + movey);
                        if(is_player('x' + movex + 'y' + movey)==1){
                            players.push('x' + movex + 'y' + movey);
                        }
                        if(knight_check==0){
                            there.push('x' + movex + 'y' + movey);
                            knight_check = 1;
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
                        
                        knight_check = is_ai('x' + movex + 'y' + movey);
                        if(is_player('x' + movex + 'y' + movey)==1){
                            players.push('x' + movex + 'y' + movey);
                        }
                        if(knight_check==0){
                            there.push('x' + movex + 'y' + movey);
                            knight_check = 1;
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
                        
                        knight_check = is_ai('x' + movex + 'y' + movey);
                        if(is_player('x' + movex + 'y' + movey)==1){
                            players.push('x' + movex + 'y' + movey);
                        }
                        if(knight_check==0){
                            there.push('x' + movex + 'y' + movey);
                            knight_check = 1;
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
                        
                        knight_check = is_ai('x' + movex + 'y' + movey);
                        if(is_player('x' + movex + 'y' + movey)==1){
                            players.push('x' + movex + 'y' + movey);
                        }
                        if(knight_check==0){
                            there.push('x' + movex + 'y' + movey);
                            knight_check = 1;
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
                        
                        knight_check = is_ai('x' + movex + 'y' + movey);
                        if(is_player('x' + movex + 'y' + movey)==1){
                            players.push('x' + movex + 'y' + movey);
                        }
                        if(knight_check==0){
                            there.push('x' + movex + 'y' + movey);
                            knight_check = 1;
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
                        
                        knight_check = is_ai('x' + movex + 'y' + movey);
                        if(is_player('x' + movex + 'y' + movey)==1){
                            players.push('x' + movex + 'y' + movey);
                        }
                        if(knight_check==0){
                            there.push('x' + movex + 'y' + movey);
                            knight_check = 1;
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
                        
                        knight_check = is_ai('x' + movex + 'y' + movey);
                        if(is_player('x' + movex + 'y' + movey)==1){
                            players.push('x' + movex + 'y' + movey);
                        }
                        if(knight_check==0){
                            there.push('x' + movex + 'y' + movey);
                            knight_check = 1;
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
                        
                        knight_check = is_ai('x' + movex + 'y' + movey);
                        if(is_player('x' + movex + 'y' + movey)==1){
                            players.push('x' + movex + 'y' + movey);
                        }
                        if(knight_check==0){
                            there.push('x' + movex + 'y' + movey);
                            knight_check = 1;
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
                        
                        knight_check = is_ai('x' + movex + 'y' + movey);
                        if(is_player('x' + movex + 'y' + movey)==1){
                            players.push('x' + movex + 'y' + movey);
                        }
                        if(knight_check==0){
                            there.push('x' + movex + 'y' + movey);
                            knight_check = 1;
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
                        
                        knight_check = is_ai('x' + movex + 'y' + movey);
                        if(is_player('x' + movex + 'y' + movey)==1){
                            players.push('x' + movex + 'y' + movey);
                        }
                        if(knight_check==0){
                            there.push('x' + movex + 'y' + movey);
                            knight_check = 1;
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
                        
                        knight_check = is_ai('x' + movex + 'y' + movey);
                        if(is_player('x' + movex + 'y' + movey)==1){
                            players.push('x' + movex + 'y' + movey);
                        }
                        if(knight_check==0){
                            there.push('x' + movex + 'y' + movey);
                            knight_check = 1;
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
                        
                        knight_check = is_ai('x' + movex + 'y' + movey);
                        if(is_player('x' + movex + 'y' + movey)==1){
                            players.push('x' + movex + 'y' + movey);
                        }
                        if(knight_check==0){
                            there.push('x' + movex + 'y' + movey);
                            knight_check = 1;
                        } 
                    }
                }
            } 
        } 
        
        
        
    }  
    if(there.length==0){
        return 0;
    } else if(players.length > 0){
        var direction_accurate = players[Math.floor(Math.random() * players.length)];
        return [direction_accurate, 'player'];
    } else {
        var direction_accurate = there[Math.floor(Math.random() * there.length)];
        return direction_accurate;
    }    
}
