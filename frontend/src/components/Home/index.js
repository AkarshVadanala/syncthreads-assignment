import Header from '../Header'
import './index.css'

const Home = props => {
    console.log(props)
    return (
      <>
        <Header />
        <div className="home-container">
          <h1 className="home-heading">Welcome, User</h1>
        </div>
      </>
    )
  }
  
export default Home
  