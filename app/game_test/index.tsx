import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';

// Inicializa o Cliente Supabase
const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL,
    process.env.EXPO_PUBLIC_SUPABASE_API
);

const GameScreen = () => {
    const { room_token } = useLocalSearchParams();
    const roomToken = typeof room_token === 'string' ? room_token : '';
    const [channel, setChannel] = useState<RealtimeChannel | null>(null);
    const [scores, setScores] = useState({ player1: 0, player2: 0 });
    const [isPlayer1, setIsPlayer1] = useState(false); // Assumimos que o primeiro a conectar-se é o P1

    // 2. Lógica simples para determinar quem é P1/P2 (deve ser refinada numa app real)
    useEffect(() => {
        // Esta lógica deveria ser mais robusta, baseada na autenticação ou presença do Supabase.
        // Para teste, podemos usar localStorage ou um valor estático por enquanto.
        // Vamos manter o isPlayer1 como false para o Convidado por defeito (o JoinRoom).
        if (roomToken) {
            // Se o URL vier de um "Join", assumimos que é o Player 2.
            // O host (CreateRoom) pode ser configurado para ser P1.
            // Para este teste, vamos assumir que o ecrã que chama este componente define o papel.
            // Apenas para diferenciar os botões:
            setIsPlayer1(false);
        }
    }, [roomToken]);

    // 3. Configuração do Canal e Listeners
    useEffect(() => {
        if (!roomToken) return;

        // Cria/Adere ao canal privado
        const currentChannel = supabase.channel(`room:game-${roomToken}`, {
            config: { private: false }
        });

        // Listener para mensagens de broadcast (atualização de score)
        currentChannel.on('broadcast', { event: 'SCORE_UPDATE' }, (payload) => {
            // Atualiza os scores no dispositivo local com os scores recebidos do broadcast
            console.log(payload);
            setScores(payload.payload.newScores);
        });

        currentChannel.subscribe((status) => {
            if (status === 'SUBSCRIBED') {
                console.log(`Subscrito ao canal do jogo: ${roomToken}`);
            }
        });

        setChannel(currentChannel);

        // Limpeza
        return () => {
            if (currentChannel) {
                currentChannel.unsubscribe();
            }
        };
    }, [roomToken]);

    // 4. Função para enviar a atualização de pontuação
    const handleScoreUpdate = (player: 'player1' | 'player2') => {
        if (!channel) return;

        const newScores = { ...scores };
        newScores[player] += 1;

        setScores(newScores);
        // A CORREÇÃO ESTÁ AQUI:
        // httpSend exige 2 argumentos: (1) o nome do evento, e (2) o objeto payload
        channel.httpSend(
            'SCORE_UPDATE', // 1. O nome do evento (string)
            { newScores }     // 2. O objeto payload (objeto)
        ).then(response => {
            if (!response.success) {
                console.error('Erro ao enviar o score via HTTP:', response.error);
            } else {
                console.log('Score enviado com sucesso via HTTP.');
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Game Room</Text>
            <Text style={styles.token}>PIN: #{roomToken}</Text>

            <View style={styles.scoreBoard}>
                <Text style={styles.scoreText}>Player 1 Score: {scores.player1}</Text>
                <Text style={styles.scoreText}>Player 2 Score: {scores.player2}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title={`Score P1 (+1)`}
                    onPress={() => handleScoreUpdate('player1')}
                    color={'green'}
                    disabled={!channel}
                />
                <View style={{width: 20}} />
                <Button
                    title={`Score P2 (+1)`}
                    onPress={() => handleScoreUpdate('player2')}
                    color={'blue'}
                    disabled={!channel}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    token: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20,
        color: '#007AFF',
    },
    scoreBoard: {
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 40,
        alignItems: 'center',
    },
    scoreText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
    }
});

export default GameScreen;