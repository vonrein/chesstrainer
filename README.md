Local Coordinates and puzzles trainer based on Lichess Chessground and puzzle database

pnpm install
pnpm run build

#Example URLs and URL parameters#
##use lichess endpoints##
http://localhost:5000/?source=storm #use puzzlestorm endpoint of Lichess
http://localhost:5000/?source=streak #use puzzle streak

##use local database##
http://localhost:5000/?limit=5 #solve 5 local puzzles

...sort=1 #sort puzzles from low to high
...min max #min max rating of puzzles
...theme #puzzle theme
