import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
     ModalController, AlertController } from 'ionic-angular';
import { ProdutoDto} from '../../Model/produtoDto';
import { ProdutoProvider } from '../../providers/produto/produto';
import { CategoriaProvider } from '../../providers/categoria/categoria';
import { CategoriaDto} from '../../Model/categoriaDto';
/**
 * Generated class for the ProdutoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {

  //produtos : Array<ProdutoDto>;
  codBarra : String="";
  produtos : Array<ProdutoDto>;
  mensagem : String = "Produtos: ";

  categorias : Array<CategoriaDto>;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrl : AlertController,
     public produtoProvider : ProdutoProvider,
     public categoriaProvider : CategoriaProvider,
     public modalCtrl : ModalController,
     public barcode : BarcodeScanner) {


     this.montarTela();

  }

  montarTela()
  {
     this.carregarCategorias();
     this.carregarProdutos();
  }

  carregarCategorias()
  {
    this.categorias = new Array<CategoriaDto>();
    this.categoriaProvider.getAll()
         .then((categorias: Array<CategoriaDto>) => 
         {
           this.categorias = categorias;
         })
         .catch(erro => this.alerta(erro));
  }

  carregarProdutos()
  {
    this.produtos = new Array<ProdutoDto>();
    this.produtoProvider.getAll(this.codBarra)
         .then((produtos: Array<ProdutoDto>) => 
         {
           this.produtos = produtos;
           console.log('Produtos', this.produtos)
         })
         .catch(erro =>
              {
                 this.alerta(erro);
              });
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad ProdutoPage');
  }

  incluir()
  {
      let produtoDto : ProdutoDto;
      produtoDto = new ProdutoDto();
      produtoDto.idProduto = 0;
      this.abrirTelaProduto(produtoDto, "I");
  }

  editar(produtoDto : ProdutoDto)
  {
      this.abrirTelaProduto(produtoDto, "A");
  }

  excluir (produtoDto : ProdutoDto)
  {
    let confirm = this.alertCtrl.create({
      title: 'Atenção',
      message: 'Deseja realmente excluir o produto (' + produtoDto.nomeProduto + ') ?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            return;
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.excluirProduto(produtoDto);
          }
        }
      ]
    });
    confirm.present();
  }

  excluirProduto(produtoDto : ProdutoDto)
  {
    this.produtoProvider.delete(produtoDto.idProduto)
      .then( ok => this.carregarProdutos() )
      .catch( erro => this.alerta(erro));
  }


 abrirTelaProduto(produtoDto : ProdutoDto, acao: String)
  {
      let modal = this.modalCtrl.create('ProdutoDetalhePage',
        {produtoDto : produtoDto,
          acao : acao,
          categorias : this.categorias});

      modal.onDidDismiss(data => {

          let produto = new ProdutoDto();
          produto = data.produto;
          if (data.origem == "S")
          {
            this.salvar(produto);
          }

      });
      modal.present();
  }

  salvar(produto : ProdutoDto)
  {
    console.log(produto)

    if (produto.idProduto == 0)
    {
       this.produtoProvider.add(produto)
       .then( ok => {
        console.log('Adicionou beleza', ok)
            this.carregarProdutos();
          } )
       .catch( erro => this.alerta(erro));
    }
    else
    {

      this.produtoProvider.update(produto)
      .then( ok => {
          this.mensagem = this.produtoProvider.Mensagem;
          this.carregarProdutos();
          } )
      .catch( erro =>
        {
          this.alerta(erro);});
      }
  }

  pesquisar() 
  {
    let prompt = this.alertCtrl.create({
      title: 'Atenção',
      message: "Informe o Código de barra",
      inputs: [
        {
          name: 'CodBarra',
          placeholder: 'Código de barra'
        },
      ],
      buttons: [
        {
          text: 'codbarra',
          handler: data => {

            this.barcode.scan({
              "prompt": "Posicione a leitura no codigo de barra",
              "orientation": "landscape"
            }).then((res)=>{
              this.codBarra = res.text
              this.carregarProdutos();
            }).catch((err)=>{
              this.alerta('ERRO AO ABRIR CODIGO DE BARRA')
            })
          }
        },
        {
          text: 'Pesquisar',
          handler: data => {
            console.log(data)
            this.codBarra = data.CodBarra;
            this.carregarProdutos();
          }
        }
      ]
    });
    prompt.present();
  }

  alerta(mensagem)
  {

    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();

  }

}
