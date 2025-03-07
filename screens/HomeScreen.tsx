import { useQuery } from '@tanstack/react-query';
import { FC, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { MY_IP } from '@env'


interface Data {
    id: number;
    text: string;
}

const HomeScreen: FC = () => {
    const [refreshing, setRefreshing] = useState(false);
    const { data, error, isLoading, isError, refetch } = useQuery({
        queryKey: ['get_main'],
        queryFn: async (): Promise<Data[]> => {
            const res = await fetch(`http://${MY_IP}:5000/api/get_main`, {
                headers: {
                    "Content-Type": "application/json"
                }
            }); 
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }
            return data.info;
        }
    });

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch().finally(() => setRefreshing(false));
    }, [refetch]);

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#FF69B4" />
            </View>
        );
    }

    return (
        <FlatList
            data={data}
            keyExtractor={(item: Data) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.serverData}>
                    <Text>{item.text}</Text>
                </View>
            )}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#FF69B4']}
                />
            }
            ListEmptyComponent={<Text>Нет данных для отображения</Text>}
            ListFooterComponent={isError ? <Text>Ошибка: {error.message}</Text> : null}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.8)', // опционально, добавляет полупрозрачный фон
    },
    serverData: {
        borderTopColor: 'black',
        borderTopWidth: 2,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        padding: 10,
    }
});

export default HomeScreen;
