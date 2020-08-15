let card_display = [];

let card1 = document.querySelector('#card1');
let card2 = document.querySelector('#card2');
let card3 = document.querySelector('#card3');
let card4 = document.querySelector('#card4');
let cards = [card1, card2, card3, card4];

let imgs = [document.querySelector('#img1'), document.querySelector('#img2'), document.querySelector('#img3'), document.querySelector('#img4')];
let whos = [document.querySelector('#who1'), document.querySelector('#who2'), document.querySelector('#who3'), document.querySelector('#who4')];
let wheres = [document.querySelector('#where1'), document.querySelector('#where2'), document.querySelector('#where3'), document.querySelector('#where4')];

function card(x, y) {
    if(card_display.length < 4) {
        card_display.unshift(x);
    } else {
        card_display.pop();
        card_display.unshift(x);
    }
    
    for(let i = 0; i < card_display.length; i++){
        cards[i].classList.remove('none');
        whos[i].innerHTML = card_display[i].who.substring(0, card_display[i].who.length - 2);

        var set_img = "imgs[i].src = 'img/" + whos[i].innerHTML + "-c.png'";
        eval(set_img);

        wheres[i].classList.remove('danger');

        if(card_display[i].where.length == 2){
            wheres[i].classList.add('danger');
            wheres[i].innerHTML = card_display[i].where[0];
        } else {
            wheres[i].innerHTML = card_display[i].where;
        }
        
    }
    
}

function find_who(a,b,c,d) {
    if(b == 'double'){
        a = c;
    } else if(c == 'pawn-c' || c == 'rook-c' || c == 'king-c' || c == 'knight-c' || c == 'queen-c' || c == 'bishop-c'){
        a = c;
    }
    return a;
}