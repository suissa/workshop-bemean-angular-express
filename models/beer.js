var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/workshop-sampa');

var db = mongoose.connection;
db.on('error', function(err){
    console.log('Erro de conexao.', err)
});

db.once('open', function () {
  console.log('Conexão aberta.')
});

var BeerSchema = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  type: { type: String, default: '' }
});

var Model = mongoose.model('Beer', BeerSchema);

exports.find = function(req, res){

  var query = {};

  Model.find(query, function (err, beers) {
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      res.json(beers);
    }
  });
}; 

exports.retrieve = function(req, res){

  var id = req.params.id;
  var query = {_id: id}

  Model.findOne(query, function (err, beer) {
    console.log('achou algo?');
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      res.json(beer);
    }
  });

}

exports.create = function(req, res){
  var dados = req.body;
  var model = new Model(dados);

  model.save(function(err, data) {
    if(err){
      console.log(err);
      res.render("list", {msg: err})
    } else {
      res.json(data);
    }
  });
};

exports.update = function(req, res){

  var id = req.params.id;
  var dados = req.body;
  var query = {_id: id};

  console.log('id', id);
  console.log('query', query);

  Model.update(query, dados, function(err, beer) {
    if(err) {
      console.log('erro', err);
    } else {
      // res.render('beer_update', {cerveja: beer});
      console.log('sucesso', beer);
      res.json(beer);
    }
  });

}

exports.delete = function(req, res){

  var id = req.params.id;
  var query = {_id: id};

  Model.remove({_id: id}, function(err, data) {
    if(err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
}
