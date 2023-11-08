# Barre de progression pour levée de fonds

Tests en local -> http://localhost:8081/

Prod -> https://data-players.github.io/progress-bar-fundraise/

Au sujet des iframes sur les Github Pages -> https://handsondataviz.org/gh-pages-link-to-iframe.html

Iframe 

```
<iframe src="https://data-players.github.io/progress-bar-fundraise/" width="100%" height="400" frameborder="0" scrolling="no"></iframe>
```

### A faire ->
- au delà de 30k, pb de css ! 

### Remarques 
- PAs de contrôle des addresses dans le formulaire des parts sociales (on peut dire qu'on habite à Paris avec un code postal 66666 auto-complétion du formulaire pour les adresses = payant)
- Le champs "Monsieur, Madame" dans le formulaire des parts sociales propose plusieurs fois les mêmes options ("Mme, Mme, Mr..."), en a-t-on besoin?

### Attention :warning:
- Si le nom des urls grappe a changé, il faudra les modifier dans le code.
- L'api de Baserow autorise la récupération de 200 lignes de données maximum donc si il y a + de 200 données, il faudra mettre en place une récupération automatique
