app.factory("categoriasList", ["$firebaseArray",
    function($firebaseArray) {
        var ref = firebase.database().ref('Categorias');
        return $firebaseArray(ref);
    }
]);

app.factory("subCategoriasList", ["$firebaseArray",
    function($firebaseArray) {
        var ref = firebase.database().ref('subCategorias');
        return $firebaseArray(ref);
    }
]);

app.factory("marcasList", ["$firebaseArray",
function($firebaseArray) {
    var ref = firebase.database().ref('Marcas');
    return $firebaseArray(ref);
}
]);
/* app.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
        return $firebaseAuth();
    }
]); */


/* app.factory("usersList", ["$firebaseArray",
    function($firebaseArray) {
        var ref = firebase.database().ref();
        return $firebaseArray(ref);
    }
]);
 */
