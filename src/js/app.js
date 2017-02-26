import {githubApiKey} from '../../secrets.js'
// import Backbone from 'backbone';
import $ from 'jquery';

var appContainerEl = document.querySelector("#app-container")



var personalLogin = `averyeffa`
var fetchUserProfileData = $.getJSON(`https://api.github.com/users/${personalLogin}`)
var fetchUserRepoData = $.getJSON(`https://api.github.com/users/${personalLogin}/repos`)

$.when(fetchUserProfileData, fetchUserRepoData).then(function(userProfileData, userRepoData){

console.log(userProfileData[0])

})
