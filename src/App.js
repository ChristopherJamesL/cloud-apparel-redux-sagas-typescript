import Directory from './components/directory/directory.component';


const App = () => { 
  const categories = [
    {
      "id": 1,
      "title": "hats",
      "imageUrl": "https://i.ibb.co/cvpntL1/hats.png"
    },
    {
      "id": 2,
      "title": "jackets",
      "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png"
    },
    {
      "id": 3,
      "title": "sneakers",
      "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png"
    },
    {
      "id": 4,
      "title": "womens",
      "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png"
    },
    {
      "id": 5,
      "title": "mens",
      "imageUrl": "https://media.gettyimages.com/id/172909725/photo/the-aviator.jpg?s=612x612&w=0&k=20&c=UlwzIP5vr56cfODK3epvRLGwsjag8JWwOgONvsKh3qc="
    }
  ]

  return (
    <Directory categories={categories} />
  );
}

export default App;

