NodeJS - Ajout et retrait de temps à une date
===================
Ce projet est un projet universitaire, il a été réalisé par [DOUIB Bastien](https://github.com/Bleuh/node), 
[VANHOORDE Emma](https://github.com/EmmaVanHoorde) et [SARTORIO Mathieu](https://github.com/Mathieu-S).


Démarrer le projet
-------------
- Cloner le projet : `git clone https://github.com/Bleuh/node`
- Installer les dépendances : `npm install`
- Démarrer le serveur : `npm start`
- Démarrer les tests unitaires : `npm test` (Le serveur doit être démarré)

_Note : Toutes les commandes 'npm' doivent être exécutées dans le dossier cloner._

Documentation
-------------
Cette application web a pour but d'effectuer des calculs à partir de dates. Ces dernières doivent être 
saisies au format **ISO8601** (AAAA-MM-DDT00:00:00Z). Il est possible de saisir une date "**compacte**", 
du moment que cette dernière respecte le format "AAAA-MM-DD".

Une fois la date entrée, il faut choisir l'opérateur **+** ou **-**, il permettra de distinguer un 
avancement ou un retrait temporel.

Vous devez ensuite saisir la valeur temporelle souhaitée et être saisie de la façon 
suivante : **d0h0m0s0**
- **d** correspond aux nombres de jours
- **h** correspond aux nombres d'heures
- **m** correspond aux nombres de minutes
- **s** correspond aux nombres de secondes

_Note : Si un seul de ces arguments est manquant, le calcul ne sera pas effectué. 
Exemple : d1h2 retournera une erreur, il faut saisir d1h1m0s0._

Une fois toutes les valeurs renseignées, vous pouvez valider vos données via le bouton "**calculer**". 
La date affichée est le résultat du calcul temporel au format **ISO8601**. Si le message 
"**invalid url**" apparait, vérifier bien la saisie de vos données.