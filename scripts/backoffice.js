app.controller('BackOfficeCtrl', ['$scope', 'categoriasList', 'subCategoriasList', 'marcasList', '$firebaseStorage',
    function($scope, categoriasList, subCategoriasList, marcasList, $firebaseStorage) {

        var postKey;
        var postIdx;

        $scope.categoriasList = {};
        $scope.subCategoriasList = {};
        $scope.marcasList = {};

        categoriasList.$loaded().then(function() {  
               $scope.categoriasList = categoriasList;
        });

        $scope.saveCategoria = function() {
            $scope.categoriasList.$add({
                categoria: $scope.categoria,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            }).then(function() {
                $scope.categoria = {};
            });
        };

        subCategoriasList.$loaded().then(function() {  
            $scope.subCategoriasList = subCategoriasList;
        });

        $scope.saveSubCategoria = function() {
            $scope.subCategoriasList.$add({
                categoria: $scope.categoria,
                subCategoria: $scope.subCategoria,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            }).then(function() {
                $scope.subCategoria = {};
            });
        };

        marcasList.$loaded().then(function() {  
            $scope.marcasList = marcasList;
        });

        $scope.saveNovaMarca = function() {
            if (postKey == null) {
                $scope.marcasList.$add({
                    marca: $scope.marca,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                }).then(function(ref) {
                    postKey = ref.key;
                    console.log("added record with id " + postKey);
                    postIdx = $scope.marcasList.$indexFor(postKey); // returns location in the array 
                    console.log("added record with index " + postIdx);
                    $scope.getMarcaDetails(postKey);   
                    console.log($scope.marca);
                    
                });
            } else {
                $scope.marcasList.$save(postIdx).then(function() {
                    console.log("registo gravado!")
                    $scope.getMarcaDetails(postKey);
                    console.log($scope.marca);                    
                });
            }
            
        };

        $scope.getMarcaDetails = function(param) {
            var record = $scope.marcasList.$getRecord(param);
            //postIndex = $scope.marcasList.$indexFor(param); acho que nao vou precisar disto
            $scope.marca = record.marca;
        };

        $scope.uploadFile1 = function(file) {
            var storageRef = firebase.storage().ref('FotosMarcas/' + keypost + '/' + file.name);
            
            var storage = $firebaseStorage(storageRef);
            var uploadTask = storage.$put(file);

            uploadTask.$complete(function(snapshot) {
                $scope.marca.foto1 = snapshot.downloadURL;

                /* $scope.usersList.$save(postIndex).then(function() {
                    $scope.getDetails(usersList[postIndex].$id);
                }); */
            });
        };
    }
]);