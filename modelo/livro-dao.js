
const Livro = require('../modelo/livro-schema')

class ControladorLivro {
  async obterLivros(req, res) {
    const prateleira = await Livro.find();
    return res.status(200).json({ prateleira });
  }

  async incluir(req, res) {
    console.log(req.body)
    const novoLivro = await Livro.create(req.body);
    return res.status(200).json(novoLivro);
  }

  async excluir(req, res) {
    const { id } = req.params;

    try {
      const livroRemover = await Livro.findByIdAndDelete(id);
      if (!livroRemover) {
        res.status(404).json({ mensagem: "Livro não encontrado" });
      }

      return res.status(200).json({ mensagem: "Livro removido" });
    } catch (error) {
      res.status(404).json({ mensagem: "Falha ao realizar a remoção" });
    }
  }

  async mostrarLivro(req, res) {
    const { id } = req.params;
    const livro = await Livro.findById(id);

    if (!livro) {
      return res.status(404).json({ messagem: "Não localizado" });
    }

    return res.status(200).json({ livro });
  }
}

module.exports = new ControladorLivro();
