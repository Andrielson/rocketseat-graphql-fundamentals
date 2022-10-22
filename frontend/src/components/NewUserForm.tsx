import {FormEvent, useState} from "react";
import {gql, useMutation} from "@apollo/client";

const CREATE_USER = gql`
    mutation($name: String!) {
        createUser(name: $name) {
            id
            name
        }
    }
`;

export function NewUserForm() {
    const [name, setName] = useState('');
    const [createUser, {data, loading, error}] = useMutation(CREATE_USER);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!name) return;

        await createUser({
            variables: {name}
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={e => setName(e.target.value)}/>
            <button type="submit">Enviar</button>
        </form>
    );
}