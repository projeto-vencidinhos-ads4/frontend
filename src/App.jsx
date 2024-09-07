import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  async function handleButtonClick(id = 0) {
    console.log(id)
    // fetch('http://localhost:8085/products/item/1', { method: 'GET' })
    //   .then(response => response.json())
    //   .then(data => {
    //     if (data.status === 404) { console.log('Produto não encontrado') } else { console.log(data.message) }
    //   })
    //   .then(data => console.log(data.message))
    //   .catch(error => console.error('Ocorreu um erro)', error))

    try {
      let response = await fetch(`http://localhost:8085/products/item/${id}`, { method: 'GET' })
      let data = await response.json()

      if (response.status === 404) {
        console.log('Produto não encontrado')
      }

      console.log(data.message)
    } catch (error) {
      console.error('Ocorreu um erro)', error)
    }
  }

  // useEffect(() => {
  //   handleButtonClick()
  // }, [])

  function handleSubmit(event) {
    event.preventDefault()
    const data = JSON.stringify({
      name: "Produto Exemplo",
      price: 99.99,
      quantity: 25,
      clientId: 123456789,
      category: 987654321
    })

    console.log(data)
    fetch('http://localhost:8085/products/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 400) {
          throw new Error(data.message)
        }
      })
      .catch(error => console.error('Ocorreu um erro)', error))
  }

  return (
    <>
      <section className="form-section">
        <h2>Cadastro de Produtos</h2>
        <button onClick={() => handleButtonClick(Math.floor(Math.random() * 100))}>teste</button>

        <div className="form-wrapper">
          <form onSubmit={handleSubmit} method="POST" data-form>
            <div className="input-block">
              <label htmlFor="item">Produto</label>
              <input type="text" id="item" name="item" required />
            </div>

            <div className="input-block">
              <label htmlFor="category">Categoria</label>
              <input type="text" id="category" name="category" required />
            </div>

            <div className="input-block">
              <label htmlFor="price">Preço</label>
              <input type="text" id="price" name="price" required />
            </div>

            <div className="input-block">
              <label htmlFor="quantity">Quantidade</label>
              <input type="text" id="quantity" name="quantity" required />
            </div>

            <div className="input-block">
              <label htmlFor="expire_date">Data de Vencimento</label>
              <input type="text" id="expire_date" name="expire_date" required />
            </div>

            <div className="input-block">
              <label htmlFor="stock">Estoque</label>
              <input type="text" id="stock" name="stock" required />
            </div>

            <button type="submit" className="btn-create" data-button>Cadastrar</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default App
