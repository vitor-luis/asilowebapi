const mongoose = require('mongoose')
const NoticiaModel = require('./../models/noticia')

class Noticia {

    get(req, res) {
        NoticiaModel.find({}, (err, noticia) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Dados recuperados com sucesso', data: noticia })
            }
        })
    }

    getById(req, res) {
        NoticiaModel.findById(req.params.id, (err, noticia) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Noticia recuperada com sucesso', data: noticia })
            }
        })
    }

    create(req, res) {
        NoticiaModel.create(req.body, (err, noticia) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(201).json({ message: 'Noticia inserida com sucesso', data: noticia })
            }
        })
    }

    update(req, res) {
        NoticiaModel.updateOne({ _id: req.params.id }, { $set: req.body }, (err, noticia) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Noticia atualizada com sucesso', data: noticia })
            }
        })
    }

    delete(req, res) {
        NoticiaModel.deleteOne({ _id: req.params.id }, (err, noticia) => {
            if (err) {
                res.status(500).json({ message: 'Houve um erro ao processar sua requisição', error: err })
            } else {
                res.status(200).json({ message: 'Noticia apagada com sucesso', data: noticia })
            }
        })
    }
}

module.exports = new Noticia()