  /*----- constants -----*/
  const SOURCE_CARDS = [
    {img: 'https://qph.cf2.quoracdn.net/main-qimg-695738808cf3bc66b089f3584cb7dd4d-lq', matched: false},
    {img: 'https://s26162.pcdn.co/wp-content/uploads/2023/02/superman-1240x692.jpeg', matched: false},
    {img: 'https://i0.wp.com/batman-news.com/wp-content/uploads/2022/11/The-Adventures-of-Batman-Blu-ray-Featured-01.jpg?resize=696%2C392&quality=80&strip=info&ssl=1', matched: false},
    {img: 'https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png', matched: false},
    {img: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/20/Supergirl_%28Kara_Zor-El_circa_2016%29.png/220px-Supergirl_%28Kara_Zor-El_circa_2016%29.png', matched: false},
    {img: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/20/Supergirl_%28Kara_Zor-El_circa_2016%29.png/220px-Supergirl_%28Kara_Zor-El_circa_2016%29.png', matched: false},
    {img: 'https://cdn.shopify.com/s/files/1/2393/5817/files/092418elast_480x480.jpg?v=1677000416', matched: false},
    {img: 'https://sciencefiction.com/wp-content/uploads/2012/03/Green-Lantern-1024x575-640x359.jpg.webp', matched: false}
  ];
  const CARD_BACK = 'https://i.imgur.com/TG9CvcQ.jpeg';


  /*----- state variables -----*/
  let cards;
  let firstCard;
  let numBad;
  let ignoreClicks;


  /*----- cached elements  -----*/
  const msgEl = document.querySelector('h2');


  /*----- event listeners -----*/
document.querySelector('main').addEventListener('click' ,handleChoice);

  /*----- functions -----*/
  init()
  
  function init() {
    cards = getShuffledCards();
    firstCard = null;
    numBad = 0;
    ignoreClicks = false;
    render ();

  }

  function render() {
    cards.forEach(function(card, idx){
        const imgEl = document.getElementById(idx);
        const src = (card.matched || card === firstCard) ? card.img : CARD_BACK ;
        imgEl.src = src;
    });
    msgEl.innerHTML = 'Bad Count: ${numBad}';


  }

  function getShuffledCards() {
    let tempCards = [];
    let cards = [];
    for (let card of SOURCE_CARDS) {
        tempCards.push({...card}, {...card});
    }
    while (tempCards.length) {
        let rndIdx = Math.floor(Math.random() * tempCards.length);
        let card = tempCards.splice(rndIdx, 1)[0];
        cards.push(card);
    }
    return cards;
  }

function handleChoice(evt){
  const cardIdx = parseInt(evt.target.id);
  if (isNaN(cardIdx) || ignoreClicks) return;
  const card = cards[cardIdx];
  if (firstCard) {
    if (card.img === firstCard.imag){
      card.matched = firstCard.matched = true;
    }else {
      numBad++;

    }
  firstCard = null;
  } else {
    firstCard = card;
  }
}