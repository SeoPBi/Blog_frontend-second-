import Navigation from '../../Navigation'
import Athentication from '../../Athentication'
import BoardMain from '../../BoardMain';
import { useEffect, useState } from 'react';
import { useUserStore } from '../../../stores';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function MainLayout() {

    const [boardResponse, setBoardResponse] = useState<string>('');
    const [cookies] = useCookies();
    const { user } = useUserStore();

    const getBoard = async (token: string) => {
        const requestOption = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        await axios.get('http://localhost:4000/api/board/', requestOption).then((response) => {
            setBoardResponse(response.data);
        }).catch((error) => '');
    }

    useEffect(() => {
        const token = cookies.token;
        if (token) getBoard(token);
        else setBoardResponse('');
    }, [cookies.token]);

    return (
        <>
            <Navigation />
            {user ? (<BoardMain />) : (<Athentication />)}
        </>
    )
}
