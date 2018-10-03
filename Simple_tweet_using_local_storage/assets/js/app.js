//variables
const tweetList = document.getElementById('tweet-list');


// Event Listeners
eventListeners();
function eventListeners(){
    document.querySelector('#form').addEventListener('submit', newTweet);
    tweetList.addEventListener('click', removeTweet);
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

//Functions

function newTweet(e){
    e.preventDefault();

    let tweet = document.querySelector('#tweet').value;
    let li = document.createElement('li');
    li.textContent = tweet;
    tweetList.appendChild(li);
    
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';
    li.appendChild(removeBtn);

    addTweetToLocalStorage(tweet);
}

function removeTweet(e){
    if(e.target.classList.contains('remove-tweet')){
        e.target.parentElement.remove();
        console.log(e.target)
    }
}

function addTweetToLocalStorage(tweet){
        let tweets = getTweetsFromStorage();
        
        tweets.push(tweet);
        localStorage.setItem('tweets', JSON.stringify(tweets));     
}

function getTweetsFromStorage(){
    let tweets;
    const tweetLS = localStorage.getItem('tweets');

    if(tweetLS === null){
        tweets = [];
    }else{
        tweets = JSON.parse(tweetLS);
    }
    return tweets;
}

function localStorageOnLoad(){
    let tweets = getTweetsFromStorage();

    tweets.forEach(function(tweet){
        let tweet = document.querySelector('#tweet').value;
    let li = document.createElement('li');
    li.textContent = tweet;
    tweetList.appendChild(li);
    
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';
    li.appendChild(removeBtn);

    // addTweetToLocalStorage(tweet);
    });

}
