# Shooting Star Update V0.3.2

本次更新做了一些内容以及UI上的小改动，并修复了几个Bug。

  - 内容改动
    - UI：由于WebGL平台不需要游戏退出功能，因此WebGL版本的游戏开始画面移除了“退出游戏”按钮。
    - 游戏玩法：当玩家被敌机子弹命中并开启了防止持续受伤的防护罩之后，如果这时候玩家机体和敌机产生碰撞，玩家将会瞬间死亡。
  
    
  - Bug修复
    - 排行榜：修复WebGL版本玩家ID不是唯一的问题，现在从每个不同的浏览器开始游戏时都会登录一名新的玩家。
    - UI: 修复当进入Boss战之后暂停游戏并返回开始画面，Boss的HUD血条依然会显示的问题。

----

This update makes some adjustment on gameplay and UI, and also fixes some bugs. 

  - Content Changes:
  
      - UI: Due to the lack of game exit functionality in the WebGL platform, the "Quit Game" button has been removed from the WebGL version.
      - Gameplay Adjustment: When player is hit by enemy projectiles and activates the force shield to prevent continuous damage, colliding with an enemy at this time will instantly result in player death.
  
  
  - Bug Fixes:
      - Leaderboard: Fixed an issue in the WebGL version where player IDs were not unique. Now, a new player will be logged in from each different browser when starting the game.
      - UI: Fixed an issue where the boss's HUD health bar would still be displayed after pausing the game and returning to the start screen during a boss battle.
