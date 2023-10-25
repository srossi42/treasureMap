# treasureMap

## Description

Jeu dans lequel des aventuriers doivent récupérer des trésors sur une carte.

Le jeu prend un fichier d'entrée décrivant la carte initiale avec le positionnement des montagnes, des aventuriers et
des trésors. Chaque aventurier possède une liste de mouvements à effectuer.
Les aventuriers effectuent leurs déplacements un par un, dans l'ordre donné dans le fichier d'entrée.
Lorsqu'un aventurier se déplace sur une case contenant un trésor, il le ramasse.
Lorsqu'un aventurier tente de se déplacer sur une case contenant une montagne, il ne peut pas se déplacer sur cette case.
Le jeu se termine lorsque tous les aventuriers ont terminé leurs déplacements.

A la fin du jeu, un fichier de sortie est généré dans le dossier "/output" du projet.


## Installation

npm i

## Usage

npm start -- -p -f ./data/input.txt

Exemple : npm start -- -f .\src\inputFiles\testFile1.txt

## Options

- `-p, --print` : Affiche la carte à la fin du jeu dans la console
- `-f, --file <path>` : Chemin vers le fichier d'entrée
- `-h, --help` : Affiche l'aide

## Help

npm start -- -h
npm start -- --help

## Test

npx tsc
npm test
