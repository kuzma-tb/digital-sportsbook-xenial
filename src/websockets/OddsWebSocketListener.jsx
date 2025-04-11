import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadSelection } from '../store/actions/selectionActions';

export const OddsWebSocketListener = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');

        let isConnected = false;

        socket.onopen = () => {
            isConnected = true;
            console.log('Connected to WS');
        }

        socket.onmessage = (event) => {
            try {
                const updates = JSON.parse(event.data);

                updates.forEach((item) => {
                    dispatch(loadSelection({ id: item.id, odds: item.odds }));
                });
            } catch (error) {
                console.error('Failed to parse WS message:', error);
            }
        };

        socket.onerror = (err) => {
            console.error('WS Error:', err);
        };

        socket.onclose = (event) => {
            console.log('Disconnected from WS', event.reason);
        };

        return () => {
            if (isConnected) {
                socket.close();
                console.log('Cleaned up WS on unmount');
            }
        };
    }, [dispatch]);

    // No UI
    return null;
};
