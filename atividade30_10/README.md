# Catálogo de Tintas — TintasPro

Pequeno site de catálogo de tintas (apenas HTML, CSS e um JavaScript leve para o carrinho).

Como abrir

1. Abra o arquivo `catprod.html` no navegador ou execute no PowerShell:

```powershell
Start-Process 'c:\Users\Laboratorio\Documents\atividade30_10\catprod.html'
```

2. Para ver a página inicial e a de contato, abra `index.html` e `contato.html` na mesma pasta.

O que está incluído

- `catprod.html` — catálogo de produtos com filtros visuais, grid responsivo e cards de cores.
- `css/catprod.css` — estilos responsivos, animações e efeitos (bordas animadas nos cards, hovers).
- `js/cart.js` — carrinho funcional: adicionar itens, alterar quantidades, remover itens e persistência em localStorage.
- `index.html` — página inicial simples.
- `contato.html` — formulário visual de contato (sem backend).

Como testar o carrinho

- Clique no botão "Adicionar" em qualquer card para adicionar ao carrinho.
- O drawer do carrinho abre automaticamente. Você pode aumentar/diminuir quantidades, remover itens e ver o subtotal/frete/total.
- O carrinho é armazenado no localStorage para persistência entre recargas.

Notas e próximos passos sugeridos

- Adicionar imagens reais (thumbnails) em `assets/` para cada produto.
- Melhorar o formulário de contato com validação e integração com backend/API.
- Implementar busca e filtros funcionais com JavaScript para melhorar a experiência.
- Testar em diferentes navegadores (Chrome, Edge, Firefox) para garantir compatibilidade do `conic-gradient` usado nas bordas animadas.

Se quiser que eu implemente qualquer um desses próximos passos (assets, validação do formulário, filtros com JS, ou ajustes de estilo), diga qual prefere e eu faço a alteração.