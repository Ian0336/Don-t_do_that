---
title: 'Dont do that'
disqus: hackmd
---

Dont do that
===


## Table of Contents

[TOC]

## Introduction

想要做這個小遊戲的原因是因為過年大家玩遊戲時，發現到網路上很少這個遊戲，可能是因為這個遊戲要面對面才能玩。因此就想說自己做一個試試看。

I wanted to create this little application because when we played games with family and friends during Chinese New Year, I noticed that there were not many online versions of this game. I guessed it is because that this kind of game usually be played in person, and that's why I decided to make one myself and see how it goes.

Main Function
---
[點這玩玩看 (Click to play)](https://yoga-data-553c9.firebaseapp.com/)

遊戲進程大概就是你會有自己的題目，但無法看到自己的題目。只要做出自己題目指定的事的話，就輸了，需要換一個題目，直到自己的題目都用光了。

The game process is that you will get your own action cards, but you cannot see your own card. If you do the action on your card, you lose and will get to the next action card, until you run out of questions.

主要是用firebase和React完成這個小應用。

The main tools used for developing this application are Firebase and React.


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
    
    


Demonstration
---
#### 為了方便大家面對面玩，所以這個小遊戲會是以手機的大小為主。

#### For the convenience of playing the game in person, it will be mainly designed for mobile devices.


這是最一開始的畫面，需要由一個人先創立一個房間。
This is the initial screen where one person needs to create a room.

![](https://i.imgur.com/qlcl4P9.png)

創建完房間你就會是房主，可以點擊上面的Fork圖案可以複製連結。房主可以選擇這場要淘汰多少人。
After creating a room, you will become the host and can click the fork icon above to copy the link.The host can choose how many players will be eliminated in this round.

![](https://i.imgur.com/bF01HdL.png)

別人取暱稱就可以加入房間。可以點擊別人將他們踢掉。但房主不能踢，房主退出房間就會消失。
Others can join the room by entering a nickname. You can click on others to kick them out of the room, except for the room owner who cannot be kicked. If the room owner leaves the room, the room will disappear.

![](https://i.imgur.com/IfBYKPx.png)

大家都按準備，房主就可以開始了。
Everyone is ready, and the host can start the game now.

![](https://i.imgur.com/GdR8Cx5.png)


再來就是type階段，要幫別人出他們的題目。出好題目一樣要準備就可以開始。
Then comes the "type" phase, where players help each other with their respective tasks. To start typing, players need to get ready.

![](https://i.imgur.com/4wBpCjz.png)

再來就是play階段，可以看到別人的題目。然後當你做出了你不能做的動作就按叉叉，但只要猜對就可以按圈圈。當淘汰人數到了指定的數量就結束了，會回到準備階段。
Next is the play phase where you can see other players' questions. If you perform the action you are not allowed to do, you can click the "X" button. However, if you make a correct guess, you can click the "O" button. When the number of eliminated players reaches the specified amount, the game will end and return to the preparation phase.

![](https://i.imgur.com/T5Bz0nU.png)




