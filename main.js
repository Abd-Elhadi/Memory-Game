// get user's name
document.querySelector('.control-buttons span').onclick = () => {
    let yourName = prompt('What is your name');

    if (yourName == '' || yourName == null) {
        document.querySelector('.name span').innerHTML = 'Unknown';
    } else {
        document.querySelector('.name span').innerHTML = yourName;
    }

    // remov splash screen
    document.querySelector('.control-buttons').remove();
};

let duration = 1000;

let blocksContainer = document.querySelector('.memory-game-blocks');

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffleArray(orderRange);

// add order css property to game blocks
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    block.addEventListener('click', e => {
        flipBlock(block);
    })
});

// flip block function
function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');

    // collect all flipped card
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    if (allFlippedBlocks.length === 2) {

        // stop clicking function
        stopClicking();

        // check if the two flipped blocks match
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

function stopClicking() {
    // add class no clickin on main container
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {
        // remove no clicking class after duration
        blocksContainer.classList.remove('no-clicking')
    }, duration);
}

function checkMatchedBlocks(firstBlock, secondBlock) {
    let tries = document.querySelector('.tries span');

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();
    } else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);

        document.getElementById('fail').play();
    }
}

// shuffle functino
function shuffle(array) {
    // setting vars
    let current = array.length,
        temp,
        random;

    while (current > 0) {
        // get a random number
        random = Math.floor(Math.random() * current);

        // decrease length by one
        current--;

        temp = array[current];
        current = array[random];
        array[random] = temp;
    }
    return array;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}