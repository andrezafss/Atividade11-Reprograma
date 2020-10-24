
const pets = require("../model/pets.json");
const fs = require("fs");

const getAllPet = (req, res) => {
  console.log(req.url);
  res.status(200).send(pets);
};

const getByIdPet = (req, res) => {
  const id = req.params.id;

  res.status(201).send(pets.find((pet) => pet.id == id));
};

const postPet = (req, res) =>{
  console.log(req.body);
  const {id, nomeFantasia, endereco, telefone, atende} = req.body;
  pets.push({id, nomeFantasia, endereco, telefone, atende});
  
  fs.writeFile("./src/model/pets.json",JSON.stringify(pets),'utf8',function(err){
      if(err){
        return res.status(424).send({message: err});

      }
      console.log("Arquivo atualizado com sucesso!")
  }) 

  res.status(200).send(pets)
};

  const deletePet = (req, res) => {
  const id = req.params.id;
  const petFiltrado = pets.find((pet) => pet.id == id);
  const index = pets.indexOf(petFiltrado);
  pets.splice(index, 1);

  fs.writeFile("./src/model/pets.json",JSON.stringify(pets),'utf8',function(err){
    if(err){
      return res.status(424).send({message: err});
    }
    console.log("Arquivo atualizado com sucesso!")
  })
  res.status(200).send(pets)
  
}
const putPet = (req, res) => {
  try{
    const id = req.params.id;
  
    const petModificado = pets.find((pet) => pet.id == id);
     
    const petAtualizado = req.body;
    
    const index = pets.indexOf(petModificado);
      
    pets.splice(index, 1, petAtualizado)
    console.log(pets)

    fs.writeFile("./src/model/pets.json", JSON.stringify(pets), 'utf8', function(err){
      if(err){
        return res.status(424).send({message: err});
      }
        console.log(petAtualizado)
    })

    res.status(200).send(pets)
}catch(err){
  return res.status(424).send({message: err});
}

}

const patchPet = (req, res) => {
  const id = req.params.id;
  const atualizacao = req.body;

  try {
    const petModificado =  pets.find((pet) => pet.id == id);
    console.log(Object.keys(petModificado))    

    Object.keys(atualizacao).forEach((chave) => {
      petModificado[chave] = atualizacao[chave]
    });

    fs. writeFile("./src/model/pets.json", JSON.stringify(pets), "utf8", function(err){
      if (err) {
        return res.status(424).send({ message: err });        
      }
      console.log("Arquivo atualizado com sucesso");
    });

    return res.status(200).send(pets);
  } catch (err) {
    return res.status(424).send({ message: err });
  }

}

module.exports = {
  getAllPet,
  getByIdPet,
  postPet,
  deletePet,
  putPet, 
  patchPet
};