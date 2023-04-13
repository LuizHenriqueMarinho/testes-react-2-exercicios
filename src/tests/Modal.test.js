import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Modal from "../components/Modal"

const pokemonMock = {
    sprites:{front_default:"http://img.png"},
    pokeNumber: 1000,
    name: "Poketeste",
    types: [{type:{name:"type"}}],
    weight: 2.0,
    height: 0.5,
}

const closeModalMock = jest.fn()

describe("Modal", () => {
    test("testar o render", async () => {
        render(<Modal
            activeModal={pokemonMock}
            closeModal={closeModalMock}
        />)
        
        const image = screen.getByRole('img', { name: /Poketeste/i})
        const name = screen.getByRole('heading', { name: /Poketeste/i })
        const types = screen.getByText(/type/i)
        const weight = screen.getByText(/0\.2 kg/i)
        const height = screen.getByText(/0\.1 m/i)

        expect(image).toBeInTheDocument()
        expect(name).toBeInTheDocument()
        expect(weight).toBeInTheDocument()
        expect(types).toBeInTheDocument()
        expect(height).toBeInTheDocument()
    })

    test("fechar modal", async () => {
        const user = userEvent.setup()
        render(<Modal
            activeModal={pokemonMock}
            closeModal={closeModalMock}
        />)

        const closeBtn = screen.getByRole('button', {name: /❌/i})

        await user.click(closeBtn)

        expect(closeModalMock).toBeCalled()
    })
})