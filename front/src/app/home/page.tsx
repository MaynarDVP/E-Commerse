import Cardlist from "../../components/Card";

const Home: React.FC = () => { 
  return(
      <div className="bg-gray-100 min-h-screen py-8">
        
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Our Store</h1>
        <p className="text-lg text-gray-600 mt-2">Explore our range of products!</p>
      </div>
      
    <Cardlist/>

    </div>
  )
 }
export default Home;
