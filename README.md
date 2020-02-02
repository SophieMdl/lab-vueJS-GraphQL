# Test vueJS

## Specifications

* [x] Un champ texte est présenté à l’utilisateur pour saisir son pays
* [x] Lors du click sur le champ texte, un menu déroulant est affiché avec la liste des choix possibles de pays. Le menu déroulant est scrollable
* [x] Lors du click à l’extérieur du menu déroulant et du champ, le menu déroulant se ferme
* [x] Si l’utilisateur clique sur un pays, le nom du pays est renseigné dans le champ texte et le menu déroulant est fermé 
* [x] Une fois une valeur sélectionnée l’attribut « v-model » du composant doit renvoyer le code ISO du pays
* [x] Si l’utilisateur tape une première lettre, par exemple A, le menu déroulant ne propose plus que les pays dont le nom commence par A, indépendamment de la casse et les pays proposés ont la première lettre A en gras
* [x] De même si l’utilisateur tape deux lettres, par exemple AF, le menu déroulant ne propose plus que les pays dont le nom commence par AF, indépendamment de la casse et les pays proposés ont les deux premières lettre AF en gras
* [x] Idem pour 3, 4, …, N lettres
* [x] Si un utilisateur saisi librement un pays non présent dans la liste, le champ est réinitialisé à une chaîne de caractères vide lorsque l’utilisateur click en dehors du champ
* [ ] Lorsque le menu déroulant est ouvert, l’utilisateur peut choisir son pays en appuyant sur les touches haut et bas de son clavier et valider en appuyant sur la barre espace
* [ ] Sur smartphone, lorsque l’utilisateur appuie sur le champ, il peut uniquement choisir le pays parmi une liste déroulante affichée via une liste déroulante classique affichée nativement par le smartphone.


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
