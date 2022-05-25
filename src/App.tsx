import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import ListPokeDex from './containers/ListPokeDex'
import PokeDexDetails from './containers/PokeDexDetails'
import { Layout } from './components'

export default function App() {
    // Using HOC to wrap each page in a Layout
    const withLayout = (Component: any) => (props: any) =>
        (
            <Layout>
                {/* All props are passed through to the Component being wrapped */}
                <Component {...props} />
            </Layout>
        )

    // Pages
    const PokeDexListPage = withLayout(() => <ListPokeDex />)
    const PokeDexDetailsPage = withLayout(() => <PokeDexDetails />)
    return (
        <Router>
            <div>
                <Routes>
                    <Route
                        path="/pokedex/:slug"
                        element={<PokeDexDetailsPage />}
                    />
                    <Route path="/" element={<PokeDexListPage />} />
                </Routes>
            </div>
        </Router>
    )
}
