import MovieList from "./components/MovieList";
import RecommendationRanking from "./components/RecommendationRanking";

function App() {
  const movies = [
    {
      id: "1",
      title: "Forest Gump",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      releaseDate: "11/09/2002",
      genres: ["Drama", "Romance"],
      rating: 8.8,
      certification: "PG-13",
    },
    {
      id: "2",
      title: "The Shawshank Redemption",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      releaseDate: "1994",
      genres: ["Drama"],
      rating: 9.3,
      certification: "R",
    },
    {
      id: "3",
      title: "Forest Gump",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      releaseDate: "11/09/2002",
      genres: ["Drama", "Romance"],
      rating: 8.8,
      certification: "PG-13",
    },
    {
      id: "4",
      title: "The Shawshank Redemption",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      releaseDate: "1994",
      genres: ["Drama"],
      rating: 9.3,
      certification: "R",
    },
    {
      id: "5",
      title: "Forest Gump",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      releaseDate: "11/09/2002",
      genres: ["Drama", "Romance"],
      rating: 8.8,
      certification: "PG-13",
    },
    {
      id: "6",
      title: "The Shawshank Redemption",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      releaseDate: "1994",
      genres: ["Drama"],
      rating: 9.3,
      certification: "R",
    },
    {
      id: "7",
      title: "Forest Gump",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      releaseDate: "11/09/2002",
      genres: ["Drama", "Romance"],
      rating: 8.8,
      certification: "PG-13",
    },
    {
      id: "8",
      title: "The Shawshank Redemption",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      releaseDate: "1994",
      genres: ["Drama"],
      rating: 9.3,
      certification: "R",
    },
    {
      id: "9",
      title: "Forest Gump",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      releaseDate: "11/09/2002",
      genres: ["Drama", "Romance"],
      rating: 8.8,
      certification: "PG-13",
    },
    {
      id: "10",
      title: "The Shawshank Redemption",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      releaseDate: "1994",
      genres: ["Drama"],
      rating: 9.3,
      certification: "R",
    },
    {
      id: "11",
      title: "Forest Gump",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      releaseDate: "11/09/2002",
      genres: ["Drama", "Romance"],
      rating: 8.8,
      certification: "PG-13",
    },
    {
      id: "12",
      title: "The Shawshank Redemption",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      releaseDate: "1994",
      genres: ["Drama"],
      rating: 9.3,
      certification: "R",
    },
    // Add more movie objects as needed
  ];

  return (
    <div className="App">
      <RecommendationRanking />
      <MovieList movies={movies} />
    </div>
  );
}

export default App;

// function App() {
//   const items = ["item 1", "item 2", "item 3"];
//   const [selectedItem, setSelectedItem] = useState("");

//   return (
//     <div className="App">
//       <ListGroup
//         items={items}
//         heading="List of items"
//         onSelectItem={(item) => setSelectedItem(item)}
//       />
//       <p>Selected item: {selectedItem}</p>
//     </div>
//   );
// }
