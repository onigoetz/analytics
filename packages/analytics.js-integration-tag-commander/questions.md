Hello, <br />
suite a la lecture de la documentation technique et du nouveau script envoyé, j'ai quelques nouvelles questions techniques.

## Quand est utilisé le datalayer dans `tc_vars` ?
Je m'explique, beaucoup de nos applications sont des Single Page Apps, souvent en React, et on a pas l'information en avance de ce qui va être affiché sur la page.

Du coup on ne peut pas vraiment remplir tc_vars en avance.
Et la plupart des tags recoivent les informations ou un evenement est traqué (P. ex. le tracking piwik : `_paq.push(['trackEvent', 'Documentary', 'Play', 'Thrive']);` ) ou un goal atteint : (P. ex. dans piwik : `_paq.push(['trackGoal', 1, <?php echo $cart->getCartValue(); ?>]);`)

Sinon, j'ai aussi vu que dans le fichier de tracking fourni avec les deux tags fournis par Benjamin, il n'utilise pas le tc_vars. Dans quel cas est-ce qu'il l'utilise alors ?

Et est-ce qu'on peut remplir ces informations a un autre moment qu'au chargement de la page ?

## Quel est le rôle de `tC.launchTag` ?

Je vois que par exemple il apelle `tC.launchTag("2", "TagCommander - Recette", "26", "3551", "2");`

Mais je vois que cette methode ajoute des elements dans  `tC.array_launched_tags`, `tC.array_launched_tags_keys` et `tC.containersLaunched` puis fait un `window.postMessage`. mais ensuite aucune de ces information n'est reprise a un autre endroit.

Et je vois que le tag lui-même est fait après cet appel, mais pas a l'intérieur.

## Est-ce qu'il faut préferer appeler `tc_events_global` ou directement `tc_events_x` ?

Je vois que le rôle de `tc_events_global` est d'apeller tous les `tc_events_x` définis et je me demande lequel il faut apeller de préférence lorsqu'on veut informer qu'un événement a eu lieu.


Merci d'avance pour tes réponses.<br />
Stéphane