import {FormEvent, useState} from "react";
import {useMutation} from "@apollo/client";
import {CREATE_USER} from "../queries/createUser";
import {GET_USERS} from "../queries/getUsers";
import {client} from "../lib/apollo";

export function NewUserForm() {
    const [name, setName] = useState('');
    const [createUser, {data, loading, error}] = useMutation(CREATE_USER);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!name) return;

        await createUser({
            variables: {name},
            update: (cache, {data: {createUser}}) => {
                const {users} = client.readQuery({query: GET_USERS});

                cache.writeQuery({
                    query: GET_USERS,
                    data: {
                        users: [
                            ...users,
                            createUser
                        ]
                    }
                });
            }
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={e => setName(e.target.value)}/>
            <button type="submit">Enviar</button>
        </form>
    );
}