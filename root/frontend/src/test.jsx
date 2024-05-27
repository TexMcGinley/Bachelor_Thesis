const handleDragEnd = (event) => {
  const { active, over } = event;

  console.log(rankedMovies);

  if (!over) {
    // If the drop event is not over any target
    console.error("Drop event missing target.");
    return;
  }

  // IDs of rank-slot elements are in the format "rank-slot-{index}"
  // IDs of movie elements are the movie IDs
  const fromId = active.id; // Get the id of the dragged item
  const toId = over.id; // Get the id of the target item

  console.log(`Drag End Event from ${fromId} to ${toId}`); // Log the drag end event

  if (fromId === toId) {
    // If the dragged item is dropped back to its original position
    return;
  }

  let updatedMovies = [...movies]; // Create a copy of the movies array

  if (
    // if both the dragged and target items are not ranked movies (i.e., they are in the movie grid)
    !fromId.startsWith("rank-slot") && // If the dragged item is not a rank slot
    !toId.startsWith("rank-slot") && // If the target item is not a rank slot
    fromId > -1 && // If the dragged item has a valid id
    toId > -1 // If the target item has a valid id
  ) {
    console.log("Reordering movies");
    const fromIndex = getMoviePos(fromId); // Get the index of the dragged movie in the movie grid
    const toIndex = getMoviePos(toId); // Get the index of the target movie in the movie grid
    updatedMovies = arrayMove(updatedMovies, fromIndex, toIndex); // Reorder the movies array
    setMovies(updatedMovies); // Update the movies array
    console.log(`fromIndex: ${fromIndex}, toIndex: ${toIndex}`);
    return;
  }

  // If the dragged item is a ranked movie or the target item is a rank slot:
  // Create a copy of the rankedMovies with enough slots.
  let updatedRankedMovies = new Array(10).fill(null);

  // fill the updatedRankedMovies array with the currently ranked movies and the empty slots as null.
  for (let i = 0; i < rankedMovies.length; i++) {
    if (rankedMovies[i] !== null) {
      if (rankedMovies[i].rank !== undefined && rankedMovies[i].rank !== -1) {
        updatedRankedMovies[rankedMovies[i].rank] = rankedMovies[i];
      }
    } else {
      updatedRankedMovies[i] = null;
    }
  }

  console.log("Initial ranked movies:", updatedRankedMovies);

  if (fromId.startsWith("rank-slot") && toId.startsWith("rank-slot")) {
    // If both the dragged and target items are rank slots
    console.log("Reordering rank slots");
    let fromIndex = parseInt(fromId.split("-")[2]); // Get the index of the dragged rank slot
    let toIndex = parseInt(toId.split("-")[2]); // Get the index of the target rank slot
    const temp = updatedRankedMovies[fromIndex]; // Store the dragged rank slot in a temporary variable
    updatedRankedMovies[fromIndex] = updatedRankedMovies[toIndex]; // Swap the dragged rank slot with the target rank slot
    updatedRankedMovies[toIndex] = temp; // Place the dragged rank slot in the target rank slot
  } else if (fromId.startsWith("rank-slot") && !toId.startsWith("rank-slot")) {
    // If the dragged item is a ranked movie and the target item is a movie in the grid
    console.log("Moving rank slot to movie");
    let fromIndex = parseInt(fromId.split("-")[2]); // Get the index of the dragged rank slot
    let toIndex = updatedMovies.findIndex((item) => item.id === toId); // Find the index of the target movie in the movie grid
    if (toIndex !== -1) {
      // If the target movie is found in the movie grid
      updatedMovies[toIndex].rank = fromIndex; // Update the rank of the target movie
      updatedRankedMovies[fromIndex] = updatedMovies[toIndex]; // Place the target movie in the dragged rank slot
      updatedMovies.splice(toIndex, 1); // Clear the target movie from the movie grid
    } else {
      console.error("Target movie not found in grid.");
    }
  } else if (!fromId.startsWith("rank-slot") && toId.startsWith("rank-slot")) {
    // If the dragged item is a movie in the grid and the target item is a rank slot
    console.log("Moving movie to rank slot");
    let fromIndex = updatedMovies.findIndex((item) => item.id === fromId); // Find the index of the dragged movie in the movie grid
    let toIndex = parseInt(toId.split("-")[2]); // Get the index of the target rank slot
    if (fromIndex !== -1) {
      // If the dragged movie is found in the movie grid
      updatedMovies[fromIndex].rank = toIndex; // Update the rank of the dragged movie
      updatedRankedMovies[toIndex] = updatedMovies[fromIndex]; // Place the dragged movie in the target rank slot
      updatedMovies.splice(fromIndex, 1); // Clear the dragged movie from the movie grid
    } else {
      console.error("Dragged movie not found in grid.");
    }
  } else {
    console.error("Invalid drag and drop operation.");
  }

  const fromIndex = fromId.startsWith("rank-slot")
    ? parseInt(fromId.split("-")[2])
    : updatedMovies.findIndex((item) => item.id === fromId); // Find the index of the dragged movie in the movie grid/ranked movies
  const toIndex = toId.startsWith("rank-slot")
    ? parseInt(toId.split("-")[2])
    : updatedMovies.findIndex((item) => item.id === toId); // Find the index of the target movie in the movie grid/ranked movies

  console.log(`fromIndex: ${fromIndex}, toIndex: ${toIndex}`);

  if (fromIndex !== -1) {
    // Determine the source array based on whether the movie is currently in the ranking slots or in the movie grid

    const sourceArray = fromId.startsWith("rank-slot")
      ? updatedRankedMovies // Source is ranked movies if 'fromId' indicates a rank slot
      : updatedMovies; // Source is unranked movies otherwise

    // Retrieve the movie object from the source array
    const movie = sourceArray[fromIndex];
    sourceArray[fromIndex] = null; // Clear the original position in the source array

    if (toIndex !== -1) {
      // If the movie is being dropped into another rank slot
      if (updatedRankedMovies[toIndex]) {
        // Check if there is already a movie in the target rank slot
        console.log("Movie already in target rank");
        // Move the existing movie in the target slot back to the movie grid
        updatedMovies.push({ ...updatedRankedMovies[toIndex], rank: -1 });
      }
      // Place the dragged movie into the target rank slot
      updatedRankedMovies[toIndex] = { ...movie, rank: toIndex };
    } else {
      // If the movie is being dropped outside any rank slot (e.g., back to the movie grid)
      // Reset its rank to -1 indicating it is not in the ranked list
      updatedMovies.push({ ...movie, rank: -1 });
    }
  }
  const final_ranked_movies = new Array(10).fill(null); // Presuming there are a maximum of 10 ranks.

  for (let i = 0; i < updatedRankedMovies.length; i++) {
    if (updatedRankedMovies[i] !== null) {
      console.log("Rank:", updatedRankedMovies[i].rank);
      if (
        updatedRankedMovies[i].rank !== undefined &&
        updatedRankedMovies[i].rank !== -1
      ) {
        final_ranked_movies[updatedRankedMovies[i].rank] =
          updatedRankedMovies[i];
      }
    }
  }

  console.log("Final ranked movies:", final_ranked_movies);

  console.log(
    "Final movies:",
    updatedMovies.filter((movie) => movie)
  );
  console.log("Final ranked movies:", updatedRankedMovies);
  console.log(
    "final ranked movies filtered:",
    updatedRankedMovies.filter((movie) => movie)
  );

  setMovies(updatedMovies.filter((movie) => movie));
  setRankedMovies(final_ranked_movies.filter((movie) => movie));
};
