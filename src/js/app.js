import {githubApiKey} from '../../secrets.js'
import $ from 'jquery';

var forEach = function(arr,cb){for(var i = 0; i < arr.length; i++){ cb(arr[i], i, arr)  } }
var userContentEl = document.querySelector(".user-information.column-container")
var inputValEl = document.querySelector(".search")

var userLogin = `averyeffa`
var fetchUserProfileData = $.getJSON(`https://api.github.com/users/${userLogin}`)
var fetchUserRepoData = $.getJSON(`https://api.github.com/users/${userLogin}/repos`)

var bigHtmlStr = ``
var profileHtmlStr = ``
var repoHtmlStr = ``





inputValEl.addEventListener('keydown', function(evt){

  // console.log(evt)
  	if(evt.keyCode === 13){
      console.log(inputValEl.value)
      var inputValEntered = inputValEl.value
      window.location.hash = inputValEntered
      userLogin = inputValEntered
      console.log(userLogin)
      // Victor helped me here through the rest of this function 
      fetchUserProfileData = $.getJSON(`https://api.github.com/users/${userLogin}`)
      fetchUserRepoData = $.getJSON(`https://api.github.com/users/${userLogin}/repos`)
      // console.log(fetchUserRepoData, fetchUserProfileData)
      $.when(fetchUserProfileData, fetchUserRepoData).then((data1,data2)=>{
        var htmlTemplate = userHtmlTemplate(data1[0], data2[0])
      })

      // var htmlTemplate = userHtmlTemplate(fetchUserProfileData[0], fetchUserRepoData[0])

    }
})

function userHtmlTemplate(profileArray, repoArray){

  var profileHtmlStr = `
  <div class="user-profile">
    <img src="${profileArray.avatar_url}">
    <h1>${profileArray.name}</h1>
    <h1>${profileArray.login}</h1>
    <h2>${profileArray.blog}</h2>
    <h2>${profileArray.location}</h2>
    <h2>${profileArray.email}</h2>

    <button class="unfollow">Unfollow</button>
    <p>Block or report user</p>
    <hr/>
  </div>
  `

  repoHtmlStr = ""

  forEach(repoArray, function(repoObj){
    // console.log(repoObj)

    repoHtmlStr += `

      <div class="repo-details">
      <h2>${repoObj.name}</h2>
      <h2>${repoObj.description}</h2>
      <h3>${repoObj.language} <i class="fa fa-star" aria-hidden="true"></i>
      ${repoObj.stargazers_count} ${repoObj.updated_at}</h3>
      </div>
    `
  })

  bigHtmlStr = profileHtmlStr + `
  <div class="user-repo">
    <div class="repo-nav column-container">
    <h3>Overview</h3>
    <h3>Repositories ${profileArray.public_repos}</h3>
    <h3>Stars</h3>
    <h3>Followers ${profileArray.followers}</h3>
    <h3>Following ${profileArray.following}</h3>
    </div>

    <div class="repo-search column-container">
    <input class="search" type="text" value="" placeholder="Search repositories...">
    </input>
    <button>Type</button>
    <button>Language</button>
    </div>
  ` + repoHtmlStr + `</div>`
  // console.log(bigHtmlStr)

  userContentEl.innerHTML = bigHtmlStr
}





$.when(fetchUserProfileData, fetchUserRepoData).then(function(userProfileData, userRepoData){
console.log(userProfileData[0])
console.log(userRepoData[0])
var htmlTemplate = userHtmlTemplate(userProfileData[0], userRepoData[0])
})
