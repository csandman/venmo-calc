<p align="center">
  <img src="./images/github-icon.png" alt="Venmo logo" height="128"/>
  <h1 align="center">Venmo Stats Calculator</h1>
</p>
<p align="center" style="font-size: 1.2rem;">Check how much you've gotten...or given away on <a href="https://venmo.com">Venmo</a>!</p>
<p align="center">
  <img src="./images/screenshot-7.png" alt="Screenshot 1" height="320" />
  <img src="./images/screenshot-8.png" alt="Screenshot 2" height="320" />
  <img src="./images/screenshot-9.png" alt="Screenshot 3" height="320" />
</p>

## Installation

This extension is not yet on the chrome store so if you want to install it you either have to clone it from github or [download it and extract it](https://github.com/csandman/venmo-calc/archive/master.zip)

Once you have the files extracted, head over to **chrome://extensions/** and ensure that you have _Developer mode_ checked in the top right hand corner. Next click the _Load unpacked_ button in the top left hand corner, locate the folder you extracted and click select to load it up. It should now appear next to your address bar with your other extensions.

## Usage

In order to use this extension, you must be logged in to your Venmo account on [the official Venmo website](https://venmo.com). And don't worry, **this extension will not steal your account data**. The source code is all right here and its not very long, read it over if you don't believe me.

Once you're logged in click on the link to your personal profile in the header. Finally, click on the extension icon, click collect stats and wait for all of your transactions to be loaded. Once it is done, some summarizing stats will be displayed about every Venmo transaction you've ever made!

## What's the point?

Why did I bother making this you may ask? Because I wanted to know how much I had sent/recieved on Venmo total and the official statements they offer can only cover a 90 day period at most. The first thing I did was make a [Codepen](https://codepen.io/CSandman/full/GOPWME) which involved going through and loading all of your past transactions manually and copying/pasting the entire page's content. But I felt this was tedious and wanted to [learn how to make a Chrome extension](https://developer.chrome.com/extensions/getstarted), so I made this tool instead. Hope you like it!
