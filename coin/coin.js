

function theResult() {
    const params = new URLSearchParams(document.location.search);
    const head = params.get("heads") || "heads"
    const tail = params.get("tails") || "tails"
    const coin = document.getElementById('coin')


    const randomValue = Math.floor(Math.random() * 2);
    coin.classList.remove('show-heads', 'show-tails', 'flipping')
    coin.classList.add('flipping')

    const resultText = document.getElementById("result")

    setTimeout(() => {

        coin.classList.remove('flipping')
        if (randomValue === 0) {
            resultText.textContent = head
            coin.classList.add('show-heads')
        }
        else {
            resultText.textContent = tail
            coin.classList.add('show-tails')
        }
    }, 3000)
}


window.addEventListener('DOMContentLoaded', theResult, false)
