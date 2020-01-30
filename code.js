const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}



const textNodes = [
  {
    
    id: 1,
    text: 'You wake up in a tent near the Silver bridge but have no trace of memeory of what occured. However you see a bacpack filled up with supplies. Inside there are potions, a sealed wand, and adventure guide.',
    options: [
      {
        text: 'Take the supplies',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Leave the supplies and venture on!',
        nextText: 2
      }

    ]
  },
  {
    id: 2,
    text: 'After you took the supplies the sealed wand started to have a strange aura surrounding it. First it went purple then other colors combined after but then it defused. Shortly you found a merchant who wanted to trade supplies with you.', 
    options: [
      {
        text: 'Trade the potions for a large sum of money',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Trade the adventure guide for a map but get tricked and the merchant snatches the wand.',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Tip toe past the merchant.',
        nextText: 3
      }
    ]
  },


  {
    id: 3,
    text: 'After exchanging items with the Merchant you take a look around and yourself feeling fatigued and barely have any energy left to explore. However at the corner of your eyes you see a unexplored area.',
    options: [
      {
        text: 'Despite the low energy you explore the castle.',
        nextText: 4
      },
      {
        text: 'Find a inn and recharge for the night.',
        nextText: 5
      },
      {
        text: 'Roam around the park and hopefully there is a unoccupied bench.',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You tried your best to stay awake but a sleepy aroma flew through the air and knocked you out. Momemnts later monsters came and defeated you and took all the supplies.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
    options: [
      {
        text: 'Explore the castle',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While exploring the castle you suddenly fell ill due to low energy and catch a cold. ',
    options: [
      {
        text: 'Heal up with potions',
        nextText: 8
      },
      {
        text: 'You found a sword nearby and used it to attack it but it was a weak sword and got shattered after four hits.',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'You found a mysterious hole in the corner and decided to crawl inside it.',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Throw the blue goo at it',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempts to run are in vain and the monster easily catches.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'The monster summoned more monsters and cornerned you. Unfortunatly you have been outnumbered and could not fight all of them off.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The monster laughed as you hid behind your shield and ate you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()