// Variable declarition
let tweetList = document.querySelector('#tweet-list');



// Event Listeners
addEventListeners();

function addEventListeners(){
  //Add tweet 
  document.querySelector('#form').addEventListener('submit', newTweet);

  //remove tweets
  tweetList.addEventListener('click', removeTweet);

  //Display exisitng tweets in storage when document lodes
  document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}





// function declarition
function newTweet(e){

  //reading tweets typed in the text area
  let tweet = document.querySelector('#tweet').value;

  //Create an element to add the tweet and append as tweet-list child
  let li = document.createElement('li');
  li.textContent = tweet;
  tweetList.appendChild(li);

  //Create a  remove button 'x' and append as li child

  let removeBtn = document.createElement('a');
  removeBtn.classList = 'remove-tweet';
  removeBtn.textContent = 'X';
  li.appendChild(removeBtn);

  addTweetToLocalStorage(tweet)
  this.reset();
}


//function to remove tweet as per selection
function removeTweet(e){
  if(e.target.classList.contains('remove-tweet')){
    e.target.parentElement.remove()
  }
  
  removeTweetFromLocalStorage(e.target.parentElement.textContent)
}


//Add tweets to local storage
function addTweetToLocalStorage(tweet){
  let tweets = getTweetsFromStorage();

  tweets.push(tweet);

  localStorage.setItem('tweets', JSON.stringify(tweets));
}


//getting Tweets from Local Storage
function getTweetsFromStorage(){
  let tweets
  let tweetLs = localStorage.getItem('tweets');

  if(tweetLs === null){
    tweets = [];
  }else{
    tweets = JSON.parse(tweetLs)
  }

  return tweets;
}


//function to load existing tweets in local storage when the page loads 
function localStorageOnLoad(){
  tweets = getTweetsFromStorage();

  tweets.forEach(function(tweet){
    //Create an element to add the tweet and append as tweet-list child
  let li = document.createElement('li');
  li.textContent = tweet;
  tweetList.appendChild(li);

  //Create a  remove button 'x' and append as li child

  let removeBtn = document.createElement('a');
  removeBtn.classList = 'remove-tweet';
  removeBtn.textContent = 'X'
  li.appendChild(removeBtn);
  });

}


//Function to delete tweet from local storage so after loading the page it won't display
function removeTweetFromLocalStorage(tweet){
  //get tweets form storage
  tweets = getTweetsFromStorage();

  let tweetDelete = tweet.substring(0, tweet.length - 1);
  tweets.forEach(function(tweetLS, index){
    if(tweetDelete === tweetLS){
      tweets.splice(index, 1);
    }
  });

  //Save the rest data
  localStorage.setItem('tweets', JSON.stringify(tweets));
}