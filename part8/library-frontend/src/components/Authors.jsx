import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useState } from "react"
import { FIND_PERSON, EDIT_AUTHOR} from '../queries'

const Authors = (props) => {
  if (!props.show) {
    return null;
  }
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [bornYear, setBornYear] = useState('1966');

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: FIND_PERSON }],
  })

  const { data, loading, error } = useQuery(FIND_PERSON);

  if (loading) {
    return <div>Loading authors...</div>;
  }

  if (error) {
    return <div>Error fetching authors</div>;
  }

  const authors = data.allAuthors;

  const handleUpdateBorn = async (e) => {
    e.preventDefault();
    if (!selectedAuthor || !bornYear) {
      alert('Please select an author and enter a birth year.');
      return;
    }
    try {
      await editAuthor({
        variables: {
          name: selectedAuthor,
          setBornTo: parseInt(bornYear),
        },
      });
      setSelectedAuthor('');
      setBornYear('');
    } catch (err) {
      console.error(err);
      alert('Failed to update author.');
    }
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set Birth Year</h3>
      <form onSubmit={handleUpdateBorn}>
        <div>
          <label>Author: </label>
          <select
            value={selectedAuthor}
            onChange={({ target }) => setSelectedAuthor(target.value)}
          >
            <option value="">Select author</option>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Birth Year: </label>
          <input
            type="number"
            value={bornYear}
            onChange={({ target }) => setBornYear(target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default Authors
