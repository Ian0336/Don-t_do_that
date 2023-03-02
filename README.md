---
title: "Dont do that"
disqus: hackmd
---

# Dont do that

## Table of Contents

[TOC]

## Introduction

想要做這個小遊戲的原因是因為過年大家玩遊戲時，發現到網路上很少這個遊戲，可能是因為這個遊戲要面對面才能玩。因此就想說自己做一個試試看。

I created this application because my family and friends wanted to play this certain game during Chinese New Year, but we couldn't find an online version of it. I realized that it might be because this kind of game is usually played in person, so I decided to make one myself and see how it goes.

## Main Function

[點這玩玩看 (Click to play)](https://yoga-data-553c9.firebaseapp.com/)

遊戲進程大概就是你會有自己的題目，但無法看到自己的題目。只要做出自己題目指定的事的話，就輸了，需要換一個題目，直到自己的題目都用光了。

The game works like this: Each player has their own action card, but they cannot see it. If they do the action on their card, they lose and get the next card, until they run out of questions.

主要是用 firebase 和 React 完成這個小應用，為了方便大家面對面玩，所以這個小遊戲會是以手機的大小為主。

I used Firebase and React to develop this application, and designed it mainly for mobile devices for ease of play in person.

## Data Structures

- room

  - state (ready, type, play)
  - check_num
  - people_num
  - fail_num
  - init_flag
  - owner
  - peoples
    - people

- people
  - name
  - ready
  - ans_right_num
  - now_question
  - pass_question
  - own_question

## Demonstration

這是最一開始的畫面，需要由一個人先創立一個房間。
The initial scene requires a person to create a room.

![](https://i.imgur.com/qlcl4P9.png)

創建完房間你就會是房主，可以點擊上面的 Fork 圖案可以複製連結分享給別人。房主可以選擇這場要淘汰多少人。
Once the room is created, the person becomes the host and can click the fork icon to copy the link and share it with others. The host can also choose how many players will be eliminated in each round.

![](https://i.imgur.com/bF01HdL.png)

別人取暱稱就可以加入房間。可以點擊別人將他們踢掉，但房主不能被踢。房主退出房間就會消失。
Players can join the room by creating a nickname. Players can click on others to kick them out of the room, except the room owner cannot be removed. If the room owner leaves the room, the room will disappear.

![](https://i.imgur.com/IfBYKPx.png)

大家都按準備，房主就可以開始了。
Once everyone is ready, the host can click "start" to go to the next phase.

![](https://i.imgur.com/GdR8Cx5.png)

再來就是 type 階段，要幫別人出他們的題目。出好題目一樣要準備就可以開始。
During the type phase, players come up with an action card for each player. After typing, everyone needs to click "ready" to begin the game.

![](https://i.imgur.com/4wBpCjz.png)

再來就是 play 階段，可以看到別人的題目。然後當你做出了你不能做的動作就按叉叉，但只要猜對就可以按圈圈。當淘汰人數到了指定的數量就結束了，會回到準備階段。
During the play phase, players can see each other's action cards. If the players do the action they are not allowed to do, they should click "X" on their screen. If they make a correct guess about their action, they should click "O". The game ends and returns to the preparation phase when the predetermined number of players are eliminated.

![](https://i.imgur.com/T5Bz0nU.png)
