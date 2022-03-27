import { AppContext } from "./Context/Store-reducer"
import Layout from "./MainLayout"
import CardItem from "./CardItems"

export default function App(){
    return(
        <AppContext>
            <Layout>
                <CardItem />
            </Layout>
        </AppContext>
    )
}