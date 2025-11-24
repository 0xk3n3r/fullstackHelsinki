 import { gql } from "@apollo/client";
 import { useQuery } from "@apollo/client/react";
import { FIND_BOOK} from '../queries'
import { useState } from "react"

const Books = (props) => {

  if (!props.show) {
    return null
  }
  const [genreFilter, setGenreFilter] = useState('');
  const { data, loading, error, refetch } = useQuery(FIND_BOOK, {
    variables: { genre: genreFilter || null }
  })
  const allGenres = Array.from(
    new Set(data?.allBooks.flatMap(b => b.genres) || [])
  )

  const handleGenreChange = (e) => {
    setGenreFilter(e.target.value);
    refetch({ genre: e.target.value || null });
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  console.log('Data:', data)
  const books = data.allBooks;

  return (
    <div>
      <h2>books</h2>
      <div>
        <label htmlFor="genre-select">Filter by genre: </label>
        <select
          id="genre-select"
          value={genreFilter}
          onChange={handleGenreChange}
        >
          <option value="">All genres</option>
          {allGenres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
      
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.genre}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
