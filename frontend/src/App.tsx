import {useQuery} from "@apollo/client";
import {NewUserForm} from "./components/NewUserForm";
import {GET_USERS} from "./queries/getUsers";

type User = {
  id: string;
  name: string;
}

function App() {
  const {data, loading} = useQuery<{users: User[]}>(GET_USERS);

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <ul>
        {data?.users.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
      <NewUserForm />
    </div>
  )
}

export default App
