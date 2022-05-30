 
//MVC  - Model View Controller

let submitBtn = document.querySelector('#submit-tweet');
let deleteBtn = document.getElementById('tweet-list');

//Event Listeners
submitBtn.addEventListener('submit', addTweet);
deleteBtn.addEventListener('click', deleteTweet);

//Render the Page
render();

function addTweet(e){
    e.preventDefault();
    
    let tweetMessage = document.querySelector('#tweet-text');

    if(tweetMessage.value.toString().length > 0){

    //Add the tweet to local storage
    addTweetsToLocalStorage(tweetMessage.value.toString());

    //clear the text area
    tweetMessage.value = ' ';

    //Alert
    alert('Note Added');

    //Reload the List
    render();

    }else{
        alert('Tweet input cannot be empty');
    }

}

function deleteTweet(event){
    //Get the parent element
    let listedItem = event.target;

    //Remove the tweet
    let tweetContent = listedItem.parentElement.textContent.toString();
    let tweet = tweetContent.substring(0, tweetContent.length-1);
    removeTweetFromLocalStorage(tweet);

    //Remove the listed item
    if(listedItem.classList.contains('remove-tweet')){
        //Remove the listed Item
        listedItem.parentElement.remove();
    }

}

function removeTweetFromLocalStorage(tweet){
    
    let tweets = getTweetsFromLocalStorage();

    let newTweets = tweets.filter(function (tweetElement){
        if(tweetElement.toString() == tweet){
            return false;
            console.log(tweetElement);
        }else{
            return true;
        }
    });

    //Clear the localStorage add new tweets
    localStorage.clear();

    newTweets.forEach(function (tweet){
        addTweetsToLocalStorage(tweet);
    });
}

function getTweetsFromLocalStorage(){
    let tweets = localStorage.getItem('tweets');

    if(tweets === null){
        tweets = [];
    }else{
        tweets = JSON.parse(tweets);
    }

    return tweets;
}

function addTweetsToLocalStorage(tweet){
    let tweets = getTweetsFromLocalStorage();

    tweets.push(tweet);

    //Store the Array
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Function to display all the tweets on page-load
function render(){

    let newTweetList = document.getElementById('tweet-list');
    let tweets = getTweetsFromLocalStorage();

    //Clear the list first
    newTweetList.innerHTML = '';

    tweets.forEach(function (tweetMsg){

        //Create the delete Btn
        let deleteBtn = document.createElement('a');
        deleteBtn.textContent = 'X';
        deleteBtn.className = 'remove-tweet';

        //Create the tweet div
        let tweet = document.createElement('li');
            tweet.textContent = tweetMsg;
            tweet.style = 'padding: 5px;';

            tweet.appendChild(deleteBtn);

            newTweetList.appendChild(tweet);

    });
}


